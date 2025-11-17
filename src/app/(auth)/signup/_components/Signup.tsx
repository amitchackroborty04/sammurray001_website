"use client";

import * as React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import SignupSalesForm from "./SupplierRegister";
import TenantRegister from "./TenantRegister";


export default function Signup() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block w-1/2 h-screen relative">
        <Image
          src="/assets/sammu-auth-image.png"
          alt="Professional woman working on laptop"
          fill
          className="object-cover"
          quality={100}
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex-1 items-center justify-center">
        <Card className="mt-10">
          <CardContent className="space-y-2">
            <Tabs defaultValue="business" className="lg:w-[60%] w-[90%] mx-auto">
              <div className="mb-6">
                <TabsList className="grid w-full grid-cols-2 bg-[#FFFFFF33] p-1 rounded-full">
                  <TabsTrigger
                    value="business"
                    className="rounded-full data-[state=active]:bg-[#229F99] data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    Tenant
                  </TabsTrigger>
                  <TabsTrigger
                    value="sales"
                    className="rounded-full data-[state=active]:bg-[#229F99] data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    Supplier
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="business" className="mt-0">
                <TenantRegister />
              </TabsContent>

              <TabsContent value="sales" className="mt-0">
                <SignupSalesForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
