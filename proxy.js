import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const publicRoutes = ["/login"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. 放行静态资源与 API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // 2. 放行所有非 GET/HEAD 请求（如 Server Action / POST 提交）
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("session")?.value;
  const isPublicRoute = publicRoutes.includes(pathname);

  let session = null;
  if (sessionCookie) {
    try {
      session = await decrypt(sessionCookie);
    } catch (err) {
      console.error("[Proxy] Decrypt session failed:", err);
      session = null;
    }
  }

  // 3. 已登录用户访问登录页 -> 重定向到首页
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 4. 未登录用户访问受保护路由
  if (!isPublicRoute && !session) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("error", sessionCookie ? "expired" : "unauthenticated");

    // 判断是否为 Next.js 客户端内部的 RSC / Fetch 路由数据请求
    const isRSC =
      request.headers.get("rsc") === "1" ||
      request.headers.get("accept")?.includes("text/x-component");

    if (isRSC) {
      // 告诉客户端路由需要重定向，而不是抛出页面 HTML
      const res = NextResponse.json({ redirect: redirectUrl.toString() }, { status: 401 });
      res.headers.set("x-middleware-redirect", redirectUrl.toString());
      return res;
    }

    // 普通浏览器页面访问，正常重定向
    const response = NextResponse.redirect(redirectUrl);
    if (sessionCookie && !session) {
      response.cookies.delete("session");
    }
    return response;
  }

  return NextResponse.next();
}
