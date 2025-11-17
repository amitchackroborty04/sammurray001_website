"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "../../_components/auth-layout";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || ""; // ⭐ get email from URL

  // ==========================
  // OTP VERIFY MUTATION
  // ==========================
  const otpMutation = useMutation({
    mutationFn: async (bodyData: { email: string; otp: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/verify-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || "OTP verification failed");
      }

      return res.json();
    },

    onSuccess: (data) => {
      toast.success(data.message || "OTP verified successfully!");

      // Save token
      if (data?.resetToken) {
        localStorage.setItem("resetToken", data.resetToken);
      }

      // Navigate to reset password page
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    },

    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Invalid OTP. Try again.");
    },
  });

  // ==========================
  // SUBMIT OTP
  // ==========================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (!enteredOtp || enteredOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!email) {
      toast.error("Email is missing. Try again.");
      return;
    }

    otpMutation.mutate({ email, otp: enteredOtp });
  };

  // ==========================
  // Input Handlers
  // ==========================
  const handleInputChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[otp.length - 1]?.focus();
    }
  };

  return (
    <AuthLayout imageSrc="/assets/sammu-auth-image.png" imagePosition="right">
      <div className="bg-[#FFFFFF33]/20 rounded-xl p-4 md:p-8 space-y-6 w-full lg:w-[550px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-[25px] lg:text-[40px] font-bold mb-2 bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text">
              Verify OTP
            </h2>
            <p className="text-white text-sm lg:text-base">
              We’ve sent a verification code to your email. Enter it below to continue.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-10 lg:w-12 h-10 lg:h-12 text-center text-lg font-semibold 
                    border-2 border-gray-600 text-white rounded-lg focus:outline-none
                    focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50"
                />
              ))}
            </div>

            <div className="text-center text-xs lg:text-sm text-gray-300">
              Resend code in <span className="text-cyan-400 font-medium">30</span>s
            </div>
          </div>

          <Button
            type="submit"
            disabled={otpMutation.isPending || !otp.every((d) => d)}
            className="w-full h-[35px] lg:h-[51px] text-white font-semibold rounded-lg
              bg-[linear-gradient(90deg,#0078B8_0%,#229F99_101.35%),linear-gradient(338.72deg,rgba(0,118,180,0.2)_14.2%,rgba(51,164,150,0.2)_83.33%)]
              hover:opacity-90 disabled:opacity-60 text-sm lg:text-base"
          >
            {otpMutation.isPending ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
