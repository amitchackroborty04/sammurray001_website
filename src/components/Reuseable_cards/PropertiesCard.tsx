"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Ruler, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export interface Listing {
  id: string;
  user: string;
  image?: string;
  type: string;
  badge?: string;
  price: string;
  priceUnit?: string;
  area: string;
  title: string;
  description: string;
  location: string;
}

interface ListingCardProps {
  listing: Listing;
  isSubscriber: {
    isSubscription: boolean;
    activeInactiveSubcrib: string;
  };
}

export default function ListingCard({ listing, isSubscriber }: ListingCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const token = session?.user?.accessToken || "";
  const currentUserId = session?.user?.id;

  // -----------------------------
  // Wishlist Initialize
  // -----------------------------
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      const wishlist: Listing[] = JSON.parse(stored);
      setIsWishlisted(wishlist.some((item) => item.id === listing.id));
    }
  }, [listing.id]);

  // -----------------------------
  // Wishlist Toggle
  // -----------------------------
  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const stored = localStorage.getItem("wishlist");
    let wishlist: Listing[] = stored ? JSON.parse(stored) : [];

    if (isWishlisted) {
      wishlist = wishlist.filter((item) => item.id !== listing.id);
    } else {
      wishlist.push(listing);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
    window.dispatchEvent(new Event("storage"));
  };

  // -----------------------------
  // Show Message button logic
  // -----------------------------
  const showMessageButton =
    (isSubscriber?.activeInactiveSubcrib === "active" && isSubscriber.isSubscription) ||
    (isSubscriber?.activeInactiveSubcrib === "inactive" && !isSubscriber.isSubscription);

  // -----------------------------
  // Create Conversation
  // -----------------------------
  const createConversationMutation = useMutation({
    mutationFn: async () => {
      if (!token) return toast.error("You must login first!");

      if (listing.user === currentUserId) {
        return toast.error("You cannot message yourself!");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ receiverId: listing.user }),
        }
      );

      if (!res.ok) throw new Error("Failed to create conversation");

      return res.json();
    },

    onSuccess: () => {
      toast.success("Conversation created successfully!");
      router.push("/message");
    },

    onError: () => {
      toast.error("Failed to create conversation. Try again!");
    },
  });

  return (
    <div className="relative">
      <Card className="overflow-hidden bg-[#070E28] border-none transition group">
        <Link href={`/properti-Deatails/${listing.id}`}>
          <div className="relative overflow-hidden cursor-pointer">
            <Image
              src={listing.image || "/placeholder.svg"}
              alt={listing.title}
              width={1000}
              height={1000}
              className="w-full h-[220px] sm:h-[280px] md:h-[330px] object-cover group-hover:scale-105 transition duration-300"
            />

            {listing.badge && (
              <div className="absolute top-3 left-3 bg-gradient py-[12px] px-4 text-white rounded-[8px] text-sm font-normal">
                {listing.badge}
              </div>
            )}
          </div>
        </Link>

        {/* Content Section */}
        <div className="pt-4 sm:pt-5 px-3 sm:px-4 md:px-5">
          <div className="flex flex-col sm:flex-row sm:justify-between mb-4 gap-2 sm:gap-0">
            <p className="text-[#14B8A6] text-lg sm:text-xl font-semibold mb-1">
              {listing.type}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-1">
              <Ruler size={16} className="text-gray-400" />
              <span className="text-gray-300">{listing.area}</span>

              <span className="text-white font-bold">
                {listing.price}
                {listing.priceUnit && (
                  <span className="text-xs text-gray-400">.{listing.priceUnit}</span>
                )}
              </span>
            </div>
          </div>

          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2">
            {listing.title}
          </h3>

          <p className="text-[#BFBFBF] font-normal text-sm sm:text-base mb-3 line-clamp-1">
            {listing.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={16} />
              <span>{listing.location}</span>
            </div>

            {showMessageButton && (
              <Button
                onClick={() => createConversationMutation.mutate()}
                className="bg-gradient hover:bg-gradient/80 h-10 px-6 text-white"
              >
                <MessageCircle size={16} className="mr-2" />
                Message
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/80 transition"
      >
        <Heart
          className={
            isWishlisted
              ? "fill-[#FF0000] text-[#FF0000]"
              : "fill-white text-black"
          }
        />
      </button>
    </div>
  );
}
