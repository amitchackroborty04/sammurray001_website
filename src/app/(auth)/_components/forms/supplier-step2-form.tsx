"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import Image from "next/image"

interface SupplierStepTwoFormProps {
  onSubmit: () => void
  onBackToSignup: () => void
  onLoginClick: () => void
}

export default function SupplierStepTwoForm({  
  onSubmit,
  onLoginClick,
}: SupplierStepTwoFormProps) {
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  console.log(logoFile)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicenseFile(e.target.files[0])
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {/* Header */}
      <div>
        <h2 className="text-[25px] lg:text-[40px] font-bold bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text mb-1">
          Create Your Account
        </h2>
        <p className="text-[#FFFFFF] text-sm lg:text-base">Register a new account</p>
      </div>

      <div className="space-y-3">
        {/* Agency Name */}
        <div>
          <label className="block text-[#FFFFFF] text-sm lg:text-base mb-1">Agency Name</label>
          <Input
            type="text"
            placeholder="Name Here"
            className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] rounded-[4px]"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-[#FFFFFF] text-sm lg:text-base mb-1">Location</label>
          <Input
            type="text"
            placeholder="Write Here"
            className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] rounded-[4px]"
            required
          />
        </div>

        {/* License Upload */}
        <div>
          <label className="block text-[#FFFFFF] text-sm lg:text-base mb-1">License</label>
          <label className="block border-2 border-dashed border-[#BFBFBF] rounded-md p-4 text-center cursor-pointer hover:border-cyan-400 transition relative">
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              className="hidden"
              onChange={handleLicenseChange}
            />
            <Upload className="mx-auto mb-1 text-gray-400" size={20} />
            <p className="text-[#BFBFBF] text-xs">
              {licenseFile ? licenseFile.name : "Upload License"}
            </p>
          </label>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-[#FFFFFF] text-sm lg:text-base mb-1">Logo</label>
          <label className="block border-2 border-dashed border-[#BFBFBF] rounded-md p-4 text-center cursor-pointer hover:border-cyan-400 transition relative">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="Logo Preview"
                width={100}
                height={100}
                className="mx-auto h-[70px] object-contain"
              />
            ) : (
              <>
                <Upload className="mx-auto mb-1 text-gray-400" size={20} />
                <p className="text-[#BFBFBF] text-xs">Upload Logo</p>
              </>
            )}
          </label>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-[#FFFFFF] text-sm lg:text-base mb-1">Bio</label>
          <textarea
            placeholder="Write Here"
            className="w-full bg-transparent border border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] rounded-[4px] p-2 min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-[35px] text-white font-semibold rounded-md text-sm disabled:opacity-50"
        style={{
          background: `linear-gradient(90deg, #0078B8 0%, #229F99 101.35%),
                       linear-gradient(338.72deg, rgba(0,118,180,0.2) 14.2%, rgba(51,164,150,0.2) 83.33%)`,
          backgroundBlendMode: "overlay",
        }}
      >
        Continue
      </Button>

      {/* Login Link */}
      <div className="text-center text-xs lg:text-sm pt-3 text-gray-300">
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
