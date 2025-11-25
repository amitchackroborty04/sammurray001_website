"use client";

import React, { useState, useEffect, ReactNode, Suspense } from "react";
import { User, Lock, History, Heart, LogOut } from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import ProfilePage from "./ProfilePage";
import ChangePassword from "./ChangePassword";
import ConnectedSuppliers from "./Supplir";
import ConnectedAgents from "./Agent";
import WishListPage from "./WishlistPage";

/* ---------------- Tabs Components ---------------- */
interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}

interface TabsChildProps {
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <div className="flex gap-8 w-full">{children}</div>;
};

interface TabsListProps extends TabsChildProps {
  children: ReactNode;
}

export const TabsList: React.FC<TabsListProps> = ({
  children,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex flex-col space-y-1 w-80">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { activeTab, setActiveTab })
          : child
      )}
    </div>
  );
};

interface TabsTriggerProps extends TabsChildProps {
  value: string;
  children: ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  activeTab,
  setActiveTab,
  icon: Icon,
}) => {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab?.(value)}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
        isActive ? "text-white" : "text-slate-400 hover:text-white"
      }`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-medium">{children}</span>
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: ReactNode;
  activeTab?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  activeTab,
}) => {
  if (activeTab !== value) return null;
  return <div className="flex-1">{children}</div>;
};

/* ---------------- Profile Layout ---------------- */
const ProfileLayout: React.FC = () => {
  const { data: session, status } = useSession();
  const Role=session?.user?.role;
  const [activeTab, setActiveTab] = useState("personal-info");

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-slate-400">Home • My Profile</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80">
            <div className="rounded-2xl p-6 backdrop-blur-sm border border-slate-700">
              {/* Profile Image */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <Image
                    width={300}
                    height={400}
                    src="/assets/sum-user.png"
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-700"
                  />
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full border-4 border-slate-800"></div>
                </div>

                <h2 className="text-2xl font-bold mb-1">
                  {session?.user?.name ?? "User"}
                </h2>
                <p className="text-slate-400 text-sm">{session?.user?.email ?? ""}</p>
              </div>

              {/* Navigation Tabs */}
              <TabsList activeTab={activeTab} setActiveTab={setActiveTab}>
                <TabsTrigger value="personal-info" icon={User}>
                  Personal Information
                </TabsTrigger>

                <TabsTrigger value="change-password" icon={Lock}>
                  Change Password
                </TabsTrigger>
                {Role==="TENANT" && (
                  
                <TabsTrigger value="booking-history" icon={History}>
                  Booking History
                </TabsTrigger>

                
                )}
                {Role==="TENANT" && (

                <TabsTrigger value="watchlists" icon={Heart}>
                  Watchlists
                </TabsTrigger>
                )}
                {Role==="AGENT" && (

                <TabsTrigger value="my-supplier" icon={User}>
                  My Supplier
                </TabsTrigger>
                )}
                  {Role==="SUPPLIER" && (
                    
                <TabsTrigger value="my-agent" icon={User}>
                  My Agent
                </TabsTrigger>
                  )}
              </TabsList>

              {/* Logout */}
              <button
                onClick={() => signOut()}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 transition-colors mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log out</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <TabsContent value="personal-info" activeTab={activeTab}>
              <ProfilePage />
            </TabsContent>

            <TabsContent value="change-password" activeTab={activeTab}>
              <ChangePassword />
            </TabsContent>

            <TabsContent value="booking-history" activeTab={activeTab}>
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                <h2 className="text-2xl font-bold mb-4">Booking History</h2>
                <p>Your booking history will appear here.</p>
              </div>
            </TabsContent>

            <TabsContent value="watchlists" activeTab={activeTab}>
              <Suspense fallback={<p className="text-slate-400">Loading wishlist...</p>}>
                <WishListPage />
              </Suspense>
            </TabsContent>

            <TabsContent value="my-supplier" activeTab={activeTab}>
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                <ConnectedSuppliers />
              </div>
            </TabsContent>

            <TabsContent value="my-agent" activeTab={activeTab}>
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                <ConnectedAgents />
              </div>
            </TabsContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
