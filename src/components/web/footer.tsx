"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Dribbble } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      {/* Chat CTA Section */}
      <div className="bg-gradient-to-r from-white to-gray-100 rounded-3xl mx-4 md:mx-8 my-16 p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-2">
              Let's chat about your <span className="text-cyan-500">dreams and goals.</span>
            </h3>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white whitespace-nowrap">Let's talk →</Button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="bg-slate-900 rounded-3xl rounded-b-none mx-4 md:mx-8 p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-white">Property</span>
              <span className="text-xl font-bold text-cyan-400">Nexus</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A smart platform connecting businesses looking for space with developers and property owners.
            </p>
            <p className="text-gray-500 text-xs">
              Discover, list, and match spaces with clarity, privacy, and simplicity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <a href="#" className="text-gray-400 text-sm hover:text-white transition block">
                Home
              </a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition block">
                Find Space
              </a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition block">
                Find Tenants
              </a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition block">
                List Space
              </a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition block">
                Map
              </a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition block">
                About Us
              </a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition block">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition block">
                Privacy Policy
              </a>
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Social media icons</h4>
            <div className="flex gap-3 mb-6">
              <button className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition text-white">
                <Facebook size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition text-white">
                <Instagram size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition text-white">
                <Dribbble size={18} />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-2">For inquiries :</p>
            <a href="mailto:hello@propertynexus.io" className="text-cyan-400 text-sm hover:text-cyan-300 transition">
              hello@propertynexus.io
            </a>
          </div>
        </div>

        {/* Cookie Banner */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-gray-400 text-sm">
            Property Nexus uses cookies and analytics to help us improve your experience.
          </p>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white whitespace-nowrap">Continue</Button>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-700 text-center">
          <p className="text-gray-500 text-xs">© All rights reserved - Property Nexus 2025</p>
        </div>
      </div>
    </footer>
  )
}
