"use client";

import { useActionState, useEffect, useState, Suspense } from "react";
import { login } from "@/app/actions/auth";
import {
  MaterialSymbolsErrorRounded,
  MaterialSymbolsLoginRounded,
  MaterialSymbolsVisibilityOffOutlineRounded,
  MaterialSymbolsVisibilityOutlineRounded,
} from "@/components/icons";

function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  // 验证成功后使用 window.location.href 跳转，保证带上新生成的 Cookie
  useEffect(() => {
    if (state?.success) {
      window.location.href = "/";
    }
  }, [state]);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center page-enter">
      <div className={`w-full max-w-md mx-auto transition-transform ${state?.error ? "animate-shake" : ""}`}>
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
          <p className="text-gray-400 text-sm">请输入密码以继续访问</p>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8">
          <form action={formAction} className="space-y-5">
            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入访问密码"
                  className={`w-full px-4 py-3 pr-11 text-sm rounded-xl border ${
                    state?.error
                      ? "border-red-300 bg-red-50/50 focus:ring-red-300/40 focus:border-red-400"
                      : "border-gray-200 bg-gray-50 focus:ring-primary/40 focus:border-primary"
                  } text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white transition-all`}
                  autoFocus
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-0.5"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <MaterialSymbolsVisibilityOffOutlineRounded className="text-lg" />
                  ) : (
                    <MaterialSymbolsVisibilityOutlineRounded className="text-lg" />
                  )}
                </button>
              </div>

              {state?.error && (
                <div className="mt-2">
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <MaterialSymbolsErrorRounded className="text-[14px]" />
                    {state.error}
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-primary hover:bg-primary-dark disabled:opacity-40 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer btn-press"
            >
              {isPending ? "验证中…" : "登 录"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
