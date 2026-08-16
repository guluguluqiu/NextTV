"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";

export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password");

  // 1. 校验环境变量
  if (!process.env.PASSWORD) {
    return { error: "后台未配置 PASSWORD 环境变量！" };
  }

  // 2. 校验密码
  if (password !== process.env.PASSWORD) {
    return { error: "密码错误，请重试！" };
  }

  // 3. 创建 Session Cookie
  await createSession();

  // ⚠️ 注意：redirect 必须放在 try-catch 外部执行
  redirect("/");
}
