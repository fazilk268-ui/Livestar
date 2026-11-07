import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, User, Settings, Wallet, LogOut } from 'lucide-react';

export function ProfileScreen() {
  const { setCurrentScreen, setIsAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-[#080911] text-white p-5">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setCurrentScreen('home')}>
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold">My Profile</h1>
      </div>

      <div className="flex flex-col items-center py-6">
        <div className="w-24 h-24 rounded-full bg-pink-600 flex items-center justify-center">
          <User size={48} />
        </div>
        <h2 className="text-xl font-bold mt-4">LiveStar User</h2>
        <p className="text-gray-400 text-sm">Welcome to LiveStar</p>
      </div>

      <div className="space-y-3 mt-6">
        <button
          onClick={() => setCurrentScreen('wallet')}
          className="w-full flex items-center gap-3 bg-[#171827] p-4 rounded-xl"
        >
          <Wallet className="text-pink-400" />
          My Wallet
        </button>

        <button className="w-full flex items-center gap-3 bg-[#171827] p-4 rounded-xl">
          <Settings className="text-pink-400" />
          Settings
        </button>

        <button
          onClick={() => {
            setIsAuthenticated(false);
            setCurrentScreen('auth');
          }}
          className="w-full flex items-center gap-3 bg-[#171827] p-4 rounded-xl text-red-400"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
}
