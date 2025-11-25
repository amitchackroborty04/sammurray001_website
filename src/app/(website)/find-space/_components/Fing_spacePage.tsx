"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ListingCard, { Listing } from "@/components/Reuseable_cards/PropertiesCard";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { useApp } from "@/lib/AppContext";

interface ApiProperty {
  _id: string;
  type: { name: string };
  title: string;
  description?: string;
  price: number;
  size?: string;
  thumble: string;
  address: string;
  city: string;
  areaya?: string;
  country: string;
}

interface ApiResponse {
  success: boolean;
  data: ApiProperty[];
}

// interface DecodedToken {
//   id: string;
//   email: string;
//   role: string;
//   isSubscription: boolean;
//   subscriptionExpiry: string;
//   iat: number;
//   exp: number;
// }
interface contexporops{
  isSubscription: boolean;
  activeInactiveSubcrib: string
}

const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);

const SkeletonCard = () => (
  <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-64 bg-gray-800" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-700 rounded w-32" />
      <div className="h-9 bg-gray-700 rounded w-full" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-700 rounded w-4/5" />
      </div>
      <div className="flex justify-between">
        <div className="h-5 bg-gray-700 rounded w-40" />
        <div className="h-5 bg-gray-700 rounded w-24" />
      </div>
    </div>
  </div>
);

export default function FindSpacePage() {
  const searchParams = useSearchParams();
   const { user} = useApp();
  const session = useSession();
  const token = session.data?.user?.accessToken || "";

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);

  // let isSubscriber = false;
  // if (token) {
  //   try {
  //     const decoded: DecodedToken = jwtDecode(token);
  //     isSubscriber = decoded.isSubscription;
  //   } catch (err) {
  //     console.error("Token decode failed", err);
  //   }
  // }

  // Fetch properties
  const { data, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ["properties", token],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  // Unique cities & types
  const uniqueCities = Array.from(new Set(data?.data?.map((item) => item.city).filter(Boolean) || []));
  const uniqueTypes = Array.from(new Set(data?.data?.map((item) => item.type?.name).filter(Boolean) || []));

  // Search function memoized
  const handleSearch = useCallback(
    (overrides?: { search?: string; location?: string; type?: string }) => {
      if (!data?.data) return;

      const s = overrides?.search ?? search;
      const l = overrides?.location ?? location;
      const t = overrides?.type ?? type;

      const filteredData = data.data.filter((item) => {
        const matchesSearch =
          s === "" ||
          item.title.toLowerCase().includes(s.toLowerCase()) ||
          item.description?.toLowerCase().includes(s.toLowerCase()) ||
          item.address.toLowerCase().includes(s.toLowerCase());
        const matchesCity = l === "all" || item.city === l;
        const matchesType = t === "all" || item.type?.name === t;
        return matchesSearch && matchesCity && matchesType;
      });

      const listings: Listing[] = filteredData.map((p) => ({
        id: p._id,
        image: p.thumble || "/assets/fallback.jpg",
        type: p.type?.name || "Property",
        badge: "New",
        price: formatPrice(p.price),
        priceUnit: "USD",
        area: p.size || "N/A",
        title: p.title,
        description: p.description || "No description available",
        location: p.areaya ? `${p.areaya}, ${p.city}` : p.city,
      }));

      setFilteredListings(listings);
    },
    [data, search, location, type]
  );

  // Pre-fill from URL params
 useEffect(() => {
  if (!data?.data) return;

  const keyword = searchParams.get("keyword") || "";
  const city = searchParams.get("city") || "all";
  const typeParam = searchParams.get("type") || "all";

  setSearch(keyword);
  setLocation(city);
  setType(typeParam);

  handleSearch({ search: keyword, location: city, type: typeParam });

// 👇 শুধু data আসলে একবার run হবে
}, [data]);


  return (
    <section className="container mx-auto py-10 px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-[32px] sm:text-[40px] font-bold text-white">Find Your Perfect Space</h1>
        <p className="text-[#BFBFBF] mt-2">Browse available properties and post your requirements</p>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {/* Search */}
        <div>
          <label className="block text-white mb-2">Search</label>
          <Input
            placeholder="Keywords, address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 bg-transparent border-white/30 text-white placeholder:text-gray-400"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-white mb-2">Location</label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-12 bg-transparent border-white/30 text-white">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {uniqueCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-white mb-2">Type</label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-12 bg-transparent border-white/30 text-white">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            onClick={() => handleSearch({ search, location, type })}
            className="w-full h-12 bg-gradient hover:gradient/90"
          >
            Search Properties
          </Button>

        </div>
      </div>

      {/* Property List */}
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}</div>
        ) : isError ? (
          <div className="text-center py-20 text-red-400 text-lg">Failed to load properties.</div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-xl">No properties found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} isSubscriber={user as contexporops} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
