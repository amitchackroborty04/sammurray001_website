'use client';

import { useApp } from '@/lib/AppContext';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { useSession } from 'next-auth/react';

// Types
interface Subscription {
  _id: string;
  name: string;
  discription: string;
  amount: number;
  type: 'monthly' | 'yearly';
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Subscription[];
}

interface PaymentResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    url: string;
    sessionId: string;
  };
}

// Fetch subscriptions
const fetchSubscriptions = async (): Promise<Subscription[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subscription`);
  if (!res.ok) throw new Error('Failed to fetch subscriptions');
  const json: ApiResponse = await res.json();
  return json.data;
};

export default function PricingPage() {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const { user } = useApp();

  // MUST CALL ALL HOOKS FIRST — NO CONDITIONAL RETURN ABOVE THIS LINE
  const initiatePayment = async (subscriptionId: string): Promise<PaymentResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subscription/pay-subscription/${subscriptionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Payment failed' }));
      throw new Error(error.message || 'Failed to initiate payment');
    }

    return res.json();
  };

  const { data: plans, isLoading, error } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: fetchSubscriptions,
  });

  const paymentMutation = useMutation({
    mutationFn: initiatePayment,
    onSuccess: (data) => {
      window.location.href = data.data.url;
    },
    onError: (error: any) => {
      alert(error.message || 'Payment failed. Please try again.');
    },
  });

  // NOW SAFE TO RETURN CONDITIONALLY
  if (user?.activeInactiveSubcrib === "inactive") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Subcribtion is inactive Now</h2>
          <p className="text-gray-300 text-xl">When  activate  subcribtion you can buy any plan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-300">Unlock premium features with simple pricing</p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => <PricingSkeleton key={i} />)
          ) : error ? (
            <div className="col-span-full text-center py-20 text-red-400 text-xl">
              Failed to load plans. Please try again.
            </div>
          ) : plans && plans.length > 0 ? (
            plans.map((plan) => (
              <PricingCard
                key={plan._id}
                plan={plan}
                onGetStarted={(id) => paymentMutation.mutate(id)}
                isLoading={paymentMutation.isPending && paymentMutation.variables === plan._id}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400 text-xl">
              No plans available right now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Pricing Card Component
function PricingCard({
  plan,
  onGetStarted,
  isLoading,
}: {
  plan: Subscription;
  onGetStarted: (id: string) => void;
  isLoading: boolean;
}) {
  return (
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-gray-300 mb-8 min-h-[3rem]">{plan.discription}</p>

        <div className="mb-8">
          <span className="text-5xl font-bold">${plan.amount}</span>
          <span className="text-gray-400 text-lg"> /{plan.type}</span>
        </div>

        <ul className="space-y-4 mb-10 text-left">
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>All premium features</span>
          </li>
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>Priority support</span>
          </li>
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>Unlimited requests</span>
          </li>
        </ul>

        <button
          onClick={() => onGetStarted(plan._id)}
          disabled={isLoading}
          className={`w-full font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 
            ${isLoading 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-gradient hover:bg-gradient/80'
            } text-white`}
        >
          {isLoading ? 'Processing...' : 'Get Started'}
        </button>
      </div>
    </div>
  );
}

// Skeleton Component
function PricingSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 animate-pulse">
      <div className="h-8 bg-white/20 rounded-full w-32 mx-auto mb-6"></div>
      <div className="text-center">
        <div className="h-8 bg-white/30 rounded w-48 mx-auto mb-3"></div>
        <div className="h-16 bg-white/20 rounded mx-auto mb-8"></div>
        <div className="h-16 bg-white/40 rounded w-36 mx-auto mb-8"></div>
        <div className="space-y-4 mb-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-white/30 rounded-full"></div>
              <div className="h-5 bg-white/20 rounded w-full"></div>
            </div>
          ))}
        </div>
        <div className="h-14 bg-white/30 rounded-xl"></div>
      </div>
    </div>
  );
}
