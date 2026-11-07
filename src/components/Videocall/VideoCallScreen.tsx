import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Video, Mic, PhoneOff } from 'lucide-react';

export function VideoCallScreen() {
  const { setCurrentScreen } = useApp();

  return (
    <div className="min-h-screen bg-[#080911] text-white p-4 flex flex-col">
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentScreen('home')}>
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Video Call</h1>
        <span className="text-pink-400">LiveStar</span>
      </div>

      <div className="flex-1 my-6 rounded-2xl bg-[#171827] flex flex-col items-center justify-center">
        <Video size={60} className="text-pink-500 mb-3" />
        <h2 className="font-semibold">Video Calling</h2>
        <p className="text-gray-400 text-sm mt-2">
          Waiting for connection...
        </p>
      </div>

      <div className="flex justify-center gap-6 pb-6">
        <button className="rounded-full bg-gray-700 p-4">
          <Mic />
        </button>
        <button
          onClick={() => setCurrentScreen('home')}
          className="rounded-full bg-red-600 p-4"
        >
          <PhoneOff />
        </button>
      </div>
    </div>
  );
}
