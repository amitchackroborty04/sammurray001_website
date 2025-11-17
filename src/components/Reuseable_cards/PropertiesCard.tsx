"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Ruler, Heart } from "lucide-react";
import Image from "next/image";

export interface Listing {
  id: string;
  image?: string;
  type: string;
  badge?: string;
  price: string;
  priceUnit?: string;
  area: string;
  title: string;
  description: string;
  location: string;
}

interface ListingCardProps {
  listing: Listing;
  isSubscriber: boolean;
}

export default function ListingCard({ listing, isSubscriber }: ListingCardProps) {
  return (
    <Card className="overflow-hidden bg-[#070E28] border-none transition cursor-pointer group">
      
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Image
          src={listing.image || "/placeholder.svg"}
          alt={listing.title}
          width={1000}
          height={1000}
          className="w-full h-[220px] sm:h-[280px] md:h-[330px] object-cover group-hover:scale-105 transition duration-300"
        />
        {listing.badge && (
          <div className="absolute top-3 left-3 bg-gradient py-[12px] px-4 text-white  rounded-[8px] text-sm font-normal">
            {listing.badge}
          </div>
        )}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-white hover:bg-white/80 transition">
          <Heart className="fill-[#FF0000]" />
        </button>
      </div>

      {/* Content */}
      <div className="pt-4 sm:pt-5 px-3 sm:px-4 md:px-5">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4 gap-2 sm:gap-0">
          <p className="text-[#14B8A6] text-lg sm:text-xl font-semibold mb-1">{listing.type}</p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-1">
            <span className="text-gray-400">
              <Ruler size={16} />
            </span>
            <span className="text-gray-300">{listing.area}</span>
            <span className="text-white font-bold">
              {listing.price}
              {listing.priceUnit && (
                <span className="text-xs text-gray-400">.{listing.priceUnit}</span>
              )}
            </span>
          </div>
        </div>

        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2">{listing.title}</h3>
        <p className="text-[#BFBFBF] font-normal text-sm sm:text-base mb-3">{listing.description}</p>

        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={16} />
            <span>{listing.location}</span>
          </div>

          {/* Show message button only if subscription is TRUE */}
          {isSubscriber && (
            <Button className="bg-gradient hover:bg-gradient/80 h-10 sm:h-10 md:h-[40px] px-6 sm:px-8 md:px-[43px] text-white text-sm">
              <MessageCircle size={16} className="mr-2" />
              Message
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
