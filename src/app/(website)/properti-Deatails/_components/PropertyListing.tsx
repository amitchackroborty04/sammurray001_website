"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import ContactForm from "../_components/contact-form";
import PropertySkeleton from "./PropertySkeleton";
import { useApp } from "@/lib/AppContext";



interface ListingData {
  _id: string;
  title: string;
  type: { name: string };
  address: string;
  price: number;
  size?: string;
  description?: string;
  city: string;
  country: string;
  thumble: string;
  user?: {
    fullName: string;
    profileImage?: string;
    email?: string;
  };
}



// Main Component
export default function PropertyListing() {
  const { id } = useParams();
  const { data: session } = useSession();
  const token = session?.user?.accessToken || null;
 const { user } = useApp();
 console.log(user)

  const fetchListing = async (): Promise<ListingData> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch listing");
    const data = await res.json();
    return data.data;
  };

  const { data: listing, isLoading, isError } = useQuery<ListingData>({
    queryKey: ["listing", id, token],
    queryFn: fetchListing,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  const formattedPrice = listing?.price

  // Show Skeleton while loading
 if (isLoading) return <PropertySkeleton />;

  // Show error state
  if (isError || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-500 text-xl">Failed to load property details.</p>
      </div>
    );
  }

    const showMessageButton =
    (user?.activeInactiveSubcrib === "active" && user.isSubscription) ||
    (user?.activeInactiveSubcrib === "inactive" && !user.isSubscription);
  // Main Rendered UI

  return (
    <div className="min-h-screen container mx-auto py-[24px]">
      {/* Hero Image */}
      <div className="w-full overflow-hidden rounded-3xl mb-8">
        <Image
          src={listing?.thumble|| "/assets/card1.png"}
          alt={listing.title}
          width={1000}
          height={1000}
          className="w-full h-56 sm:h-72 md:h-96 lg:h-[400px] object-cover"
          priority
        />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Location */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                {listing.title}
              </h1>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-2 text-[#BFBFBF] text-sm sm:text-base">
                  <MapPin size={18} />
                  <span>{listing.city}, {listing.country}</span>
                </div>

                {/* <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="bg-[#E57525] hover:bg-[#E57525]/90 text-white font-semibold h-11 px-6 rounded-lg transition-all duration-200 text-sm sm:text-base"
                >
                  {isWishlisted ? "Wishlisted" : "+ Add To Wishlist"}
                </button> */}
              </div>
            </div>

            {/* Property Details */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#111827]/50">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-[#BFBFBF] text-sm mb-1">Type</p>
                  <p className="text-white text-lg font-semibold">{listing.type?.name || "N/A"}</p>
                </div>
                {listing.size && (
                  <div>
                    <p className="text-[#BFBFBF] text-sm mb-1">Size</p>
                    <p className="text-white text-lg font-semibold">{listing.size}</p>
                  </div>
                )}
                <div>
                  <p className="text-[#BFBFBF] text-sm mb-1">Price</p>
                  <p className="text-white text-lg font-semibold">
                    ${listing.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <div className="p-6 sm:p-8 rounded-xl bg-[#111827]/50">
                <h2 className="text-2xl font-semibold text-white mb-5">About This Property</h2>
                <p className="text-[#BFBFBF] text-base leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Form - Only for subscribed users */}
            {showMessageButton && <ContactForm formattedPrice={formattedPrice} id={id} />}

            {/* Agent Card */}
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/5">
              <h3 className="text-white text-lg font-bold mb-6">Contact Information</h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E55A24] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">
                    {listing.user?.fullName?.charAt(0).toUpperCase() || "A"}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base sm:text-lg">
                    {listing.user?.fullName || "Property Agent"}
                  </h4>
                  <p className="text-[#BFBFBF] text-sm">Licensed Agent</p>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base">
                {listing.user?.email && (
                  <a href={`mailto:${listing.user.email}`} className="flex items-center gap-3 text-gray-300 hover:text-white transition">
                    <Mail size={18} />
                    {listing.user.email}
                  </a>
                )}
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={18} />
                  (509) 555-0103
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


