import React from 'react';
import { User, X, Video, MessageCircle, UserPlus } from 'lucide-react';

interface UserProfileModalProps {
  name?: string;
  username?: string;
  onClose?: () => void;
  onFollow?: () => void;
  onMessage?: () => void;
  onVideoCall?: () => void;
}

export function UserProfileModal({
  name = 'LiveStar User',
  username = '@user',
  onClose,
  onFollow,
  onMessage,
  onVideoCall,
}: UserProfileModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-5">
      <div className="w-full max-w-sm bg-[#171827] rounded-3xl p-6 text-white">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-pink-600/20 flex items-center justify-center">
            <User size={48} className="text-pink-500" />
          </div>

          <h2 className="text-2xl font-bold mt-4">{name}</h2>
          <p className="text-gray-400">{username}</p>
        </div>

        <div className="flex justify-around my-7 text-center">
          <div>
            <p className="font-bold text-xl">0</p>
            <p className="text-gray-400 text-sm">Followers</p>
          </div>
          <div>
            <p className="font-bold text-xl">0</p>
            <p className="text-gray-400 text-sm">Following</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onFollow}
            className="w-full bg-pink-600 rounded-xl p-3 font-bold"
          >
            <UserPlus size={18} className="inline mr-2" />
            Follow
          </button>

          <button
            onClick={onMessage}
            className="w-full bg-[#080911] rounded-xl p-3"
          >
            <MessageCircle size={18} className="inline mr-2" />
            Message
          </button>

          <button
            onClick={onVideoCall}
            className="w-full bg-[#080911] rounded-xl p-3"
          >
            <Video size={18} className="inline mr-2" />
            Video Call
          </button>
        </div>
      </div>
    </div>
  );
}
