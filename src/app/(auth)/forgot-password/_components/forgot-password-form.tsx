"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  onSubmitStep: () => void; // ⭐ ADD THIS
}

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordForm({
  onBackToLogin,
  onSubmitStep, // ⭐ RECEIVE IT
}: ForgotPasswordFormProps) {
  const router = useRouter();

  const { register, handleSubmit } = useForm<ForgotPasswordFormData>();

  const forgotPassMutation = useMutation({
    mutationFn: async (bodyData: { email: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send email");
      }

      return res.json();
    },

    onSuccess: (data, variables) => {
      toast.success(data.message || "OTP sent successfully!");
      const encodedEmail = encodeURIComponent(variables.email);

      onSubmitStep(); // ⭐ MOVE TO OTP STEP

      router.push(`/verify-otp?email=${encodedEmail}`);
    },

    onError: (err) => {
      const message = err instanceof Error ? err.message : "Failed to send OTP";
      toast.error(message);
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassMutation.mutate({ email: data.email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-[25px] font-bold mb-2 bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text">
          Forgot Password
        </h2>
        <p className="text-[#FFFFFF] text-base leading-relaxed">
          Enter the email address associated with your account. We’ll send you an OTP to your email.
        </p>
      </div>

      <div>
        <label className="block text-[#FFFFFF] text-base mb-2">Email Address</label>
        <Input
          type="email"
          placeholder="hello@example.com"
          {...register("email", { required: true })}
          className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[46px] rounded-[4px]"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={forgotPassMutation.isPending}
        className="w-full h-[46px] text-white font-semibold rounded-lg disabled:opacity-50 disabled:text-white"
        style={{
          background: `linear-gradient(90deg, #0078B8 0%, #229F99 101.35%), 
                       linear-gradient(338.72deg, rgba(0, 118, 180, 0.2) 14.2%, rgba(51, 164, 150, 0.2) 83.33%)`,
          backgroundBlendMode: "overlay",
        }}
      >
        {forgotPassMutation.isPending ? "Sending..." : "Send OTP"}
      </Button>

      <button
        type="button"
        onClick={onBackToLogin}
        className="w-full text-gray-400 hover:text-gray-300 text-sm py-2"
      >
        Back to Login
      </button>
    </form>
  );
}
