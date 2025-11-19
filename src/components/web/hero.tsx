"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Type definitions
interface PropertyType {
  _id: string;
  name: string;
}

interface Property {
  _id: string;
  city: string;
  type: PropertyType;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  data: Property[];
}

export default function Hero() {
  const [keyword, setKeyword] = useState(""); 
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  

  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const router = useRouter();

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property`);
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    },
  });

  const cities = Array.from(new Set(data?.data.map((p) => p.city)));
  const types = Array.from(new Set(data?.data.map((p) => p.type.name)));

  // Button click helpers
  const handleNeedSpace = () => {
    if (!session) {
      toast.error("Please login");
      return;
    }
    if (userRole === "SUPPLIER") {
      toast.error("Please login as tenant");
      return;
    }
    router.push("/add-listings-tetans");
  };

  const handleHaveProperty = () => {
    if (!session) {
      toast.error("Please login");
      return;
    }
    if (userRole === "TENANT") {
      toast.error("Please login as supplier");
      return;
    }
    router.push("/add-listings-supplier");
  };

  const handleSearch = () => {
    if (!session) {
      toast.error("Please login");
      return;
    }

    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (location) params.append("city", location);
    if (type) params.append("type", type);
  

    router.push(`/find-space?${params.toString()}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading properties</div>;

  return (
    <section className="relative bg-cover bg-center">
      <div
        className="h-[822px] flex items-end justify-center"
        style={{
          backgroundImage: "url(/assets/herobg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-start lg:justify-between">
              <h1 className="text-[28px] md:text-[40px] lg:text-[60px] font-extrabold mb-3 md:mb-6 text-white leading-[150%]">
                Fast, Fair Cash Offers for Your Property
              </h1>

              <div className="flex flex-col sm:flex-row sm:gap-4 mt-6 lg:mt-0">
                <Button
                  onClick={handleNeedSpace}
                  className="bg-gradient hover:bg-gradient/80 h-10 md:h-[56px] px-[53px] text-white text-base md:text-[18px] font-semibold mb-4 sm:mb-0"
                >
                  I need a space
                </Button>

                <Button
                  onClick={handleHaveProperty}
                  className="bg-white hover:bg-white h-10 md:h-[56px] border border-gray-200 px-[53px] rounded-lg text-white text-base md:text-[18px] font-semibold"
                >
                  <span className="bg-text-gradient bg-clip-text text-transparent font-semibold">
                    I have a property
                  </span>
                </Button>
              </div>
            </div>

            {/* Right Search Form */}
            <div className="flex-1 max-w-full lg:max-w-[527px] bg-white rounded-lg p-6 space-y-4 shadow-lg">
              <h3 className="text-[26px] md:text-[32px] font-semibold text-[#000000]">
                Search properties
              </h3>

              <div>
                <label className="text-base text-[#000000] block mb-1">
                  Search for properties
                </label>
                <Input
                  placeholder="Search..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="border-[#BFBFBF] placeholder:text-[#595959] text-[#595959] h-[48px] rounded-[8px]"
                />
              </div>

              <div>
                <label className="text-base text-[#000000] block mb-1">Location</label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-[#BFBFBF] bg-white text-[#595959] h-[48px] rounded-[8px] px-3 appearance-none"
                  >
                    <option value="">Select Location</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>

              <div>
                <label className="text-base text-[#000000] block mb-1">Type</label>
                <div className="relative">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border border-[#BFBFBF] bg-white text-[#595959] h-[48px] rounded-[8px] px-3 appearance-none"
                  >
                    <option value="">Select Type</option>
                    {types.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>

            

              <Button
                className="w-full bg-gradient hover:bg-gradient/92 h-[49px] text-white"
                onClick={handleSearch}
              >
                Search Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
