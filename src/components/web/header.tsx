"use client"

import { Heart, Menu, X, MessageCircleMore, CircleUserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Header() {
  const pathname = usePathname()
  const [sheetOpen, setSheetOpen] = useState(false) // <-- control sheet open

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Find Space", href: "/find-space" },
    { name: "Find Tenants", href: "/find-tenants" },
    { name: "Map", href: "/#map" },
  ]

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-[#070E28] border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/assets/logo.jpg"
                alt="Logo"
                width={141}
                height={40}
                className="w-[141px] h-[40px] object-cover"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base transition ${isActive ? "text-gradient font-semibold" : "text-gray-300 hover:text-white"}`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Icons + Button */}
          <div className="hidden lg:flex items-center gap-0">
            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
              <MessageCircleMore className="text-white !w-7 !h-7" />
            </button>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition relative">
              <Heart className="text-white !w-7 !h-7" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
              <CircleUserRound className="text-white !w-7 !h-7" />
            </button>

            <Button className="bg-gradient hover:bg-gradient/80 h-[41px] px-6 text-white">
              Add property
            </Button>
          </div>

          {/* Mobile + Tablet Sheet */}
          <div className="flex md:flex lg:hidden items-center">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button className="p-2">
                  <Menu size={20} className="text-gray-400" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-64 bg-[#070E28] text-gray-300">
                <SheetHeader className="flex justify-between items-center ">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetTrigger asChild>
                  
                  </SheetTrigger>
                </SheetHeader>

                {/* Mobile / Tablet Icons */}
                <div className="flex flex-col gap-3 mt-4">
                  <button className="p-2 hover:bg-slate-800 rounded-lg transition flex items-center gap-2 text-white" onClick={() => setSheetOpen(false)}>
                    <MessageCircleMore size={20} /> Message
                  </button>
                  <button className="p-2 hover:bg-slate-800 rounded-lg transition flex items-center gap-2 text-white relative" onClick={() => setSheetOpen(false)}>
                    <Heart size={20} /> Favorites
                    <span className="absolute top-1 right-3 w-2 h-2 bg-cyan-400 rounded-full"></span>
                  </button>
                  <button className="p-2 hover:bg-slate-800 rounded-lg transition flex items-center gap-2 text-white" onClick={() => setSheetOpen(false)}>
                    <CircleUserRound size={20} /> Profile
                  </button>
                </div>

                {/* Mobile / Tablet Nav Links */}
                <nav className="flex flex-col mt-4 gap-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setSheetOpen(false)} // <-- auto close on click
                        className={`text-sm py-2 px-2 transition ${isActive ? "text-gradient font-semibold" : "hover:text-white text-gray-300"}`}
                      >
                        {item.name}
                      </Link>
                    )
                  })}

                  {/* Add Property Button */}
                  <Button className="w-full bg-gradient hover:bg-gradient/80 h-[41px] px-6 text-white mt-4" onClick={() => setSheetOpen(false)}>
                    Add property
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  )
}
