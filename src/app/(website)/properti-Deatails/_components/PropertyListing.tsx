
"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import ContactForm from "../_components/contact-form";
import PropertySkeleton from "./PropertySkeleton";
import { useApp } from "@/lib/AppContext";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  thumble: string[]; // Now always an array
  user?: {
    fullName: string;
    profileImage?: string;
    email?: string;
    phone?: string;
  };
}

// Image Gallery Component
function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [mainIndex, setMainIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const thumbnails = images.slice(0, 10);
  const slides = images.map((src) => ({ src }));

  return (
    <>
      {/* Main Hero Image */}
      <div
        className="relative w-full overflow-hidden rounded-3xl mb-6 cursor-pointer group"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={images[mainIndex] || "/assets/card1.png"}
          alt={title}
          width={1200}
          height={800}
          className="w-full h-56 sm:h-72 md:h-96 lg:h-[500px] object-cover transition-all duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <p className="text-white font-semibold bg-black/70 px-6 py-3 rounded-lg text-lg">
            View Gallery ({images.length} photos)
          </p>
        </div>
      </div>

      {/* Thumbnails - Max 10 */}
      {thumbnails.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600">
          {thumbnails.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setMainIndex(idx);
              }}
              className={`flex-shrink-0 rounded-xl overflow-hidden border-4 transition-all ${
                mainIndex === idx ? "border-orange-500 shadow-2xl" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={120}
                height={120}
                className="w-24 h-24 object-cover hover:opacity-90 transition"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={mainIndex}
        slides={slides}
        on={{ view: ({ index }) => setMainIndex(index) }}
        render={{
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
          iconPrev: () => <ChevronLeft className="w-10 h-10" />,
          iconNext: () => <ChevronRight className="w-10 h-10" />,
        }}
        labels={{ Close: "Close" }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}

// Main Component
export default function PropertyListing() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const token = session?.user?.accessToken || null;
  const { user } = useApp();

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
    staleTime: 1000 * 60 * 5,
  });

  // Loading & Error States
  if (isLoading) return <PropertySkeleton />;
  if (isError || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-500 text-xl">Failed to load property details.</p>
      </div>
    );
  }

  // Fix: thumble is always an array now
  const images = Array.isArray(listing.thumble)
    ? listing.thumble
    : [listing.thumble || "/assets/card1.png"];

  // Fix: formattedPrice was undefined
  const formattedPrice = listing.price.toLocaleString();

  // Fix: showMessageButton logic (based on your user subscription)
  const showMessageButton =
    (user?.activeInactiveSubcrib === "active" && user?.isSubscription) ||
    (user?.activeInactiveSubcrib === "inactive" && !user?.isSubscription);

  return (
    <div className="min-h-screen container mx-auto py-8 px-4">
      {/* Image Gallery */}
      <PropertyGallery images={images} title={listing.title} />

      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Location */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {listing.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={20} />
                <span>{listing.city}, {listing.country}</span>
              </div>
            </div>

            {/* Price & Details */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-400 text-sm">Type</p>
                  <p className="text-white text-xl font-bold">{listing.type?.name || "N/A"}</p>
                </div>
                {listing.size && (
                  <div>
                    <p className="text-gray-400 text-sm">Size</p>
                    <p className="text-white text-xl font-bold">{listing.size}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400 text-sm">Price</p>
                  <p className="text-white text-2xl font-bold">${formattedPrice}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">About This Property</h2>
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Form - Only for eligible users */}
            {showMessageButton && <ContactForm formattedPrice={formattedPrice} id={id} />}

            {/* Agent Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-white text-xl font-bold mb-6">Contact Agent</h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-orange-500/30">
                  <Image
                    src={listing.user?.profileImage || `https://ui-avatars.com/api/?name=${listing.user?.fullName || "Agent"}&background=FF6B35&color=fff`}
                    alt={listing.user?.fullName || "Agent"}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white text-lg font-bold">
                    {listing.user?.fullName || "Property Agent"}
                  </h4>
                  <p className="text-gray-400">Licensed Real Estate Agent</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-300">
                {listing.user?.email && (
                  <a href={`mailto:${listing.user.email}`} className="flex items-center gap-3 hover:text-white transition">
                    <Mail size={20} />
                    {listing.user.email}
                  </a>
                )}
                {listing.user?.phone ? (
                  <div className="flex items-center gap-3">
                    <Phone size={20} />
                    {listing.user.phone}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-gray-500">
                    <Phone size={20} />
                    Phone not available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}