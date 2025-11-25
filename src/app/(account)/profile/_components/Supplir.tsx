// components/ConnectedSuppliers.tsx
"use client";

import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';
import { useSession } from 'next-auth/react';

// Types
interface SupplierDetails {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
  agencyName: string;
  location: string;
  phone: string;
  bio: string;
  verified: boolean;
  isSubscription: boolean;
  agentApproved: boolean;
  subscriptionExpiry: string | null;
  activeInactiveSubcrib: 'active' | 'inactive';
}

interface SupplierConnection {
  _id: string;
  supplierId: SupplierDetails;
}

interface ApiResponse {
  data: {
    supplier: SupplierConnection[];
  };
}

// Fetch function
const fetchConnectedSuppliers = async (token: string): Promise<SupplierConnection[]> => {
  if (!token) throw new Error('No authentication token found. Please log in.');

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized - Please log in again');
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }

  const json: ApiResponse = await response.json();
  return json.data.supplier;
};

export default function ConnectedSuppliers() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const {
    data: suppliers = [],
    isLoading,
    isError,
    error,
  } = useQuery<SupplierConnection[], Error>({
    queryKey: ['connected-suppliers'],
    queryFn: () => fetchConnectedSuppliers(token || ''),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // Loading
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-slate-800">
            <CardContent className="p-6 flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <Card className="border-red-200 bg-red-800">
        <CardContent className="p-6 text-white">
          {error?.message || 'Failed to load suppliers'}
        </CardContent>
      </Card>
    );
  }

  // Empty
  if (suppliers.length === 0) {
    return (
      <Card className="bg-slate-800">
        <CardContent className="p-10 text-center text-white">
          <Building2 className="mx-auto h-12 w-12 mb-3 text-white/50" />
          <p>No connected suppliers yet.</p>
        </CardContent>
      </Card>
    );
  }

  // Success
  return (
    <div className="space-y-6 text-white">
      <h2 className="text-2xl font-bold">
        My Connected Suppliers ({suppliers.length})
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {suppliers.map(({ _id, supplierId: s }) => (
          <Card key={_id} className="hover:shadow-lg transition-shadow bg-slate-800">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={s.profileImage} alt={s.fullName} />
                    <AvatarFallback>{s.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-white">{s.fullName}</CardTitle>
                    <p className="text-sm text-white/70">{s.agencyName}</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-white">
              <p className="text-sm line-clamp-2">{s.bio || 'No bio available'}</p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="w-4 h-4" />
                  {s.location}
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${s.phone}`} className="hover:underline">
                    {s.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${s.email}`} className="hover:underline text-white/70">
                    {s.email}
                  </a>
                </div>
                {s.subscriptionExpiry && (
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Calendar className="w-4 h-4" />
                    Expires: {new Date(s.subscriptionExpiry).toLocaleDateString()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
