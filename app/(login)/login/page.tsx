"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // 用户访问 /login 时自动跳回首页
    router.replace("/");
  }, [router]);

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center text-gray-400 text-sm">
      正在进入系统…
    </div>
  );
}
