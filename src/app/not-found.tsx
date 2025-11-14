"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import "./globals.css"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#070E28] text-center px-4">
      <div className="max-w-md">
        <h1 className="text-8xl font-extrabold text-white drop-shadow-lg">404</h1>
        <p className="mt-4 text-gray-200 text-lg">
          Oops! The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <Button
          asChild
          className="mt-8 text-white bg-gradient  hover:bg-gray-100 font-semibold rounded-xl px-6 h-[48px] shadow-md transition-all duration-200"
        >
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
