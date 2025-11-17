import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    profileImage: string;
    verified: boolean;
    isSubscription?: boolean;
    subscriptionExpiry?: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      profileImage: string;
      verified: boolean;
      isSubscription?: boolean;
      subscriptionExpiry?: string;
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    profileImage: string;
    verified: boolean;
    isSubscription?: boolean;
    subscriptionExpiry?: string;
    accessToken: string;
    refreshToken: string;
  }
}
