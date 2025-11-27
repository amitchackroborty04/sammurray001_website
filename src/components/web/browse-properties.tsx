

"use client";

import { useQuery } from "@tanstack/react-query";
import ListingCard, { Listing } from "../Reuseable_cards/PropertiesCard";
import { useSession } from "next-auth/react";
import { useApp } from "@/lib/AppContext";

interface contexporops {
  isSubscription: boolean;
  activeInactiveSubcrib: string;
}

const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

export default function BrowseProperties() {
  const { user } = useApp();
  const session = useSession();
  const token = session.data?.user?.accessToken || "";

  const { data: response, isLoading, isError } = useQuery<any>({
    queryKey: ["browse-properties", token],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch: ${error}`);
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });


  const listings: Listing[] = response?.data.map((property: any) => {
    const agent = property.supplyerIdCreateIdAgent;

   

    return {
      id: property._id,
      user: property.user || property._id,
      image: property.thumble || "/assets/fallback-image.png",
      type: property.type?.name || "Unknown",
      badge: agent && "Verified Agent" ,
      price: formatPrice(property.price),
      priceUnit: "USD",
      area: property.size || "N/A",
      title: property.title,
      description: property.description || "No description available",
      location: property.areaya
        ? `${property.areaya}, ${property.city}`
        : property.city,

  
      agent: agent
        ? {
            name: agent.fullName,
            profileImage: agent.profileImage || "https://avatar.iran.liara.run/public/boy",
            phone: agent.phone,
            agencyLogo: agent.agencyLogo,
            website: agent.website,
            verified: agent.verified || false,
            isSubscription: agent.isSubscription,
            activeInactiveSubcrib: agent.activeInactiveSubcrib || "inactive",
          }
        : null,
    };
  }) || [];


  const SkeletonCard = () => (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 animate-pulse">
      <div className="h-64 bg-gray-800" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-700 rounded w-32" />
        <div className="h-8 bg-gray-700 rounded w-11/12" />
        <div className="h-4 bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-800 rounded w-4/5" />
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-[56px]">
          <p className="bg-text-gradient bg-clip-text text-transparent text-xl font-medium mb-2">
            Latest Listings
          </p>
          <h1 className="text-[22px] md:text-4xl font-bold text-white">
            Browse all available properties and opportunities
          </h1>
        </div>

        {isLoading ? (
          <div className="grid grid Η-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-400 py-16 text-lg">
            Failed to load properties. Try again later.
          </p>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isSubscriber={user as contexporops}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-16 text-lg">
            No properties available.
          </p>
        )}
      </div>
    </section>
  );
}