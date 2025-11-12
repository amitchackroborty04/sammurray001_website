"use client"

import { Heart, User, Home, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-[#070E28] border-b border-slate-800">
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold">Property</span>
              <span className="text-xl font-bold text-cyan-400">Nexus</span>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">
              Home
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">
              About Us
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">
              Find Space
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">
              Find Tenants
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">
              Map
            </a>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <Home size={20} className="text-gray-400" />
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition relative">
                <Heart size={20} className="text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <User size={20} className="text-gray-400" />
              </button>
            </div>
            <Button className="hidden md:inline-block bg-cyan-500 hover:bg-cyan-600 text-white">Add property</Button>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <a href="#" className="text-sm text-gray-300 hover:text-white py-2 px-2">
              Home
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white py-2 px-2">
              About Us
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white py-2 px-2">
              Find Space
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white py-2 px-2">
              Find Tenants
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white py-2 px-2">
              Map
            </a>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white mt-2">Add property</Button>
          </nav>
        )}
      </div>
    </header>
  )
}
