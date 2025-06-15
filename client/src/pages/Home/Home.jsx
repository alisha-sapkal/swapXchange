import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col md:flex-row items-center justify-center gap-12">
      {/* Left side - Problem with P2P */}
      <div className="flex-1 max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">The Problem with P2P</h2>
        <p className="text-gray-300 mb-6">
          P2P transactions are risky. You send money first, the other party disappears. You ship an item, and payment never arrives. Scams are everywhere.
        </p>
        <Card className="bg-gray-800 p-4">
          <CardContent className="flex justify-center">
            <img
              src="/assets/hand_card.png" // replace with correct path if needed
              alt="P2P Risk Illustration"
              className="w-40 md:w-60"
            />
          </CardContent>
        </Card>
      </div>

      {/* Right side - SecureSwap Solution */}
      <div className="flex-1 max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
          The SecureSwap Solution
        </h2>
        <p className="text-gray-300 mb-6">
          SecureSwap holds the payment in escrow until both parties fulfill their promises. No fraud. No disputes. Just safe transactions.
        </p>
        <Card className="bg-gray-800 p-4">
          <CardContent className="flex justify-center gap-4">
            <img
              src="/assets/server1.png" // replace with correct path if needed
              alt="Server 1"
              className="w-12 md:w-20"
            />
            <img
              src="/assets/escrow.png" // replace with correct path if needed
              alt="Escrow"
              className="w-20 md:w-28"
            />
            <img
              src="/assets/server2.png" // replace with correct path if needed
              alt="Server 2"
              className="w-12 md:w-20"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
