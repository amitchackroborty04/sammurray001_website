"use client"

import { Heart, User, Home as HomeIcon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Find Space", href: "/find-space" },
    { name: "Find Tenants", href: "/find-tenants" },
    { name: "Map", href: "/#map" },
  ]

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-[#070E28] border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base transition ${
                    isActive ? "text-gradient font-semibold" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Icons + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-3">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <HomeIcon size={20} className="text-gray-400" />
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition relative">
                <Heart size={20} className="text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <User size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Desktop Add Property Button */}
            <Button className="hidden md:inline-block bg-gradient hover:bg-gradient/80 h-[41px] px-6 text-white">
              Add property
            </Button>

            {/* Mobile Menu Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden p-2">
                  <Menu size={20} className="text-gray-400" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-[#070E28] text-gray-300">
                <SheetHeader className="flex justify-between items-center border-b border-slate-800">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetTrigger asChild>
                    <button className="p-2">
                      <X size={20} />
                    </button>
                  </SheetTrigger>
                </SheetHeader>

                <nav className="flex flex-col mt-4 gap-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`text-sm py-2 px-2 transition ${
                          isActive ? "text-gradient font-semibold" : "hover:text-white text-gray-300"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )
                  })}

                  <Button className="w-full bg-gradient hover:bg-gradient/80 h-[41px] px-6 text-white mt-4">
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
