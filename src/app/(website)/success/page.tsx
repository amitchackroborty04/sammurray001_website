'use client';

import { CheckCircle} from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccess() {
  return (
    <div className=" flex items-center py-14 justify-center px-6">
      <div className="max-w-2xl w-full text-center ">

        {/* Big Success Icon */}
        <div className="mb-10 animate-bounce ">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-green-500/20 rounded-full ring-8 ring-green-500/10">
            <CheckCircle className="w-20 h-20 text-green-400" />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
          Payment Successful!
        </h1>

     

        <p className="text-xl text-gray-300 mb-8">
          Your account is now upgraded. Enjoy unlimited access!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
         

          <Link
            href="/"
            className="text-white/80 bg-gradient py-[10px] px-10 !roudned-[8px] hover:text-white font-medium text-lg underline-offset-4 hover:underline transition"
          >
            Back to Home
          </Link>
        </div>

      
      </div>
    </div>
  );
}