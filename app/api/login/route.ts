import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { success: false, error: "EdgeOne 控制台未配置 PASSWORD 环境变量" },
        { status: 500 }
      );
    }

    if (!password || password !== correctPassword) {
      return NextResponse.json(
        { success: false, error: "密码错误，请重试" },
        { status: 400 }
      );
    }

    // 写入 Cookie
    await createSession();

    // 返回标准 JSON 响应，绝不返回 HTML
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "请求格式错误" },
      { status: 400 }
    );
  }
}
