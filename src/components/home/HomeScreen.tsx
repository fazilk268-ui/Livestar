import React from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, Video, User, Wallet } from 'lucide-react';

export function HomeScreen() {
  const { setCurrentScreen } = useApp();

  return (
    <div className="min-h-screen bg-[#080911] text-white p-5">
      <h1 className="text-3xl font-bold text-pink-500">LiveStar ⭐</h1>
      <p className="text-gray-400 mt-2">Welcome to LiveStar</p>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <button onClick={() => setCurrentScreen('go_live')}
          className="bg-pink-600 rounded-2xl p-6">
          <Radio />
          <p className="mt-3 font-bold">Go Live</p>
        </button>

        <button onClick={() => setCurrentScreen('video_call')}
          className="bg-purple-600 rounded-2xl p-6">
          <Video />
          <p className="mt-3 font-bold">Video Call</p>
        </button>

        <button onClick={() => setCurrentScreen('profile')}
          className="bg-indigo-600 rounded-2xl p-6">
          <User />
          <p className="mt-3 font-bold">My Profile</p>
        </button>

        <button onClick={() => setCurrentScreen('wallet')}
          className="bg-emerald-600 rounded-2xl p-6">
          <Wallet />
          <p className="mt-3 font-bold">My Wallet</p>
        </button>
      </div>
    </div>
  );
}
