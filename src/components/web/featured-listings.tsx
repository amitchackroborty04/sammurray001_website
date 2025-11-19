

"use client";

import { useQuery } from "@tanstack/react-query";
import ListingCard, { Listing } from "../Reuseable_cards/PropertiesCard";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";

// =======================
// API Types
// =======================
interface ApiProperty {
  _id: string;
  type: { name: string };
  title: string;
  price: number;
  address: string;
  city: string;
  country: string;
  thumble: string;
  description?: string;
  size?: string;
  areaya?: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ApiProperty[];
}

// =======================
// Token Decode Type
// =======================
interface DecodedToken {
  id: string;
  role: string;
  email: string;
  isSubscription: boolean;
  subscriptionExpiry: string;
  iat: number;
  exp: number;
}

// =======================
// Format Price
// =======================
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// =======================
// FeaturedListings Component
// =======================
export default function FeaturedListings() {
  const session = useSession();
  const token = session.data?.user?.accessToken || "";
  let isSubscriber = false;

  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      isSubscriber = decoded.isSubscription;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const { data: response, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ["featured-properties", token],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch properties: ${res.status} ${errorText}`);
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const listings: Listing[] =
    response?.data.map((property): Listing => ({
      id: property._id,
      image: property.thumble || "/assets/fallback-image.png",
      type: property.type?.name || "Unknown",
      badge: "Top pick",
      price: formatPrice(property.price),
      priceUnit: "USD",
      area: property.size || "N/A",
      title: property.title,
      description: property.description || "No description available",
      location: property.areaya ? `${property.areaya}, ${property.city}` : property.city,
    })) || [];

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
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-40 animate-pulse" />
          </div>
          <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
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
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-16">
            <p className="text-red-400 text-lg">Failed to load properties. Please try again later.</p>
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} isSubscriber={isSubscriber} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No featured properties available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
