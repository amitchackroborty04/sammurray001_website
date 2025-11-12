"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RegistrationFormProps {
  onSubmit: (role: "tenant" | "supplier") => void
  onLoginClick: () => void
}

export default function RegistrationForm({ onSubmit, onLoginClick }: RegistrationFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<"tenant" | "supplier" | "">("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedRole === "tenant" || selectedRole === "supplier") {
      onSubmit(selectedRole)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      <div>
        <h2 className="text-[40px] font-bold bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text mb-2">Create Your Account</h2>
        <p className="text-[#FFFFFF] text-base">Register a new account</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[#FFFFFF] text-base mb-2">Full Name</label>
          <Input
            type="text"
            placeholder="Name Here"
            className=" border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[51px] rounded-[4px]"
            required
          />
        </div>

        <div>
          <label className="block text-[#FFFFFF] text-base mb-2">Email Address</label>
          <Input
            type="email"
            placeholder="hello@example.com"
            className=" border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[51px] rounded-[4px]"
            required
          />
        </div>

        <div>
          <label className="block text-[#FFFFFF] text-base mb-2">Role</label>
          <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as "tenant" | "supplier")}>
            <SelectTrigger className=" border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[51px] rounded-[4px]">
              <SelectValue className="!text-[#BFBFBF]" placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent className="bg-[#2c3d5c] border-gray-600">
              <SelectItem value="tenant" className="text-white">
                Tenant
              </SelectItem>
              <SelectItem value="supplier" className="text-white">
                Supplier
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-[#FFFFFF] text-base mb-2">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className=" border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[51px] rounded-[4px]"
              required
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

        <div>
          <label className="block text-[#FFFFFF] text-base mb-2">Confirm Password</label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className=" border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[51px] rounded-[4px]"
              required
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

   <Button
  type="submit"
  disabled={!selectedRole}
  className="w-full h-[51px] text-white font-semibold rounded-lg disabled:opacity-50 disabled:text-white"
  style={{
    background: `linear-gradient(90deg, #0078B8 0%, #229F99 101.35%), 
                 linear-gradient(338.72deg, rgba(0, 118, 180, 0.2) 14.2%, rgba(51, 164, 150, 0.2) 83.33%)`,
    backgroundBlendMode: 'overlay',
  }}
>
  <span className="text-white z-50">
  Sign Up
  </span>
</Button>



      <div className="text-center text-sm text-gray-300">
        Already have an account?{" "}
        <button type="button" onClick={onLoginClick} className="text-cyan-400 hover:text-cyan-300 font-semibold">
          Log In
        </button>
      </div>
    </form>
  )
}
