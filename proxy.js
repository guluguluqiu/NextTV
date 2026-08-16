import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const publicRoutes = ["/login"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // 放行静态资源及 API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("session")?.value;
  const isPublicRoute = publicRoutes.includes(pathname);

  let session = null;
  if (sessionCookie) {
    session = await decrypt(sessionCookie);
  }

  // 判定是否为 Next.js 客户端内部数据请求
  const isRSC =
    request.headers.get("rsc") === "1" ||
    request.headers.get("accept")?.includes("text/x-component");

  // 未登录访问受保护页面
  if (!isPublicRoute && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", sessionCookie ? "expired" : "unauthenticated");

    if (isRSC) {
      // RSC 请求：返回带有重定向 Header 的 401 响应，告知客户端路由安全跳转，避免抛出 HTML 崩溃
      const response = new NextResponse(null, { status: 401 });
      response.headers.set("x-middleware-redirect", loginUrl.toString());
      return response;
    }

    return NextResponse.redirect(loginUrl);
  }

  // 已登录用户访问登录页 -> 跳转主页
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
