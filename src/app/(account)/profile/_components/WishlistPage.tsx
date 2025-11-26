"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Ruler } from "lucide-react";
import Link from "next/link";

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

const WishListPage = () => {
  const [wishlist, setWishlist] = useState<Listing[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  const handleRemove = (id: string) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen container mx-auto text-white mt-2" >
      {wishlist.length === 0 ? (
        <p className="text-gray-400">No items in your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {wishlist.map((listing) => (
            <div
              key={listing.id}
              className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 shadow-md hover:shadow-lg transition relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(listing.id)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition z-10"
              >
                X
              </button>

              <Link href={`/properti-Deatails/${listing.id}`} className="block">
                {/* Image */}
                <div className="relative w-full h-56">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    style={{ objectFit: "cover" }} // ensures the image covers the container
                    fill
                    className="rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  {listing.badge && (
                    <span className="absolute top-3 left-3 bg-cyan-500 text-white text-xs font-medium px-2 py-1 rounded">
                      {listing.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {listing.title}
                  </h3>
                  <p className="text-[#14B8A6] font-medium">{listing.type}</p>
                  <p className="font-bold text-white">
                    {listing.price}
                    {listing.priceUnit && (
                      <span className="text-gray-400 text-sm">
                        .{listing.priceUnit}
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-3 text-gray-300 text-sm">
                    <div className="flex items-center gap-1">
                      <Ruler size={16} /> {listing.area}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} /> {listing.location}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{listing.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListPage;
