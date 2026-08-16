import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. 放行静态资源、API 与登录页本身
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/login") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // 2. 校验 Cookie 状态
  const sessionCookie = request.cookies.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  // 3. 未登录跳转到登录页
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
