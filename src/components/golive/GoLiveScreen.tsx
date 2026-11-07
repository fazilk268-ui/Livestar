import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Video, Radio } from 'lucide-react';

export function GoLiveScreen() {
  const { setCurrentScreen } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Entertainment');

  const startLive = () => {
    if (!title.trim()) {
      alert('Please enter a live title');
      return;
    }

    setCurrentScreen('live_room');
  };

  return (
    <div className="min-h-screen bg-[#080911] text-white p-5">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setCurrentScreen('home')}>
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Go Live</h1>
      </div>

      <div className="bg-[#171827] rounded-2xl p-6">
        <div className="flex flex-col items-center py-8">
          <div className="w-24 h-24 rounded-full bg-pink-600/20 flex items-center justify-center">
            <Video size={48} className="text-pink-500" />
          </div>
          <h2 className="text-xl font-bold mt-4">Start Your Live</h2>
          <p className="text-gray-400 text-sm mt-2">
            Share your moments with everyone
          </p>
        </div>

        <label className="block text-sm mb-2">Live Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter live title"
          className="w-full bg-[#080911] rounded-xl p-4 outline-none mb-5"
        />

        <label className="block text-sm mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-[#080911] rounded-xl p-4 outline-none mb-6"
        >
          <option>Entertainment</option>
          <option>Music</option>
          <option>Gaming</option>
          <option>Chat</option>
        </select>

        <button
          onClick={startLive}
          className="w-full bg-pink-600 rounded-xl py-4 font-bold"
        >
          <Radio size={20} className="inline mr-2" />
          Start Live Now
        </button>
      </div>
    </div>
  );
}
