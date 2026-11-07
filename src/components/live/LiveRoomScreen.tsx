import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Users, Mic, Video } from 'lucide-react';

export function LiveRoomScreen() {
  const { setCurrentScreen } = useApp();

  return (
    <div className="min-h-screen bg-[#080911] text-white p-4">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setCurrentScreen('home')}>
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Live Room</h1>
        <div className="flex items-center gap-1 text-pink-400">
          <Users size={18} />
          <span>0</span>
        </div>
      </div>

      <div className="h-[65vh] rounded-2xl bg-[#171827] flex flex-col items-center justify-center">
        <Video size={55} className="text-pink-500 mb-3" />
        <h2 className="text-lg font-semibold">Welcome to LiveStar</h2>
        <p className="text-gray-400 text-sm mt-2">
          Live streaming room
        </p>
      </div>

      <button
        onClick={() => setCurrentScreen('go_live')}
        className="w-full mt-5 rounded-xl bg-pink-600 py-4 font-bold"
      >
        <Mic size={18} className="inline mr-2" />
        Start Live
      </button>
    </div>
  );
}
