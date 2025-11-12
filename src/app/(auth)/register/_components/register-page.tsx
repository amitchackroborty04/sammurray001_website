"use client"

import { useState } from "react"
import AuthLayout from "../../_components/auth-layout"
import RegistrationForm from "../../_components/forms/registration-form"
import SupplierStepTwoForm from "../../_components/forms/supplier-step2-form"

interface RegisterPageProps {
  onSwitchToLogin: () => void
}

export default function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const [currentStep, setCurrentStep] = useState<"signup" | "supplier-step2" | "otp">("signup")
  const [selectedRole, setSelectedRole] = useState<"tenant" | "supplier" | null>(null)
  console.log(selectedRole)

  const handleSignupSubmit = (role: "tenant" | "supplier") => {
    setSelectedRole(role)
    if (role === "tenant") {
      // For tenant, go directly to OTP verification
      setCurrentStep("otp")
    } else {
      // For supplier, go to step 2 (agency details)
      setCurrentStep("supplier-step2")
    }
  }

  const handleSupplierStep2Submit = () => {
    setCurrentStep("otp")
  }

  // const handleOtpSubmit = () => {
  //   onSwitchToLogin()
  // }

  return (
    <AuthLayout
    
      imagePosition="left"
    >
      <div className="bg-[#FFFFFF33]/20 w-full   lg:w-[500px] py-5 rounded-xl p-8 space-y-6">
        {currentStep === "signup" && <RegistrationForm onSubmit={handleSignupSubmit} onLoginClick={onSwitchToLogin} />}

        {currentStep === "supplier-step2" && (
          <SupplierStepTwoForm
            onSubmit={handleSupplierStep2Submit}
            onBackToSignup={() => setCurrentStep("signup")}
            onLoginClick={onSwitchToLogin}
          />
        )}

        {/* {currentStep === "otp" && <OtpVerificationForm onSubmit={handleOtpSubmit} role={selectedRole} />} */}
      </div>
    </AuthLayout>
  )
}
