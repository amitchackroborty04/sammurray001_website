"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import AuthLayout from "../../_components/auth-layout"

interface LoginPageProps {
  onSwitchToRegister: () => void
  onSwitchToForgotPassword: () => void
}

export default function LoginPage({ onSwitchToRegister, onSwitchToForgotPassword }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <AuthLayout

      imagePosition="right"
    >
      <div className="bg-[#FFFFFF33]/20 rounded-xl p-8 space-y-6 w-full lg:w-[500px]">
        <div>
          <h2
            className="text-[40px] font-bold mb-2 bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text"
          >
            Hello, Welcome!
          </h2>

          <p className="text-[#FFFFFF] text-base">Please Enter Your Details Below to Continue</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-[#FFFFFF] text-base mb-2">Email Address</label>
            <Input
              type="email"
              placeholder="hello@example.com"
              className=" border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[51px] rounded-[4px]"
            />
          </div>

          <div>
            <label className="block text-[#FFFFFF] text-base mb-2">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[51px] rounded-[4px] pr-10"
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

          <div className="flex items-center justify-between">
           <div>
             <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 bg-[#2c3d5c] border-gray-600 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-[#BFBFBF] text-sm cursor-pointer">
              Remember me now
            </label>
           </div>
            <div>
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="w-full bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text  text-sm font-semibold py-2"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg"
          >
            Log In
          </Button>
        </form>

        <div className="text-center text-sm text-gray-300">
          Don`&apos;t have an account?{" "}
          <button onClick={onSwitchToRegister} className="text-cyan-400 hover:text-cyan-300 font-semibold">
            Sign Up
          </button>
        </div>


      </div>
    </AuthLayout>
  )
}
