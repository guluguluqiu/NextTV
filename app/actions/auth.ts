"use server";

import { createSession } from "@/lib/session";

export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password");
  const correctPassword = process.env.PASSWORD;

  if (!correctPassword) {
    return { success: false, error: "EdgeOne 控制台未配置 PASSWORD 环境变量" };
  }

  if (!password || password !== correctPassword) {
    return { success: false, error: "密码错误，请重试" };
  }

  // 写入 Cookie
  await createSession();

  // ⚠️ 返回成功状态，由前端触发原生刷新跳转（避开边缘节点 Header 丢失）
  return { success: true };
}
