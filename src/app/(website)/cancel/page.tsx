'use client';

import { XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PaymentFailed() {
  return (
    <div className="py-7 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">

        {/* Big Failed Icon */}
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-red-500/20 rounded-full ring-8 ring-red-500/10 animate-pulse">
            <XCircle className="w-20 h-20 text-red-400" />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
          Payment Failed
        </h1>

        <p className="text-2xl text-gray-200 mb-4">
          Oops! Something went wrong with your payment.
        </p>

        <p className="text-xl text-gray-300 mb-12 max-w-lg mx-auto">
          Don’t worry — no money was charged. You can try again anytime.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
         

          <Link
            href="/"
            className="inline-flex items-center h-[48px] px-5 gap-2 text-white/80 bg-gradient hover:text-white font-medium text-lg underline-offset-4  rounded-[8px] transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

      
      </div>
    </div>
  );
}