import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Bell, Wallet } from 'lucide-react';

export function TopBar() {
  const { setCurrentScreen } = useApp();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#080911] border-b border-white/10 text-white">
      <div className="flex items-center gap-2">
        <Star className="text-pink-500" />
        <span className="text-xl font-bold">
          LiveStar
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setCurrentScreen('inbox')}>
          <Bell />
        </button>

        <button onClick={() => setCurrentScreen('wallet')}>
          <Wallet />
        </button>
      </div>
    </header>
  );
}
