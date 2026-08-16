import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "session";

// 💡 延迟获取 Key，防止环境变量未配置或在模块初始化时直接崩溃
function getSecretKey() {
  const secret = process.env.SESSION_SECRET || "default_fallback_secret_for_nexttv_edgeone_2026";
  if (!process.env.SESSION_SECRET) {
    console.warn("[Session Warning] SESSION_SECRET 未在环境变量中配置，正使用默认兜底 Secret！");
  }
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function decrypt(token) {
  if (!token) return null;
  
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession() {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ authenticated: true, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: false, // ⚠️ EdgeOne CDN 反代下设为 false，确保 Cookie 被浏览器写入
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
