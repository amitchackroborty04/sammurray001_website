"use client"

import { 
  Heart, Menu, MessageCircleMore, CircleUserRound, LogIn, User, LogOut, 
  Home, Info, Search, Users, Map 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const pathname = usePathname()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const userRole = session?.user?.role as string | undefined
  const isSupplier = isAuthenticated && userRole === "SUPPLIER"

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about-us", icon: Info },
    { name: "Find Space", href: "/find-space", icon: Search },
    { name: "Find Tenants", href: "/find-tenants", icon: Users },
    { name: "Priceing", href: "/pricing", icon: Map },
  ]

  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem("wishlist")
    setWishlistCount(stored ? JSON.parse(stored).length : 0)
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("wishlist")
      setWishlistCount(stored ? JSON.parse(stored).length : 0)
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // Close sheet when route changes
  useEffect(() => {
    setSheetOpen(false)
  }, [pathname])

  return (
    <>
      <header className="sticky top-0 z-50  bg-[#070E28] border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center ">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/assets/logo.jpg" 
                alt="Logo" 
                width={100} 
                height={100} 
                className=" w-[100px] lg:w-[141px] h-[80px] lg:h-[70px]  object-cover"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map(item => {
                const isActive = pathname === item.href || (item.href.includes('#') && pathname === '/')
                return (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={`text-base font-medium transition ${isActive ? "text-gradient font-semibold" : "text-gray-300 hover:text-white"}`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                    <MessageCircleMore className="text-white w-7 h-7" />
                  </button>

                  <Link href="/wish-list" className="relative p-2 hover:bg-slate-800 rounded-lg transition">
                    <Heart className="text-white w-7 h-7" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-400 rounded-full text-xs text-black font-bold flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                        <CircleUserRound className="text-white w-7 h-7" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-[#0f1a38] border-slate-700 text-gray-300" align="end">
                      <DropdownMenuLabel>
                        <div className="flex flex-col">
                          <p className="font-medium text-white">{session?.user?.name || "User"}</p>
                          <p className="text-xs text-gray-400">{session?.user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center gap-3 cursor-pointer">
                          <User size={18} /> Account Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-3 text-red-400 cursor-pointer focus:bg-red-400"
                        onClick={() => setLogoutDialogOpen(true)}
                      >
                        <LogOut size={18} /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {isSupplier && (
                    <Link href="/add-listings-supplier">
                      <Button className="bg-gradient hover:bg-gradient/80 h-11 px-6 text-white font-medium">
                        Add Property
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <Button asChild className="bg-gradient hover:bg-gradient/80 h-11 px-6 text-white font-medium">
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn size={18}/> Login
                  </Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-slate-800">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>

              {/* Mobile Sheet Menu */}
              <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-[#0f1a38] border-slate-700 text-white">
                <SheetHeader>
                  <SheetTitle className="text-left text-xl text-white">
                    {isAuthenticated ? `Hi, ${session?.user?.name?.split(" ")[0] || "User"}` : "Menu"}
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-1">

                  {/* Navigation Links - Active: only text + icon color change, no bg */}
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || (item.href.includes('#') && pathname === '/')

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setSheetOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all text-base font-medium ${
                          isActive
                            ? "text-white font-semibold text-gradient"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <Icon size={22} className={isActive ? "text-cyan-400" : "text-gray-400"} />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}

                  <div className="my-6 border-t border-slate-700" />

                  {/* Authenticated User Actions */}
                  {isAuthenticated ? (
                    <>
                      <Link 
                        href="/wish-list" 
                        onClick={() => setSheetOpen(false)}
                        className="flex items-center gap-4 px-4 py-3.5 text-gray-300 hover:text-white transition text-base"
                      >
                        <Heart size={22} className="text-gray-400" />
                        <span>Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</span>
                      </Link>

                      <Link 
                        href="/profile" 
                        onClick={() => setSheetOpen(false)}
                        className="flex items-center gap-4 px-4 py-3.5 text-gray-300 hover:text-white transition text-base"
                      >
                        <User size={22} className="text-gray-400" />
                        <span>Account Profile</span>
                      </Link>

                      {isSupplier && (
                        <div className="px-4 mt-6">
                          <Link href="/add-listings-supplier" onClick={() => setSheetOpen(false)}>
                            <Button className="w-full bg-gradient hover:bg-gradient/80 h-12 font-medium">
                              Add Property
                            </Button>
                          </Link>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setLogoutDialogOpen(true)
                          setSheetOpen(false)
                        }}
                        className="flex items-center gap-4 px-4 py-3.5 mt-8 text-red-400 hover:text-red-500 transition text-base font-medium"
                      >
                        <LogOut size={22} />
                        <span>Logout </span>
                      </button>
                    </>
                  ) : (
                    <div className="px-4 mt-8">
                      <Link href="/login" onClick={() => setSheetOpen(false)}>
                        <Button className="w-full bg-gradient hover:bg-gradient/80 h-12 font-medium flex items-center gap-2">
                          <LogIn size={20} />
                          Login
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="bg-[#0f1a38] border border-slate-700 text-gray-200">
          <DialogHeader>
            <DialogTitle className="text-white">Are you sure you want to logout?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              className="border-slate-600 bg-transparent  text-gray-300 hover:text-gray hover:bg-transparent"
              onClick={() => setLogoutDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                signOut({ callbackUrl: '/' })
                setLogoutDialogOpen(false)
              }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}