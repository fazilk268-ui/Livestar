import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Radio, MessageCircle, User } from 'lucide-react';

export function BottomNav() {
  const { currentScreen, setCurrentScreen } = useApp();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'live_room', label: 'Live', icon: Radio },
    { id: 'inbox', label: 'Inbox', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-[#080911] border-t border-white/10 py-3 text-white">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = currentScreen === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setCurrentScreen(tab.id)}
            className={`flex flex-col items-center gap-1 ${
              active ? 'text-pink-500' : 'text-gray-400'
            }`}
          >
            <Icon size={22} />
            <span className="text-xs">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
