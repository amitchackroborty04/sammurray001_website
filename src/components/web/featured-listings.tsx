
"use client";

import { useQuery } from "@tanstack/react-query";
import ListingCard, { Listing } from "../Reuseable_cards/PropertiesCard";
import { useSession } from "next-auth/react";
import { useApp } from "@/lib/AppContext";

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
interface userprops {
 
    isSubscription: boolean;
    activeInactiveSubcrib: string;
 
}
export default function FeaturedListings() {
  const  session  = useSession();
  const { user } = useApp();
  const token = session?.data?.user?.accessToken || "";

  const { data: response, isLoading, isError } = useQuery<any>({
    queryKey: ["featured-properties", token],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property/`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

 
  const listings: Listing[] = response?.data.map((property: any): Listing => {
    const agent = property.supplyerIdCreateIdAgent;
 

    return {
      id: property._id,
      user: property.user || property._id,
      image: property.thumble || "/placeholder.svg",
      type: property.type?.name || "Unknown",
      badge: agent && "Verified Agent" ,
      price: formatPrice(property.price),
      priceUnit: "USD",
      area: property.size || "N/A",
      title: property.title,
      description: property.description || "No description available",
      location: property.areaya ? `${property.areaya}, ${property.city}` : property.city,

    
      agent: agent ? {
        name: agent.fullName,
        profileImage: agent.profileImage || "https://avatar.iran.liara.run/public/boy",
        phone: agent.phone,
        agencyLogo: agent.agencyLogo,
        website: agent.website,
        verified: agent.verified || false,
        isSubscription: agent.isSubscription,
        activeInactiveSubcrib: agent.activeInactiveSubcrib || "inactive",
      } : undefined,
    };
  }) || [];

  const SkeletonCard = () => (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
      <div className="relative">
        <div className="w-full h-64 bg-gray-800 animate-pulse" />
        <div className="absolute top-4 left-4">
          <div className="px-4 py-2 bg-gray-700 rounded-full w-24 h-8 animate-pulse" />
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-700 rounded w-32 animate-pulse" />
          <div className="h-8 bg-gray-700 rounded w-36 animate-pulse" />
        </div>
        <div className="h-8 bg-gray-700 rounded w-11/12 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-800 rounded w-4/5 animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-[56px]">
          <p className="bg-text-gradient bg-clip-text text-transparent text-xl font-medium mb-2">
            Featured Listings
          </p>
          <h1 className="text-[22px] md:text-4xl font-bold text-white">
            Premium properties and opportunities
          </h1>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : isError ? (
          <div className="text-center py-16 text-red-400">Failed to load</div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {listings.slice(0, 4).map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isSubscriber={user as userprops}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            No featured properties available.
          </div>
        )}
      </div>
    </section>
  );
}