"use client";

import React, { useState } from "react";
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
import ListingCard, { Listing } from "@/components/Reuseable_cards/PropertiesCard";

const Find_spacePage = () => {
    const [locationOpen, setLocationOpen] = useState(false);
    console.log(locationOpen)
    const listings: Listing[] = [
        {
            id: 1,
            image: "/assets/card1.png",
            type: "Commercial",
            badge: "Top pick",
            price: "$35,000,000",
            priceUnit: "USD",
            area: "4000 sqm",
            title: "Modern Office Space in CBD",
            description: "New commercial development in central Wellington",
            location: "Te Aro, Wellington",
        },
        {
            id: 2,
            image: "/assets/card1.png",
            type: "Commercial",
            badge: "Top pick",
            price: "$35,000,000",
            priceUnit: "USD",
            area: "4000 sqm",
            title: "Industrial Warehouse in CBD",
            description: "Large warehouse ideal for storage and logistics",
            location: "Te Aro, Wellington",
        },
        {
            id: 3,
            image: "/assets/card1.png",
            type: "Commercial",
            badge: "Top pick",
            price: "$35,000,000",
            priceUnit: "USD",
            area: "4000 sqm",
            title: "Fashion Retail Store",
            description: "Premium retail space for fashion brand",
            location: "Te Aro, Wellington",
        },
        {
            id: 4,
            image: "/assets/card1.png",
            type: "Commercial",
            badge: "Top pick",
            price: "$35,000,000",
            priceUnit: "USD",
            area: "4000 sqm",
            title: "Tall Office Building",
            description: "High-rise office building in the central business district",
            location: "Te Aro, Wellington",
        },
    ]

    return (
        <section className="container mx-auto py-10">
            {/* Heading */}
            <div>
                <h1 className="text-[32px] sm:text-[40px] font-bold text-white text-center">
                    Find Your Perfect Space
                </h1>
                <p className="text-base font-normal text-[#BFBFBF] text-center">
                    Browse available properties and post your requirements
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

                    <Select onOpenChange={(v) => setLocationOpen(v)}>
                        <SelectTrigger className="w-full h-[49px] border border-[#BFBFBF] rounded-[8px] text-white flex justify-between items-center">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>

                        <SelectContent className="w-full bg-white text-black">
                            <SelectGroup>
                                <SelectLabel className="text-black">
                                    Select Location
                                </SelectLabel>

                                <SelectItem value="apple" className="text-black">
                                    Dhaka
                                </SelectItem>
                                <SelectItem value="banana" className="text-black">
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
                <div>
                    <label className="text-base font-normal text-white mb-2 block">
                        Type
                    </label>

                    <Select onOpenChange={(v) => setLocationOpen(v)}>
                        <SelectTrigger className="w-full h-[49px] border border-[#BFBFBF] rounded-[8px] text-white flex justify-between items-center">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>

                        <SelectContent className="w-full bg-white text-black">
                            <SelectGroup>
                                <SelectLabel className="text-black">Type</SelectLabel>

                                <SelectItem value="apple" className="text-black">
                                    Dhaka
                                </SelectItem>
                                <SelectItem value="banana" className="text-black">
                                    Bannasree
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
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
                <div>
                    <Button className="w-full h-[49px] bg-gradient hover:bg-gradient/80 text-white text-base font-medium">
                        Search Properties
                    </Button>
                </div>
            </div>
            <div className="mt-[56px]">
                {/* Grid of Listing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Find_spacePage;
