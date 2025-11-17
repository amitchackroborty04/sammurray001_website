"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../../_components/auth-layout";
import { toast } from "sonner";

interface NewPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function UpdatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || ""; // email from URL

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<NewPasswordFormData>({
    newPassword: "",
    confirmPassword: "",
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (bodyData: { email: string; newPassword: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || "Password reset failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successful!");
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to reset password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Missing email. Please try again.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // ✅ Payload: only email and newPassword
    resetPasswordMutation.mutate({
      email,
      newPassword: formData.newPassword,
    });
  };

  return (
    <AuthLayout imageSrc="/assets/sammu-auth-image.png" imagePosition="right">
      <div className="bg-[#FFFFFF33]/20 rounded-xl px-4 py-5 md:p-8 space-y-6 w-full lg:w-[550px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-[25px] lg:text-[40px] font-bold mb-2 bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text">
              Update Password
            </h2>
            <p className="text-white text-sm lg:text-base">
              Create your new password below
            </p>
          </div>

          {/* New Password */}
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm lg:text-base mb-2">
                Create New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] lg:h-[51px] rounded-[4px] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white text-sm lg:text-base mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] lg:h-[51px] rounded-[4px] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={resetPasswordMutation.isPending}
            className="w-full h-[35px] lg:h-[51px] text-white font-semibold rounded-lg
              bg-[linear-gradient(90deg,#0078B8_0%,#229F99_101.35%),linear-gradient(338.72deg,rgba(0,118,180,0.2)_14.2%,rgba(51,164,150,0.2)_83.33%)]
              hover:opacity-90 disabled:opacity-60 text-sm lg:text-base"
          >
            {resetPasswordMutation.isPending ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
