"use client"

import { MapPin, Mail, Phone } from "lucide-react"
import { useState } from "react"
import ContactForm from "../_components/contact-form"
import Image from "next/image"

export default function PropertyListing() {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div className="min-h-screen container mx-auto py-[24px]">
      
      {/* Hero Image */}
      <div className="w-full overflow-hidden rounded-3xl">
        <Image
          src="/assets/card1.png"
          alt="Modern Office Space in CBD"
          width={1000}
          height={1000}
          className="w-full h-56 sm:h-72 md:h-96 lg:h-[400px] object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Modern Office Space in CBD
              </h1>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div className="flex items-center gap-2 text-[#BFBFBF] text-xs sm:text-base">
                  <MapPin size={16} />
                  <span>Te Aro, Wellington</span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="bg-[#E57525] hover:bg-[#E57525]/80 text-white font-semibold h-[42px] px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  + Add To Wishlist
                </button>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-4 sm:p-8  rounded-xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">

                <div>
                  <p className="text-[#BFBFBF] text-xs sm:text-sm mb-1">Type</p>
                  <p className="text-white text-sm sm:text-lg font-semibold">Commercial</p>
                </div>

                <div>
                  <p className="text-[#BFBFBF] text-xs sm:text-sm mb-1">Size</p>
                  <p className="text-white text-sm sm:text-lg font-semibold">850 sqm</p>
                </div>

                <div>
                  <p className="text-[#BFBFBF] text-xs sm:text-sm mb-1">Status</p>
                  <p className="text-white text-sm sm:text-lg font-semibold">Under Construction</p>
                </div>

                <div>
                  <p className="text-[#BFBFBF] text-xs sm:text-sm mb-1">Consented</p>
                  <p className="text-white text-sm sm:text-lg font-semibold">Consented</p>
                </div>

                <div className="col-span-2">
                  <p className="text-[#BFBFBF] text-xs sm:text-sm mb-1">Completion Date</p>
                  <p className="text-white text-sm sm:text-lg font-semibold">24 December 2025</p>
                </div>

              </div>
            </div>

            {/* About This Property */}
            <div className="p-4 sm:p-8  rounded-xl">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                About This Property
              </h2>

              <p className="text-[#BFBFBF] text-xs sm:text-base leading-relaxed mb-6">
                A property deed is a written legal document that transfers ownership of a property from one party to another...
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Warranty Deed",
                    description:
                      "Guarantees that the seller owns the property free and clear and has the right to sell it.",
                  },
                  {
                    title: "Quitclaim Deed",
                    description:
                      "Transfers the seller's interest without making guarantees.",
                  },
                  {
                    title: "Grant Deed",
                    description:
                      "Similar to a warranty deed but may provide less protection.",
                  },
                  {
                    title: "Resort Deed",
                    description:
                      "Selling a resort property involves unique considerations.",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <h3 className="text-[#BFBFBF] font-semibold text-sm sm:text-base mb-2 flex items-start gap-2">
                      <span className="text-[#BFBFBF] mt-1">•</span>
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm ml-6 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Contact Form */}
            <ContactForm />

            {/* Agent Card */}
            <div className="bg-white/10 p-4 sm:p-8 rounded-xl">
              <h3 className="text-white text-base sm:text-lg font-bold mb-4">
                Contact Information
              </h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E55A24] flex items-center justify-center">
                  <span className="text-white font-bold text-base sm:text-lg">A</span>
                </div>
                <div>
                  <h4 className="text-white text-sm sm:text-base font-semibold">
                    Arlene McCoy
                  </h4>
                  <p className="text-[#BFBFBF] text-xs sm:text-sm">Property Agent</p>
                </div>
              </div>

              <div className="space-y-3">
                <a href="#" className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
                  <Mail size={16} />
                  michelle.rivera@example.com
                </a>

                <a href="#" className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
                  <Phone size={16} />
                  (509) 555-0103
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
