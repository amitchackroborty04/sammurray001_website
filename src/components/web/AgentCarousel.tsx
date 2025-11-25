'use client'

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Agent {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
  location: string;
  phone: string;
  bio: string;
  verified: boolean;
  agencyLogo?: string;
  website?: string;
  agentApproved: boolean;
}

const fetchAgents = async (): Promise<Agent[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/all-user?role=AGENT`);
  if (!res.ok) throw new Error("Failed to fetch agents");
  const data = await res.json();
  return data.data;
};

export default function AgentCarousel() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const role=session?.user?.role
 
 

  const { data: agents = [], isLoading, error } = useQuery<Agent[]>({
    queryKey: ["agents"],
    queryFn: fetchAgents,
    staleTime: 5 * 60 * 1000,
  });

  const hireMutation = useMutation({
    mutationFn: async (agentId: string) => {
      if (!token) throw new Error("User not authenticated");

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hire-agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ agentId: [agentId] }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to hire agent" }));
        throw new Error(errorData.message || "Failed to hire agent");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Agent hired successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to hire agent");
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-96 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !agents.length) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No agents found or failed to load.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-white mb-10">Meet Our Top Agents</h1>

      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {agents.map((agent) => (
            <CarouselItem key={agent._id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow bg-white/10">
                <CardHeader className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/10">
                    <AvatarImage src={agent.profileImage} alt={agent.fullName} />
                    <AvatarFallback>{agent.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl text-white">{agent.fullName}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    {agent.agentApproved && (
                      <Badge className="!bg-gradient border-none h-[30px] text-white" variant="outline">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-[#BFBFBF] mt-2">{agent.location}</p>
                </CardHeader>

                <CardContent className="flex-1 text-center">
                  <p className="text-sm text-[#BFBFBF] line-clamp-3">
                    {agent.bio || "Professional real estate agent."}
                  </p>
                  {agent.website && (
                    <a
                      href={agent.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#BFBFBF] hover:underline mt-2 block"
                    >
                      {new URL(agent.website).hostname}
                    </a>
                  )}
                </CardContent>

                <CardFooter className="flex justify-center pb-6">
                    {role =="SUPPLIER" && (

                  <Button
                    size="lg"
                    className="w-full max-w-xs bg-gradient"
                    onClick={() => hireMutation.mutate(agent._id)}
                
                  >
                    {hireMutation.isPending ? "Hiring..." : "Hire Me"}
                  </Button>
                    )}
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
