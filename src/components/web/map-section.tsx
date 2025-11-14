"use client"

export default function MapSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" id="map">
      <div className="container mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Explore on Map
        </h2>

        {/* Map */}
        <div className="rounded-lg overflow-hidden border border-slate-700 w-full h-[384px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7302.23185572447!2d90.39956824540111!3d23.778885832676217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77094eace8b%3A0x1cd8c2d9239b6cb7!2sMohakhali%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1763011453595!5m2!1sen!2sbd"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
