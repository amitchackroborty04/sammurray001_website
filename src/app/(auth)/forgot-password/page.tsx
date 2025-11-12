"use client"

import { useRouter } from "next/navigation"
import ForgotPasswordPage from "./_components/forgot-password-page"

export default function ForgotPasswordRoute() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f1929] to-[#1a2332]">
      <ForgotPasswordPage onSwitchToLogin={() => router.push("/login")} />
    </main>
  )
}
