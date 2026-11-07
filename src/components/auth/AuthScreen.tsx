import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Mail, Lock, User } from 'lucide-react';

export function AuthScreen() {
  const { setIsAuthenticated, setCurrentScreen } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-[#080911] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Star size={55} className="text-pink-500 mx-auto mb-3" />
          <h1 className="text-3xl font-bold">LiveStar</h1>
          <p className="text-gray-400 mt-2">Connect. Stream. Shine.</p>
        </div>

        <div className="bg-[#171827] rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold">Welcome</h2>

          <div className="flex items-center gap-3 bg-[#080911] rounded-xl p-3">
            <User className="text-pink-400" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="bg-transparent outline-none flex-1 text-white"
            />
          </div>

          <div className="flex items-center gap-3 bg-[#080911] rounded-xl p-3">
            <Mail className="text-pink-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="bg-transparent outline-none flex-1 text-white"
            />
          </div>

          <div className="flex items-center gap-3 bg-[#080911] rounded-xl p-3">
            <Lock className="text-pink-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-transparent outline-none flex-1 text-white"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-pink-600 rounded-xl py-4 font-bold"
          >
            Login / Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
