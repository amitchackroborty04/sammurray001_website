"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default function BrowseProperties() {
  const properties = [
    {
      id: 1,
      image: "/modern-office-desk.png",
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
      image: "/industrial-warehouse-interior.jpg",
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
      image: "/retail-fashion-store.jpg",
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
      image: "/modern-office-exterior.png",
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
      id: 5,
      image: "/industrial-warehouse-yellow-equipment.jpg",
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
      id: 6,
      image: "/empty-modern-office-space.jpg",
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
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-semibold mb-2">Latest Listings</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Browse all available properties and opportunities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="bg-slate-800 border-slate-700 overflow-hidden hover:border-cyan-400 transition cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 left-3 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {property.badge}
                </div>
                <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition text-sm">
                  ♥
                </button>
              </div>

              <div className="p-4">
                <p className="text-cyan-400 text-xs font-semibold mb-1">{property.type}</p>
                <h3 className="text-white font-bold text-sm mb-1">{property.title}</h3>
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">{property.description}</p>

                <div className="flex items-center justify-between mb-3 text-xs mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">📍</span>
                    <span className="text-gray-300">{property.area}</span>
                  </div>
                  <span className="text-white font-bold">
                    {property.price}
                    <span className="text-xs text-gray-400">.{property.priceUnit}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                  <span>📍</span>
                  <span>{property.location}</span>
                </div>

                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-xs h-8">
                  <MessageCircle size={14} className="mr-2" />
                  Message
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Explore More →</Button>
        </div>
      </div>
    </section>
  )
}
