"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserData = {
  activeInactiveSubcrib: string;
  isSubscription: boolean;
};

type AppContextType = {
  user: UserData | null;
  loading: boolean;
  refetchUser: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const ContexProvider = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserProfile = async (token: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data?.success && data?.data) {
        setUser({
          activeInactiveSubcrib: data.data.activeInactiveSubcrib,
          isSubscription: data.data.isSubscription,
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // useEffect will watch for session availability
  useEffect(() => {
    if (status === "authenticated" && session?.user?.accessToken) {
      fetchUserProfile(session.user.accessToken);
    } else if (status === "unauthenticated") {
      setUser(null);
      setLoading(false);
    }
  }, [status, session]);

  return (
    <AppContext.Provider value={{ user, loading, refetchUser: () => fetchUserProfile(session?.user?.accessToken || "") }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
