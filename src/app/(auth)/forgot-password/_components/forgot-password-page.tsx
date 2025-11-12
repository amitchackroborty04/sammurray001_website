"use client"
import { useState } from "react"
import AuthLayout from "../../_components/auth-layout"
import ForgotPasswordForm from "./forgot-password-form"

interface ForgotPasswordPageProps {
  onSwitchToLogin: () => void
}

export default function ForgotPasswordPage({ onSwitchToLogin }: ForgotPasswordPageProps) {
  const [currentStep, setCurrentStep] = useState<"email" | "otp" | "password">("email")
  // const [selectedRole, setSelectedRole] = useState<"tenant" | "supplier" | null>(null)

  const handleRoleAndEmail = () => {
    // setSelectedRole(role)
    setCurrentStep("otp")
  }

  return (
    <AuthLayout>
      <div className="bg-[#FFFFFF33]/20 rounded-xl p-8 space-y-6 w-[500px]">
        {currentStep === "email" && (
          <ForgotPasswordForm onSubmit={handleRoleAndEmail} onBackToLogin={onSwitchToLogin} />
        )}

      </div>
    </AuthLayout>
  )
}
