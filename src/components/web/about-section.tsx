"use client"

import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="rounded-lg overflow-hidden h-80">
            <img src="/modern-apartment-building-with-balconies.jpg" alt="About Property Nexus" className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div>
            <p className="text-cyan-400 text-sm font-semibold mb-2">About Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Connecting People, Projects, and Possibility.
            </h2>
            <p className="text-gray-400 mb-6">
              Property Nexus is redefining how developers and businesses connect, bringing transparency, speed and
              smarter deal-making to the property market.
            </p>

            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Get Started →</Button>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <p className="text-4xl font-bold text-white">30K</p>
                <p className="text-gray-400 text-sm">Our Products</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">150+</p>
                <p className="text-gray-400 text-sm">Satisfied Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
