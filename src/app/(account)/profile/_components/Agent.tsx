// src/components/ConnectedAgents.tsx
import React from 'react';
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
import { Phone, Mail, Globe, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

// ──────────────────────────────────────────────────────────────
// Types
interface AgentDetails {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
  location: string;
  phone: string;
  bio: string;
  website?: string;
  agentApproved: boolean;
  isSubscription: boolean;
  activeInactiveSubcrib: 'active' | 'inactive';
}

interface ConnectedAgentEntry {
  _id: string;
  agentId: AgentDetails[];
  supplierId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    result: {
      _id: string;
      fullName: string;
      email: string;
      agentApproved: boolean;
      isSubscription: boolean;
      activeInactiveSubcrib: 'active' | 'inactive';
    };
    agent: ConnectedAgentEntry[];
  };
}

// ──────────────────────────────────────────────────────────────
// Main Component
export default function ConnectedAgents() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const fetchConnectedAgents = async (): Promise<AgentDetails[]> => {
    if (!token) throw new Error('No access token found');

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error('Session expired');
      throw new Error('Failed to load connected agents');
    }

    const json: ApiResponse = await res.json();
    return json.data.agent.flatMap((entry) => entry.agentId);
  };

  const {
    data: agents = [],
    isLoading,
    isError,
    error,
  } = useQuery<AgentDetails[], Error>({
    queryKey: ['connected-agents'],
    queryFn: fetchConnectedAgents,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="text-white space-y-6">
      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-gray-800">
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
      )}

      {/* Error State */}
      {isError && (
        <Card className="border-red-200 bg-red-800">
          <CardContent className="p-6 text-white">
            Error: {error?.message || 'Something went wrong'}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && agents.length === 0 && (
        <Card className="bg-gray-800">
          <CardContent className="p-12 text-center text-white">
            <p>No connected agents found</p>
          </CardContent>
        </Card>
      )}

      {/* Success */}
      {!isLoading && agents.length > 0 && (
        <>
          <h2 className="text-2xl font-bold">My Connected Agents ({agents.length})</h2>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {agents.map((agent) => (
              <Card
                key={agent._id}
                className="hover:shadow-lg transition-shadow duration-200 bg-gray-800"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={agent.profileImage} alt={agent.fullName} />
                        <AvatarFallback>{agent.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg text-white">{agent.fullName}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-white">
                          <MapPin className="h-3.5 w-3.5" />
                          {agent.location}
                        </div>
                      </div>
                    </div>

                    {agent.agentApproved ? (
                      <Badge className="bg-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Approved
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 text-white">
                  <p className="text-sm line-clamp-3">{agent.bio || 'No bio available'}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-white">
                      <Phone className="h-4 w-4" />
                      <span>{agent.phone}</span>
                    </div>

                    <div className="flex items-center gap-2 text-white">
                      <Mail className="h-4 w-4" />
                      <span>{agent.email}</span>
                    </div>

                    {agent.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a
                          href={agent.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:underline"
                        >
                          {new URL(agent.website).hostname}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
