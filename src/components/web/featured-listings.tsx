"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, MapPin } from "lucide-react"

export default function FeaturedListings() {
  const listings = [
    {
      id: 1,
      image: "/modern-office-space-with-windows.jpg",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      title: "Modern Office Space in CBD",
      description: "New commercial development in central Wellington",
      location: "Te Aro, Wellington",
    },
    {
      id: 2,
      image: "/industrial-warehouse.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      title: "Modern Office Space in CBD",
      description: "New commercial development in central Wellington",
      location: "Te Aro, Wellington",
    },
    {
      id: 3,
      image: "/fashion-retail-store-interior.jpg",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      title: "Modern Office Space in CBD",
      description: "New commercial development in central Wellington",
      location: "Te Aro, Wellington",
    },
    {
      id: 4,
      image: "/tall-office-building-exterior.jpg",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      title: "Modern Office Space in CBD",
      description: "New commercial development in central Wellington",
      location: "Te Aro, Wellington",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-semibold mb-2">Featured Listings</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
            Prem
            <span className="inline-flex gap-1 -ml-1">
              <span className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                S
              </span>
              <span className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                D
              </span>
            </span>{" "}
            properties and opportunities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <Card
              key={listing.id}
              className="bg-slate-800 border-slate-700 overflow-hidden hover:border-cyan-400 transition cursor-pointer group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 left-3 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {listing.badge}
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition">
                  ♥
                </button>
              </div>

              <div className="p-4">
                <p className="text-cyan-400 text-xs font-semibold mb-1">{listing.type}</p>
                <h3 className="text-white font-bold mb-2">{listing.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{listing.description}</p>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">📍</span>
                    <span className="text-gray-300">{listing.area}</span>
                  </div>
                  <span className="text-white font-bold">
                    {listing.price}
                    <span className="text-xs text-gray-400">.{listing.priceUnit}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                  <MapPin size={16} />
                  <span>{listing.location}</span>
                </div>

                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-sm">
                  <MessageCircle size={16} className="mr-2" />
                  Message
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
