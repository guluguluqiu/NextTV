import { NextResponse } from "next/server";

export function proxy() {
  // 不做任何身份校验，直接放行所有路由请求
  return NextResponse.next();
}
