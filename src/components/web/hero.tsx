"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const [location, setLocation] = useState("")
  const [type, setType] = useState("")
  const [size, setSize] = useState("")

  return (
    <section className="relative bg-cover bg-center">
      {/* Background Image */}
      <div
        className="h-[822px] flex items-center justify-center" // centers content
        style={{
          backgroundImage: "url(/assets/herobg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Main Centered Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Fast, Fair Cash Offers for Your Property
              </h1>
              <div className="flex gap-4">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  I need a space
                </Button>
                <Button variant="outline" className="bg-white text-slate-950 hover:bg-gray-100 border-0">
                  I have a property
                </Button>
              </div>
            </div>

            {/* Right Search Form */}
            <div className="bg-white rounded-lg p-6 space-y-4 shadow-lg">
              <h3 className="text-xl font-bold text-slate-950">Search properties</h3>

              <div>
                <label className="text-sm text-slate-600 block mb-1">Search for properties</label>
                <Input
                  placeholder="Search..."
                  className="bg-gray-50 border-gray-200 text-slate-950 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 block mb-1">Location</label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-slate-950 appearance-none"
                  >
                    <option value="">Location</option>
                    <option value="cbd">CBD</option>
                    <option value="downtown">Downtown</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-600 block mb-1">Type</label>
                <div className="relative">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-slate-950 appearance-none"
                  >
                    <option value="">Type</option>
                    <option value="commercial">Commercial</option>
                    <option value="residential">Residential</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-600 block mb-1">Size</label>
                <Input
                  placeholder="sqm"
                  className="bg-gray-50 border-gray-200 text-slate-950 placeholder:text-gray-400"
                />
              </div>

              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                Search Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
