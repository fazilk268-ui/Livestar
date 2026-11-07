import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, MessageCircle, Search } from 'lucide-react';

export function InboxScreen() {
  const { setCurrentScreen } = useApp();

  return (
    <div className="min-h-screen bg-[#080911] text-white p-5">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setCurrentScreen('home')}>
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Inbox</h1>
      </div>

      <div className="flex items-center gap-2 bg-[#171827] rounded-xl p-3 mb-6">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search messages..."
          className="bg-transparent outline-none flex-1 text-white"
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-24 text-gray-400">
        <MessageCircle size={55} className="text-pink-500 mb-4" />
        <h2 className="text-white font-semibold">No messages yet</h2>
        <p className="text-sm mt-2">Your conversations will appear here.</p>
      </div>
    </div>
  );
}
