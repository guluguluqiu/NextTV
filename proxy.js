import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const publicRoutes = ["/login"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. 过滤静态资源、API 接口和各类媒体文件
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // 2. 关键防护：如果是 POST 请求或 Server Action，跳过页面级的 Redirect 逻辑！
  // Server Action 请求带有 next-action 请求头
  const isServerAction = request.headers.has("next-action");
  const isPostRequest = request.method !== "GET" && request.method !== "HEAD";

  if (isServerAction || isPostRequest) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("session")?.value;
  const isPublicRoute = publicRoutes.includes(pathname);

  // 3. 加 try-catch 保护，防止解密失败或环境变量缺失导致 500 崩溃
  let session = null;
  if (sessionCookie) {
    try {
      session = await decrypt(sessionCookie);
    } catch (err) {
      console.error("[Proxy] Decrypt session failed:", err);
      session = null;
    }
  }

  // 4. 仅对常规 GET 页面访问进行重定向拦截
  // 已登录用户访问登录页 -> 重定向到首页
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 未登录/Session失效 访问受保护路由 -> 重定向到登录页
  if (!isPublicRoute && !session) {
    const errorType = sessionCookie ? "expired" : "unauthenticated";
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("error", errorType);

    const response = NextResponse.redirect(redirectUrl);
    
    // 如果 Cookie 无效，顺手擦除 Cookie
    if (sessionCookie && !session) {
      response.cookies.delete("session");
    }
    
    return response;
  }

  return NextResponse.next();
}
