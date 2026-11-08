import React from 'react';
import { Phone, PhoneOff, User } from 'lucide-react';

interface IncomingCallModalProps {
  callerName?: string;
  onAccept?: () => void;
  onReject?: () => void;
}

export function IncomingCallModal({
  callerName = 'Unknown User',
  onAccept,
  onReject,
}: IncomingCallModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-5">
      <div className="w-full max-w-sm bg-[#171827] rounded-3xl p-7 text-white text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-pink-600/20 flex items-center justify-center">
          <User size={45} className="text-pink-500" />
        </div>

        <h2 className="text-2xl font-bold mt-5">{callerName}</h2>
        <p className="text-gray-400 mt-2">Incoming video call...</p>

        <div className="flex justify-center gap-10 mt-8">
          <button
            onClick={onReject}
            className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center"
          >
            <PhoneOff size={26} />
          </button>

          <button
            onClick={onAccept}
            className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center"
          >
            <Phone size={26} />
          </button>
        </div>
      </div>
    </div>
  );
}
