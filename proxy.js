import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // 放行静态资源、API 接口和登录页
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/login") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
