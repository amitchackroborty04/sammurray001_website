import Image from "next/image";

export default function WhatMakesUsDifferent() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            What Makes Us Different
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

          {/* Text */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold text-accent sm:text-3xl">
              Designed for Modern Property Relationships
            </h3>

            <ul className="space-y-4 pl-5">
              <li className="text-[17px] sm:text-lg text-[#BFBFBF] leading-relaxed">
                <strong className="text-white">Smarter Matching:</strong> AI-assisted listings that connect projects  
                and tenants based on real requirements.
              </li>

              <li className="text-[17px] sm:text-lg text-[#BFBFBF] leading-relaxed">
                <strong className="text-white">Focus on Commercial Growth:</strong> Built for industrial, office,  
                retail, and commercial projects — not just residential.
              </li>

              <li className="text-[17px] sm:text-lg text-[#BFBFBF] leading-relaxed">
                <strong className="text-white">Privacy First:</strong> Verified profiles, secure messaging, and  
                full control over what’s shared.
              </li>

              <li className="text-[17px] sm:text-lg text-[#BFBFBF] leading-relaxed">
                <strong className="text-white">Expanding Network:</strong> Starting in New Zealand and Australia —  
                designed to scale globally.
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[335px] overflow-hidden rounded-lg">
            <Image
              src="/assets/about3.jpg"
              alt="Team collaboration"
              fill
              className="object-cover rounded-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
