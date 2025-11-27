


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Types
interface PropertyType {
  _id: string;
  name: string;
}

interface Property {
  _id: string;
  city: string;
  type: PropertyType;
}

// API Response Types
interface PropertiesResponse {
  statusCode: number;
  success: boolean;
  data: Property[];
}

interface PropertyTypesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: PropertyType[];
}

export default function Hero() {
  const [keyword, setKeyword] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [type, setType] = useState<string>("");

  const { data: session } = useSession();
  const userRole = session?.user?.role as "TENANT" | "SUPPLIER" | undefined;
  const router = useRouter();

  // Fetch Properties (для городов)
  const {
    data: propertiesData,
    isLoading: propertiesLoading,
    error: propertiesError,
  } = useQuery<PropertiesResponse>({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property`);
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    },
  });

  // Fetch Property Types (отдельный запрос)
  const {
    data: propertyTypesData,
    isLoading: typesLoading,
    error: typesError,
  } = useQuery<PropertyTypesResponse>({
    queryKey: ["propertyTypes"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/propertytype/`);
      if (!res.ok) throw new Error("Failed to fetch property types");
      return res.json();
    },
  });

  // Данные для dropdown
  const cities = Array.from(
    new Set(propertiesData?.data.map((p) => p.city) ?? [])
  ).sort();

  const propertyTypes = propertyTypesData?.data ?? [];

  const isLoading = propertiesLoading || typesLoading;
  const error = propertiesError || typesError;

  const handleNeedSpace = () => {
    if (!session) return toast.error("Please login to continue");
    if (userRole === "SUPPLIER") return toast.error("Please login as a tenant");
    router.push("/add-listings-tetans");
  };

  const handleHaveProperty = () => {
    if (!session) return toast.error("Please login to continue");
    if (userRole === "TENANT") return toast.error("Please login as a supplier");
    router.push("/profile?tab=my-property");
  };

  const handleSearch = () => {
    if (!session) return toast.error("Please login to search properties");

    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (location) params.append("city", location);
    if (type) params.append("type", type);

    router.push(`/find-space?${params.toString()}`);
  };

  // Skeleton Components
  const SkeletonLine = ({ width = "100%", height = "20px", className = "" }: { width?: string; height?: string; className?: string }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`} style={{ width, height }} />
  );

  const SkeletonButton = ({ width = "200px" }: { width?: string }) => (
    <div className="h-14 w-full max-w-[200px] bg-gray-300 rounded-lg animate-pulse" style={{ width }} />
  );

  // Loading State
  if (isLoading) {
    return (
      <section className="relative ">
        <div
          className="h-[822px] flex items-end justify-center bg-cover bg-center"
          style={{ backgroundImage: "url(/assets/herobg.png)" }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10 bg-black/50">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
              <div className="flex-1 space-y-8 lg:space-y-0 lg:justify-between flex-col">
                <div className="space-y-4">
                  <SkeletonLine height="68px" className="w-11/12" />
                  <SkeletonLine height="68px" className="w-10/12" />
                  <SkeletonLine height="68px" className="w-8/12" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-3">
                  <SkeletonButton width="220px" />
                  <SkeletonButton width="240px" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8 w-full max-w-lg space-y-6">
                <SkeletonLine height="38px" width="220px" />

                <div className="space-y-5">
                  <div>
                    <SkeletonLine height="16px" width="140px" className="mb-2" />
                    <SkeletonLine height="48px" />
                  </div>
                  <div>
                    <SkeletonLine height="16px" width="80px" className="mb-2" />
                    <SkeletonLine height="48px" />
                  </div>
                  <div>
                    <SkeletonLine height="16px" width="60px" className="mb-2" />
                    <SkeletonLine height="48px" />
                  </div>
                  <SkeletonLine height="52px" className="rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="h-[822px] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Failed to load data</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </section>
    );
  }

  // Main Render
  return (
    <section className="relative">
      <div
        className="h-[822px] flex items-end justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/herobg.png)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-between">
              <h1 className="text-[28px] md:text-[40px] lg:text-[60px] font-extrabold text-white leading-tight md:leading-[1.2]">
                Fast, Fair Cash Offers for Your Property
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 lg:mt-0">
                <Button
                  onClick={handleNeedSpace}
                  className="bg-gradient hover:bg-gradient/90 h-14 px-14 text-lg font-semibold text-white"
                >
                  I need a space
                </Button>

                <Button
                  onClick={handleHaveProperty}
                  variant="outline"
                  className="h-14 px-14 text-lg font-semibold border-white/30 text-white"
                >
                  <span className="bg-text-gradient bg-clip-text text-transparent">
                    I have a property
                  </span>
                </Button>
              </div>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-2xl p-6 lg:p-8 w-full max-w-[400px]">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Search properties
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search for properties
                  </label>
                  <Input
                    placeholder="Enter keyword..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="h-12 rounded-lg border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-12 px-4 pr-10 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Locations</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <div className="relative">
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full h-12 px-4 pr-10 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      {propertyTypes.map((pt) => (
                        <option key={pt._id} value={pt.name}>
                          {pt.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>

                <Button
                  onClick={handleSearch}
                  className="w-full h-13 bg-gradient hover:bg-gradient/90 text-white font-semibold text-lg"
                >
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}