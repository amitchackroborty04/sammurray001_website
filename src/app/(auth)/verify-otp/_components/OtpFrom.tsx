"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AuthLayout from "../../_components/auth-layout"

export default function OtpVerificationPage() {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleInputChange = (index: number, value: string) => {
        // only digits
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp]
            newOtp[index] = value.slice(-1) // ensure 1 digit only
            setOtp(newOtp)

            // move to next input if not last and value entered
            if (value && index < otp.length - 1) {
                inputRefs.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").trim()
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split("")
            setOtp(digits)
            // focus last input
            inputRefs.current[otp.length - 1]?.focus()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (otp.every((digit) => digit)) {
            const enteredOtp = otp.join("")
            console.log("Submitted OTP:", enteredOtp)
            // handle verify OTP logic here
        }
    }

    return (
        <AuthLayout imageSrc="/images/auth-side.png" imagePosition="right">
            <div className="bg-[#FFFFFF33]/20 rounded-xl p-8 space-y-6 w-[500px]">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <h2 className="text-[40px] font-bold mb-2 bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text">
                            Verify OTP
                        </h2>
                        <p className="text-white text-base">
                            We’ve sent a verification code to your email. Enter it below to continue.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-center gap-2">
                            {otp.map((digit, index) => (
                                <Input
                                    key={index}
                                    ref={(el: HTMLInputElement | null) => {
                                        if (el !== null) {
                                            inputRefs.current[index] = el;
                                        }
                                    }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-12 text-center text-lg font-semibold bg-[#2c3d5c]
                    border-2 border-gray-600 text-white rounded-lg focus:outline-none
                    focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50"
                                />
                            ))}
                        </div>

                        <div className="text-center text-sm text-gray-300">
                            Resend code in <span className="text-cyan-400 font-medium">30</span>s
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={!otp.every((digit) => digit)}
                        className="w-full h-[51px] text-white font-semibold rounded-lg
              bg-[linear-gradient(90deg,#0078B8_0%,#229F99_101.35%),linear-gradient(338.72deg,rgba(0,118,180,0.2)_14.2%,rgba(51,164,150,0.2)_83.33%)]
              hover:opacity-90 disabled:opacity-60"
                    >
                        Verify
                    </Button>
                </form>
            </div>
        </AuthLayout>
    )
}
