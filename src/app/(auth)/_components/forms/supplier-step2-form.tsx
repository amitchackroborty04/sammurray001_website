"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface SupplierStepTwoFormProps {
  onSubmit: () => void
  onBackToSignup: () => void
  onLoginClick: () => void
}

export default function SupplierStepTwoForm({
  onSubmit,
  onLoginClick,
}: SupplierStepTwoFormProps) {
  // const [licensedAgency, setLicensedAgency] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {/* Header */}
      <div>
        <h2 className="text-[40px] font-bold bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text mb-2">
          Create Your Account
        </h2>
        <p className="text-[#FFFFFF] text-base">Register a new account</p>
      </div>


     <div className="space-y-4">
        {/* Agency Name */}
        <div>
          <label className="block text-[#FFFFFF] text-base mb-2">Agency Name</label>
          <Input
            type="text"
            placeholder="Name Here"
            className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[51px] rounded-[4px]"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-[#FFFFFF] text-base mb-2">Location</label>
          <Input
            type="text"
            placeholder="Write Here"
            className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[51px] rounded-[4px]"
            required
          />
        </div>

        {/* License Upload */}
        <div>
          <label className="block text-[#FFFFFF] text-base mb-2">License</label>
          <div className="border-2 border-dashed border-[#BFBFBF] rounded-lg p-8 text-center cursor-pointer hover:border-cyan-400 transition">
            <Upload className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="text-[#BFBFBF] text-sm">Upload</p>
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-[#FFFFFF] text-base mb-2">Logo</label>
          <div className="border-2 border-dashed border-[#BFBFBF] rounded-lg p-8 text-center cursor-pointer hover:border-cyan-400 transition">
            <Upload className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="text-[#BFBFBF] text-sm">Upload</p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-[#FFFFFF] text-base mb-2">Bio</label>
          <textarea
            placeholder="Write Here"
            className="w-full bg-transparent border border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] rounded-[4px] p-3 min-h-20 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-[51px] text-white font-semibold rounded-lg disabled:opacity-50 disabled:text-white"
        style={{
          background: `linear-gradient(90deg, #0078B8 0%, #229F99 101.35%), 
                       linear-gradient(338.72deg, rgba(0, 118, 180, 0.2) 14.2%, rgba(51, 164, 150, 0.2) 83.33%)`,
          backgroundBlendMode: "overlay",
        }}
      >
        <span className="text-white z-50">Continue</span>
      </Button>

      {/* Login Link */}
      <div className="text-center text-sm text-gray-300">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLoginClick}
          className="text-cyan-400 hover:text-cyan-300 font-semibold"
        >
          Log In
        </button>
      </div>
    </form>
  )
}
