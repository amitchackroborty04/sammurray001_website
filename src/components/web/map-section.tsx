"use client"

export default function MapSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Explore on Map</h2>

        <div className="rounded-lg overflow-hidden border border-slate-700 h-96">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url(/placeholder.svg?height=400&width=1200&query=interactive map with location pins)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>
    </section>
  )
}
