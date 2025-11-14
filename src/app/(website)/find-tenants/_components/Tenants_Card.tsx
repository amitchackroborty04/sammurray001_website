

"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, MapPin, Ruler } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export interface Listing {
    id: number;
  image?: string;
  type: string;
  badge?: string;
  price: string;
  priceUnit?: string;
  area: string;
  name: string; 
  description: string;
  location: string;
  number: string; 
   
}

interface ListingCardProps {
    listing: Listing
}

export default function TenantsCard({ listing }: ListingCardProps) {
    return (
        <Link href={`/properti-Deatails/${listing.id}`}>
        <Card className="overflow-hidden bg-[#070E28] border-none transition cursor-pointer group">
            {/* Image Section */}
            <div className="relative overflow-hidden">
                <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.name}
                    width={1000}
                    height={1000}
                    className="w-full h-[220px] sm:h-[280px] md:h-[330px] rounded-[8px] object-cover group-hover:scale-105 transition duration-300"
                />
            </div>

            {/* Content */}
            <div className="pt-4 sm:pt-5 px-3 sm:px-4 md:px-5 space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2">{listing.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin size={16} />
                        <span>{listing.location}</span>
                    </div>
                </div>
                <div>
                <div className="flex justify-between items-center">
                    <div className="text-base font-normal text-[#BFBFBF]">
                      
                        {listing.number}
                    </div>
                    <div>
                        <div className="text-base font-normal text-[#BFBFBF] flex gap-3 items-center">
                              <span>
                                <Ruler size={16} />
                              </span>
                            Area: {listing.area}
                        </div>
                    </div>
                </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3">
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between mb-4 gap-2 sm:gap-0">
                    <p className="text-[#14B8A6] text-lg sm:text-xl font-semibold mb-1">{listing.type}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-1">
                        <span className="text-white font-bold">
                            {listing.price}
                            {listing.priceUnit && (
                                <span className="text-xs text-gray-400">.{listing.priceUnit}</span>
                            )}
                        </span>
                    </div>
                </div>
                <div>
                    <Button className="bg-gradient w-full hover:bg-gradient/80 h-10 sm:h-10 md:h-[40px] px-6 sm:px-8 md:px-[43px] text-white text-sm">
                        <MessageCircle size={16} className="mr-2" />
                        Message
                    </Button>
                </div>
            </div>
        </Card>
        </Link>
    )
}
