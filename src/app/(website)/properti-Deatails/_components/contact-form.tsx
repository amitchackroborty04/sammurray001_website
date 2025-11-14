"use client"

import type React from "react"

import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  return (
    <div className="bg-[#FFFFFF]/10 rounded-2xl p-6 sm:p-4">
      <h3 className="bg-text-gradient bg-clip-text text-transparent text-2xl font-bold ">For Sale</h3>
      <h2 className="text-[32px] font-bold text-[#FFFFFFFf] mb-4">$1,000,000</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-[#FFFFFF] text-basemb-2 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Name Here"
            className="w-full bg-transparent border border-[#BFBFBF] rounded-[4px] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#BFBFBF]/80 transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#FFFFFF] text-basemb-2 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="hello@example.com"
            className="w-full bg-transparent border border-[#BFBFBF] rounded-[4px] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#BFBFBF]/80 transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[#FFFFFF] text-basemb-2 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(509) 555-0106"
            className="w-full bg-transparent border border-[#BFBFBF] rounded-[4px] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#BFBFBF]/80 transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient hover:bg-gradient/80 text-white font-midium py-3 px-4 rounded-lg transition-colors duration-200 mt-6"
        >
          Submit
        </button>
      </form>

    
    </div>
  )
}
