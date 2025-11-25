// "use client";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MessageCircle, MapPin, Ruler } from "lucide-react";
// import Image from "next/image";
// import { useApp } from "@/lib/AppContext";

// export interface Listing {
//   //eslint-disable-next-line
//   [x: string]: any;
//   id: string;
//   image?: string;
//   type: string;
//   badge?: string;
//   price: string;
//   priceUnit?: string;
//   area: string;
//   name: string;
//   description: string;
//   location: string;
//   number: string;
//   extraData?: {
//     month?: string;
//     //eslint-disable-next-line
//     extraLocation?: any;
//   };
// }

// interface TenantsCardProps {
//   listing: Listing;
//   showFullCard?: boolean;  
  
// }

// export default function TenantsCard({ listing, showFullCard }: TenantsCardProps) {
//     const { user} = useApp();
//     console.log(user)
//   return (
//     // <Link href={`/properti-Deatails/${listing.id}`}>
//       <Card className="overflow-hidden bg-[#070E28] border-none transition cursor-pointer group hover:scale-105 transform">
//         {/* Image */}
//         <div className="relative overflow-hidden">
//           <Image
//             src={listing.image || "/placeholder.svg"}
//             alt={listing.name}
//             width={1000}
//             height={1000}
//             className="w-full h-[220px] sm:h-[280px] md:h-[330px] rounded-[8px] object-cover group-hover:scale-105 transition duration-300"
//           />
//         </div>

//         {/* Content */}
//         <div className="pt-4 sm:pt-5 px-3 sm:px-4 md:px-5 space-y-3">
//           {/* Name & Location */}
//           <div className="flex justify-between items-center">
//             <h3 className="text-white text-lg sm:text-xl md:text-xl font-semibold mb-2">
//               {listing.name}
//             </h3>
//             <div className="flex items-center gap-2 text-xs text-gray-400">
//               <MapPin size={16} />
//               <span>{listing.location}</span>
//             </div>
//           </div>

//           {/* Number & Area */}
//           <div className="flex justify-between items-center text-[#BFBFBF] text-base font-normal">
//             <span>{listing.number}</span>
//             <span className="flex items-center gap-2">
//               <Ruler size={16} /> Area: {listing.area}
//             </span>
//           </div>

//           {/* Type & Price */}
//           <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3">
//             <p className="bg-gradient bg-clip-text text-transparent text-lg sm:text-xl font-semibold mb-1">
//               {listing.type}
//             </p>
//             <div className="flex flex-wrap items-center gap-2 sm:gap-1 text-white font-bold">
//               {listing.price}
//               {listing.priceUnit && (
//                 <span className="text-xs text-gray-400">.{listing.priceUnit}</span>
//               )}
//             </div>
//           </div>

//           {/* Description */}
//           {/* <p className="text-[#BFBFBF] text-sm">{listing.description}</p> */}

//           {/* Extra data if available */}
//           {/* {listing.extraData && (
//             <div className="text-[#BFBFBF] text-sm mt-2">
//               {listing.extraData.month && <p>Month: {listing.extraData.month}</p>}
//               {listing.extraData.extraLocation && (
//                 <p>Extra Location: {listing.extraData.extraLocation.letatus}</p>
//               )}
//             </div>
//           )} */}

//           {/* Message Button ONLY if subscription */}
//           {showFullCard && (
//             <div>
//               <Button className="bg-gradient w-full hover:bg-gradient/80 h-10 sm:h-10 md:h-[40px] px-6 sm:px-8 md:px-[43px] text-white text-sm flex items-center justify-center">
//                 <MessageCircle size={16} className="mr-2" />
//                 Message
//               </Button>
//             </div>
//           )}
//         </div>
//       </Card>
//     // </Link>
//   );
// }


"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Ruler } from "lucide-react";
import Image from "next/image";
import { useApp } from "@/lib/AppContext";

export interface Listing {
  [x: string]: any;
  id: string;
  image?: string;
  type: string;
  badge?: string;
  price: string;
  priceUnit?: string;
  area: string;
  name: string;
  description: string;
  location: string;
  number: string;
  extraData?: {
    month?: string;
    extraLocation?: any;
  };
}

interface TenantsCardProps {
  listing: Listing;
  showFullCard?: boolean;
}

export default function TenantsCard({ listing, showFullCard }: TenantsCardProps) {
  const { user } = useApp();

  // ======== Access Control Logic ===========
  const hideFeatures =
    user?.activeInactiveSubcrib === "active" && user?.isSubscription === false;

  const showMessageButton =
    (user?.activeInactiveSubcrib === "inactive" && user?.isSubscription === false) ||
    (user?.activeInactiveSubcrib === "active" && user?.isSubscription === true);

  // =========================================

  return (
    <Card className="overflow-hidden bg-[#070E28] border-none transition cursor-pointer group hover:scale-105 transform">

      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={listing.image || "/placeholder.svg"}
          alt={listing.name}
          width={1000}
          height={1000}
          className="w-full h-[220px] sm:h-[280px] md:h-[330px] rounded-[8px] object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="pt-4 sm:pt-5 px-3 sm:px-4 md:px-5 space-y-3">

        {/* Name & Location */}
        <div className="flex justify-between items-center">
          <h3 className="text-white text-lg sm:text-xl md:text-xl font-semibold mb-2">
            {listing.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <MapPin size={16} />
            <span>{listing.location}</span>
          </div>
        </div>

        {/* Number & Area */}
        {!hideFeatures && (
          <div className="flex justify-between items-center text-[#BFBFBF] text-base font-normal">
            <span>{listing.number}</span>
            <span className="flex items-center gap-2">
              <Ruler size={16} /> Area: {listing.area}
            </span>
          </div>
        )}

        {/* Type & Price */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3">
          <p className="bg-gradient bg-clip-text text-transparent text-lg sm:text-xl font-semibold mb-1">
            {listing.type}
          </p>

          {!hideFeatures && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-1 text-white font-bold">
              {showFullCard && showMessageButton && (
                <>
              {listing.price}
                <span className="text-xs text-gray-400">.{listing.priceUnit}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Message Button */}
        {showFullCard && showMessageButton && (
          <div>
            <Button className="bg-gradient w-full hover:bg-gradient/80 h-10 sm:h-10 md:h-[40px] px-6 sm:px-8 md:px-[43px] text-white text-sm flex items-center justify-center">
              <MessageCircle size={16} className="mr-2" />
              Message
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
