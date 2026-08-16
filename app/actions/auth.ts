"use server";

import { createSession, deleteSession } from "@/lib/session";

export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password");

  // 1. 检查环境变量配置
  const correctPassword = process.env.PASSWORD;
  if (!correctPassword) {
    console.error("[Auth Action Error] PASSWORD 未在 EdgeOne 控制台中配置！");
    return { success: false, error: "系统参数未配置，请联系管理员" };
  }

  // 2. 基础输入校验
  if (!password || typeof password !== "string" || !password.trim()) {
    return { success: false, error: "请输入密码" };
  }

  // 3. 密码比对
  if (password.trim() !== correctPassword) {
    return { success: false, error: "密码错误，请重试" };
  }

  // 4. 创建 Session Cookie
  await createSession();

  // 5. 不在 Server Action 内部使用 redirect()，避免 EdgeOne 丢弃 Set-Cookie 标头
  return { success: true };
}

export async function logout() {
  await deleteSession();
  return { success: true };
}
