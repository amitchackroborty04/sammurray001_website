


"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TenantsCard, { Listing } from "./Tenants_Card";
import { jwtDecode } from "jwt-decode";
import SkeletonCard from "./SkeletonCard";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ListingData {
  _id: string;
  user: {
    fullName: string;
    profileImage: string;
  };
  type: {
    name: string;
  };
  badge?: string;
  price: number;
  priceUnit?: string;
  size?: string;
  description?: string;
  city: string;
  country: string;
  number?: string;
  mounth?: string;
  month?: string;
  extraLocation?: string;
  extaraLocation?: string;
}

interface TokenPayload {
  id: string;
  role: string;
  email: string;
  isSubscription: boolean;
}

const Find_Teantspage: React.FC = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken || null;

  // Filter States
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);

  let isSubscription = false;
  if (token) {
    try {
      const decoded: TokenPayload = jwtDecode(token);
      isSubscription = decoded.isSubscription || false;
    } catch (err) {
      console.error("Invalid token :", err);
    }
  }

  // Fetch listings
  const fetchListings = async (): Promise<Listing[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listing`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch listings");
    const data = await res.json();

    return (data.data || []).map((item: ListingData) => ({
      id: item._id,
      name: item.user?.fullName || "Unknown",
      image: item.user?.profileImage || "/placeholder.svg",
      type: item.type?.name || "N/A",
      badge: item.badge || (item.price < 0 ? "Wanted" : "Available"),
      price: item.price ? `$${Math.abs(item.price)}` : "N/A",
      priceUnit: item.priceUnit || "USD",
      area: item.size || "N/A",
      description: item.description || "No description available",
      location: `${item.city || ""}, ${item.country || ""}`.trim() || "Location not specified",
      number: item.number || "",
      extraData: isSubscription
        ? {
            month: item.mounth || item.month || "",
            extraLocation: item.extraLocation || item.extaraLocation || "",
          }
        : undefined,
    }));
  };

  const { data: listings, isLoading, isError } = useQuery<Listing[]>({
    queryKey: ["listings", token],
    queryFn: fetchListings,
    staleTime: 1000 * 60 * 5,
  });

  // Unique values for dropdowns
  const uniqueCities = Array.from(new Set(listings?.map(l => l.location.split(",")[0].trim()) || []));
  const uniqueTypes = Array.from(new Set(listings?.map(l => l.type) || []));

  // Apply filters
  const applyFilters = () => {
    if (!listings) return;

    const filtered = listings.filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const itemCity = item.location.split(",")[0].trim();
      const matchesCity = location === "all" || itemCity === location;

      const matchesType = type === "all" || item.type === type;


      return matchesSearch && matchesCity && matchesType;
    });

    setFilteredListings(filtered);
  };

  // Initial load & when listings change
  useEffect(() => {
    if (listings) {
      setFilteredListings(listings);
    }
  }, [listings]);

  // Run filter when button is clicked
  const handleSearch = () => {
    applyFilters();
  };

  return (
    <section className="container mx-auto py-10">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-[32px] sm:text-[40px] font-bold text-white">
          Find Tenants
        </h1>
        <p className="text-base font-normal text-[#BFBFBF]">
          Find your Tenant with thousands of active seekers
        </p>
      </div>

     {/* filters */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {/* Search */}
        <div>
          <label className="block text-white mb-2">Search</label>
          <Input
            placeholder="Name, location, description..."
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
          <label className="block text-white mb-2">Property Type</label>
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
          <Button className="w-full h-12 bg-gradient" onClick={handleSearch}>
            Search Tenants
          </Button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6)
            .fill(0)
            .map((_, i) => <SkeletonCard key={i} />)
        ) : isError ? (
          <p className="text-center text-gray-400 col-span-full">Failed to load listings.</p>
        ) : filteredListings.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">No tenants found.</p>
        ) : (
          filteredListings.map((listing) => (
            <TenantsCard
              key={listing.id}
              listing={listing}
              showFullCard={!!token && isSubscription}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Find_Teantspage;