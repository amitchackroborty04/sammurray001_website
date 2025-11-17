"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";

interface RegistrationFormProps {
  onSubmit: (role: "TENANT" | "SUPPLIER") => void;
  onLoginClick: () => void;
}

export default function RegistrationForm({ onSubmit, onLoginClick }: RegistrationFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"TENANT" | "SUPPLIER" | "">("");

  // ---------------- API MUTATION ----------------
  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
            role: selectedRole, // FIXED: now sending TENANT / SUPPLIER
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      return res.json();
    },

    onSuccess: (data) => {
      console.log("Registration Success:", data);
      if (selectedRole === "TENANT" || selectedRole === "SUPPLIER") {
        onSubmit(selectedRole);
      }
      
    },

    onError: (error) => {
      console.log("Registration Error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (selectedRole === "TENANT" || selectedRole === "SUPPLIER") {
      registerMutation.mutate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-[25px] sm:text-[40px] font-bold bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text mb-1 sm:mb-2">
          Create Your Account
        </h2>
        <p className="text-[#FFFFFF] text-sm sm:text-base">Register a new account</p>
      </div>

      {/* Input Fields */}
      <div className="space-y-3 sm:space-y-4">
        
        {/* Full Name */}
        <div>
          <label className="block text-[#FFFFFF] text-sm sm:text-base mb-1 sm:mb-2">Full Name</label>
          <Input
            type="text"
            placeholder="Name Here"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] sm:h-[51px] rounded-[4px]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#FFFFFF] text-sm sm:text-base mb-1 sm:mb-2">Email Address</label>
          <Input
            type="email"
            placeholder="hello@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] sm:h-[51px] rounded-[4px]"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-[#FFFFFF] text-sm sm:text-base mb-1 sm:mb-2">Role</label>
          <Select
            value={selectedRole}
            onValueChange={(value) => setSelectedRole(value as "TENANT" | "SUPPLIER")}
          >
            <SelectTrigger className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] sm:h-[51px] rounded-[4px]">
              <SelectValue className="!text-[#BFBFBF]" placeholder="Select Role" />
            </SelectTrigger>

            {/* FIXED VALUES (Uppercase for API) */}
            <SelectContent className="bg-[#2c3d5c] border-gray-600">
              <SelectItem value="TENANT" className="text-white">
                Tenant
              </SelectItem>
              <SelectItem value="SUPPLIER" className="text-white">
                Supplier
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Password */}
        <div>
          <label className="block text-[#FFFFFF] text-sm sm:text-base mb-1 sm:mb-2">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] sm:h-[51px] rounded-[4px]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-[#FFFFFF] text-sm sm:text-base mb-1 sm:mb-2">Confirm Password</label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] sm:h-[51px] rounded-[4px]"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!selectedRole || registerMutation.isPending}
        className="w-full h-[35px] sm:h-[51px] text-white font-semibold rounded-lg disabled:opacity-50 disabled:text-white"
        style={{
          background: `linear-gradient(90deg, #0078B8 0%, #229F99 101.35%), 
                       linear-gradient(338.72deg, rgba(0, 118, 180, 0.2) 14.2%, rgba(51, 164, 150, 0.2) 83.33%)`,
          backgroundBlendMode: "overlay",
        }}
      >
        <span className="text-white z-50 text-sm sm:text-base">
          {registerMutation.isPending ? "Creating..." : "Sign Up"}
        </span>
      </Button>

      {/* Login Link */}
      <div className="text-center text-xs sm:text-sm text-gray-300">
        Already have an account?{" "}
        <button type="button" onClick={onLoginClick} className="text-cyan-400 hover:text-cyan-300 font-semibold">
          Log In
        </button>
      </div>
    </form>
  );
}
