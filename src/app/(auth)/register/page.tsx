"use client"

import { useRouter } from "next/navigation"
import RegisterPage from "./_components/register-page"

export default function RegisterRoute() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f1929] to-[#1a2332]">
      <RegisterPage onSwitchToLogin={() => router.push("/login")} />
    </main>
  )
}
