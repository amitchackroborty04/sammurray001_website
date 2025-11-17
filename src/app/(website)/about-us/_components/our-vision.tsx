import Image from "next/image";

export default function OurVision() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Our Vision
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

          {/* Image */}
          <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[335px] overflow-hidden rounded-lg">
            <Image
              src="/assets/about4.jpg"
              alt="Team collaboration"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold text-accent sm:text-3xl">
              Shaping the Future of Property Development
            </h3>

            <p className="mb-4 text-[17px] sm:text-lg leading-relaxed text-[#BFBFBF]">
              We believe in a world where property and people connect seamlessly — 
              where developers have the network, transparency, and direct opportunities 
              to find next moves and drive smarter decisions.
            </p>

            <p className="text-[17px] sm:text-lg leading-relaxed text-[#BFBFBF]">
              Property Nexus isn&apos;t just a platform — it&apos;s a community. It&apos;s where the next 
              generation of property leaders connect and collaborate. That&apos;s our vision.
            </p>
          </div>

        </div>

        {/* CTA Button */}
        <div className="mt-14 text-center">
          <button className="rounded-lg bg-gradient px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Join the Nexus →
          </button>
        </div>

      </div>
    </section>
  );
}
