import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Wallet, Plus, Gift, History } from 'lucide-react';

export function WalletScreen() {
  const { setCurrentScreen } = useApp();

  return (
    <div className="min-h-screen bg-[#080911] text-white p-5">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setCurrentScreen('home')}>
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold">My Wallet</h1>
      </div>

      <div className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Wallet />
          <span>Available Balance</span>
        </div>
        <h2 className="text-4xl font-bold mt-4">₹0.00</h2>
        <p className="text-sm text-white/70 mt-2">LiveStar Coins</p>
      </div>

      <button className="w-full bg-pink-600 rounded-xl p-4 mt-6 font-bold">
        <Plus size={20} className="inline mr-2" />
        Add Coins
      </button>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3 bg-[#171827] p-4 rounded-xl">
          <Gift className="text-pink-400" />
          <span>Send Gifts</span>
        </div>

        <div className="flex items-center gap-3 bg-[#171827] p-4 rounded-xl">
          <History className="text-pink-400" />
          <span>Transaction History</span>
        </div>
      </div>
    </div>
  );
}.            
