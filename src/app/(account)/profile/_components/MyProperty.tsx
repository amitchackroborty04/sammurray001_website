"use client";

import ListingCard, { Listing } from "@/components/Reuseable_cards/PropertiesCard";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface PropertyType {
  _id: string;
  name: string;
}

interface Property {
  areaya?: string;
  _id: string;
  title: string;
  description?: string;
  price: number;
  size: string;
  address: string;
  city: string;
  country: string;
  type: PropertyType;
  thumble?: string;
  user: string;
  managedByThisAgency?: boolean;
  supplyerIdCreateIdAgent?: string;
}

interface ApiResponse {
  success: boolean;
  data: Property[];
}

// Skeleton Card
const PropertySkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-800 rounded-xl overflow-hidden">
      <div className="h-[280px] bg-gray-700" />
      <div className="p-5 space-y-4">
        <div className="h-6 bg-gray-700 rounded w-32" />
        <div className="h-8 bg-gray-600 rounded w-48" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-4/5" />
        </div>
        <div className="h-10 bg-gray-600 rounded-lg" />
      </div>
    </div>
  </div>
);

export default function PropertiesPage() {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken as string | undefined;

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["properties", token],
    queryFn: async () => {
      if (!token) {
        throw new Error("You must be logged in to view properties");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property/my/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch properties");
      }

      return res.json();
    },
    enabled: !!token, // Only run query if token exists (user is logged in)
    retry: 1,
  });

  // Transform API data → ListingCard format
  const listings: Listing[] = (data?.data || []).map((property) => ({
    id: property._id,
    user: property.user,
    image: property.thumble || "/placeholder.svg",
    type: property.type.name,
    price: `$${property.price.toLocaleString()}`,
    area: property.size,
      priceUnit: "USD",
    title: property.title,
    description: property.description || "No description available",
    location: property.areaya ? `${property.areaya}, ${property.city}` : property.city,
    badge: property.managedByThisAgency ? "Verified Agent" : undefined,

    agent: property.managedByThisAgency
      ? {
          name: "Premium Agent",
          profileImage: "/agent-placeholder.jpg",
          phone: "+880 1XXX-XXXXXX",
          verified: true,
          isSubscription: true,
          activeInactiveSubcrib: "active" as const,
        }
      : undefined,
  }));

  const isSubscriber = {
    isSubscription: true,
    activeInactiveSubcrib: "active",
  };

  // Show login prompt if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-2xl text-white mb-6">Please log in to view properties</p>
        <button
          onClick={() => window.location.href = "/login"}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90"
        >
          Login Now
        </button>
      </div>
    );
  }

  if (isLoading || status === "loading") {
    return (
      <div className="container mx-auto px-4 py-12 bg-gray-950 min-h-screen">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">Loading Properties...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {[...Array(8)].map((_, i) => (
            <PropertySkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center bg-gray-950 min-h-screen">
        <p className="text-red-400 text-xl mb-4">
          {(error as Error).message || "Failed to load properties"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-white bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center bg-gray-950 min-h-screen">
        <p className="text-gray-400 text-xl">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="w-fullmin-h-screen">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center">
        Available Properties
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            isSubscriber={isSubscriber}
          />
        ))}
      </div>
    </div>
  );
}