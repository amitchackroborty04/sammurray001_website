"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left: Image */}
          <div className="md:col-span-5 rounded-lg overflow-hidden h-[350px] sm:h-[450px] md:h-[550px]">
            <Image
              src="/assets/aboutimage.jpg"
              alt="About Property Nexus"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="md:col-span-7 mt-8 md:mt-0 ">
            <p className="bg-text-gradient bg-clip-text text-transparent text-lg sm:text-xl font-medium mb-2">About Us</p>
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-white mb-4 !leading-[150%]">
              Connecting People, Projects, and Possibility.
            </h2>
            <p className="text-[#BFBFBF] text-base sm:text-lg md:text-base font-normal !leading-[150%] mb-6  ">
              Property Nexus is redefining how developers and businesses connect, bringing transparency, speed and
              smarter deal-making to the property market.
            </p>

            <Button className="bg-gradient hover:bg-gradient/95 h-[50px] sm:h-[55px] px-8 sm:px-[50px] text-white">
              Get Started →
            </Button>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <p className="text-4xl sm:text-[50px] md:text-[60px] font-bold text-white">30K</p>
                <p className="text-gray-400 text-sm sm:text-base">Our Products</p>
              </div>
              <div>
                <p className="text-4xl sm:text-[50px] md:text-[60px] font-bold text-white">150+</p>
                <p className="text-gray-400 text-sm sm:text-base">Satisfied Customers</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
