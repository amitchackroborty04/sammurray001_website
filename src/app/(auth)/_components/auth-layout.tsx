import Image from "next/image"
import type React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
  imageSrc?: string
  title?: string
  imagePosition?: "left" | "right"
}

export default function AuthLayout({
  children,


  imagePosition = "right",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 items-center ${
            imagePosition === "left" ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* 🖼️ Image Section (Left) */}
          {imagePosition === "left" && (
            <div className="relative hidden lg:block w-full h-screen order-first lg:order-1">
              <Image
                src= "/assets/authenticationbg.png"
                alt="Auth background"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* 🧾 Form Section */}
          <div
            className={`flex items-center justify-center w-full h-screen  z-10 ${
              imagePosition === "left" ? "lg:order-2" : ""
            }`}
          >
            <div className="w-full max-w-md p-6 rounded-lg">
           
              {children}
            </div>
          </div>

          {/* 🖼️ Image Section (Right) */}
          {imagePosition === "right" && (
            <div className="relative hidden lg:block w-full h-screen">
              <Image
                src="/assets/authenticationbg.png"
                alt="Auth background"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
