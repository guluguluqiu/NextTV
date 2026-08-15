"use server";

import { createSession, deleteSession } from "@/lib/session";

export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password");

  // 1. 安全检查环境变量
  const correctPassword = process.env.PASSWORD;
  if (!correctPassword) {
    console.error("[Action Error] 环境变量 PASSWORD 未在 EdgeOne 控制台配置！");
    return { error: "服务器配置异常，请联系管理员配置 PASSWORD 环境变量" };
  }

  // 2. 基础输入校验
  if (!password || typeof password !== "string" || !password.trim()) {
    return { error: "请输入密码" };
  }

  // 3. 密码比对
  if (password.trim() !== correctPassword) {
    return { error: "密码错误，请重试" };
  }

  // 4. 创建 Session
  await createSession();

  // 5. 不要在后端 redirect()，直接返回成功标识给前端！
  return { success: true };
}

export async function logout() {
  await deleteSession();
  return { success: true };
}
