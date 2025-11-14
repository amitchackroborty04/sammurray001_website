"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TenantsCard, { Listing } from "./Tenants_Card";

const Find_Teantspage: React.FC = () => {


  const listings: Listing[] = [
    {
      id: 1,
      image: "/assets/tents.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      name: "Wilamsions",
      description: "New commercial development in central Wellington",
      location: "Te Aro, Wellington",
      number: "+1 123 456 7890",
    },
      {
      id: 1,
      image: "/assets/tents.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      name: "Wilamsions",
      description: "New commercial development in central Wellington",
      location: "Te Aro, Wellington",
      number: "+1 123 456 7890",
    },
      {
      id: 1,
      image: "/assets/tents.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      name: "Wilamsions",
      description: "New commercial development in central Wellington",
      location: "Te Aro, Wellington",
      number: "+1 123 456 7890",
    },
      {
      id: 1,
      image: "/assets/tents.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      name: "Wilamsions",
      description: "New commercial development in central Wellington",
      location: "Te Aro, Wellington",
      number: "+1 123 456 7890",
    },
      {
      id: 1,
      image: "/assets/tents.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      name: "Wilamsions",
      description: "New commercial development in central Wellington",
      location: "Te Aro, Wellington",
      number: "+1 123 456 7890",
    },
      {
      id: 1,
      image: "/assets/tents.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      name: "Wilamsions",
      description: "New commercial development in central Wellington",
      location: "Te Aro, Wellington",
      number: "+1 123 456 7890",
    },
  ];

  return (
    <section className="container mx-auto py-10">
      {/* Heading */}
      <div>
        <h1 className="text-[32px] sm:text-[40px] font-bold text-white text-center">
          Find Tenants
        </h1>
        <p className="text-base font-normal text-[#BFBFBF] text-center">
          Find your Tenant with thousands of active seekers
        </p>
      </div>

      {/* Search Filters */}
      <div className="bg-white/10 p-5 rounded-[8px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-[40px] items-end">
        {/* Search Bar */}
        <div>
          <label className="text-base font-normal text-white mb-2 block">
            Search for properties
          </label>
          <Input
            type="text"
            placeholder="Search..."
            className="border border-[#BFBFBF] h-[49px] placeholder:text-[#BFBFBF] text-white"
          />
        </div>

        {/* Location Select */}
        <div>
          <label className="text-base font-normal text-white mb-2 block">
            Location
          </label>

          <Select onValueChange={(v) => console.log("Selected:", v)}>
            <SelectTrigger className="w-full h-[49px] border border-[#BFBFBF] rounded-[8px] text-white flex justify-between items-center">
              <SelectValue placeholder="Location" />
            </SelectTrigger>

            <SelectContent className="w-full bg-white text-black">
              <SelectGroup>
                <SelectLabel className="text-black">Select Location</SelectLabel>
                <SelectItem value="dhaka" className="text-black">
                  Dhaka
                </SelectItem>
                <SelectItem value="bannasree" className="text-black">
                  Bannasree
                </SelectItem>
                <SelectItem value="blueberry" className="text-black">
                  Blueberry
                </SelectItem>
                <SelectItem value="grapes" className="text-black">
                  Grapes
                </SelectItem>
                <SelectItem value="pineapple" className="text-black">
                  Pineapple
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Type Select */}
        <div>
          <label className="text-base font-normal text-white mb-2 block">
            Type
          </label>

          <Select onValueChange={(v) => console.log("Selected type:", v)}>
            <SelectTrigger className="w-full h-[49px] border border-[#BFBFBF] rounded-[8px] text-white flex justify-between items-center">
              <SelectValue placeholder="Type" />
            </SelectTrigger>

            <SelectContent className="w-full bg-white text-black">
              <SelectGroup>
                <SelectLabel className="text-black">Type</SelectLabel>
                <SelectItem value="commercial" className="text-black">
                  Commercial
                </SelectItem>
                <SelectItem value="residential" className="text-black">
                  Residential
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Size Input */}
        <div>
          <label className="text-base font-normal text-white mb-2 block">
            Size
          </label>
          <Input
            type="text"
            placeholder="Sqm"
            className="border border-[#BFBFBF] h-[49px] placeholder:text-[#BFBFBF] text-white"
          />
        </div>

        {/* Search Button */}
        <div>
          <Button className="w-full h-[49px] bg-gradient hover:bg-gradient/80 text-white text-base font-medium">
            Find Tenants
          </Button>
        </div>
      </div>

      {/* Grid of Listings */}
      <div className="mt-[56px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <TenantsCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Find_Teantspage;
