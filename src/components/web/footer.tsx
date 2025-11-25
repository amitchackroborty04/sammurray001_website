"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Dribbble, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

// Modal Component
function TermsModal({
  isOpen,
  onClose,
  onAgree,
}: {
  isOpen: boolean
  onClose: () => void
  onAgree: () => void
}) {
  if (!isOpen) return null

  const handleAgree = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("terms_accepted", "true")
    }
    onAgree() // notify parent that terms are accepted
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <h2 className="mb-4 text-2xl font-bold text-gray-900">Terms & Conditions</h2>

        <div className="max-h-96 overflow-y-auto rounded-lg bg-gray-50 p-5 text-sm text-gray-700">
          <p className="mb-4">
            Welcome to <strong>Property Nexus</strong>. By using our platform, you agree to the following terms:
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-gradient hover:bg-gradient/95 text-white"
            onClick={handleAgree}
          >
            I Agree
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const pathname = usePathname()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(true)

  // Check localStorage once on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accepted = localStorage.getItem("terms_accepted") === "true"
      setHasAcceptedTerms(accepted)
    }
  }, [])

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Find Space", href: "/find-space" },
    { name: "Find Tenants", href: "/find-tenants" },
    { name: "pricing", href: "/pricing" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about-us" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ]

  return (
    <>
      <div className="bg-white mx-2 md:mx-2 rounded-tl-[32px] rounded-tr-[32px]">
        <footer>
          {/* Chat CTA Section */}
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12 text-center md:text-left">
              <div>
                <h1 className="text-2xl md:text-[42px] font-bold text-[#000] mb-3 md:mb-4">
                  Let&apos;s chat about your
                </h1>
                <h1 className="bg-text-gradient bg-clip-text text-transparent text-2xl md:text-[48px] font-bold leading-tight md:leading-[1.2]">
                  dreams and goals.
                </h1>
              </div>

              <Button className="bg-gradient hover:bg-gradient/95 h-[48px] md:h-[56px] px-8 md:px-[50px] text-white text-sm md:text-base">
                Let&apos;s talk →
              </Button>
            </div>
          </div>

          {/* Footer Content */}
          <div className="bg-[#070E28] rounded-t-[32px] md:rounded-t-[40px] px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:py-16 mx-1 md:mx-3">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-10">
                {/* Brand */}
                <div>
                  <Image
                    src="/assets/logo.jpg"
                    alt="Logo"
                    width={150}
                    height={40}
                    className="w-[150px] h-[40px] object-cover mb-4"
                  />
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                    A smart platform connecting businesses looking for space with developers and property owners.
                  </p>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Discover, list, and match spaces with clarity, privacy, and simplicity.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold text-lg md:text-xl text-white mb-4">Quick Links</h4>
                  <nav className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    {quickLinks.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`
                            text-sm md:text-[17px] block px-1 py-1 transition 
                            ${isActive ? "text-gradient font-semibold" : "text-[#C5C5C5] hover:text-cyan-400"}
                          `}
                        >
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>
                </div>

                {/* Social & Contact */}
                <div>
                  <h4 className="font-semibold text-lg md:text-xl text-white mb-4">Follow Us</h4>
                  <div className="flex gap-3 mb-6 justify-center md:justify-start">
                    {[Facebook, Instagram, Dribbble].map((Icon, i) => (
                      <button
                        key={i}
                        className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition text-white"
                      >
                        <Icon size={18} />
                      </button>
                    ))}
                  </div>

                  <p className="text-[#C5C5C5] text-sm md:text-base font-medium mb-1 text-center md:text-left">
                    For inquiries:
                  </p>
                  <a
                    href="mailto:hello@propertynexus.io"
                    className="text-cyan-400 text-sm md:text-base hover:text-cyan-300 transition block text-center md:text-left"
                  >
                    hello@propertynexus.io
                  </a>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                <p className="text-[#C5C5C5] text-sm md:text-base">
                  © All rights reserved - Property Nexus 2025
                </p>

                <p className="text-[#C5C5C5] text-xs md:text-sm max-w-lg text-center md:text-left">
                  Property Nexus uses cookies and analytics to help us improve your experience.
                </p>

                {/* Only show Continue button if terms not accepted */}
                {!hasAcceptedTerms && (
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient hover:bg-gradient/95 h-[44px] px-8 text-white text-sm md:text-base"
                  >
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Terms & Conditions Modal */}
      <TermsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAgree={() => setHasAcceptedTerms(true)} // hide button immediately
      />
    </>
  )
}
