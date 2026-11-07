import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/common/TopBar';
import { BottomNav } from './components/common/BottomNav';
import { HomeScreen } from './components/home/HomeScreen';
import { LiveRoomScreen } from './components/live/LiveRoomScreen';
import { VideoCallScreen } from './components/videocall/VideoCallScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { WalletScreen } from './components/wallet/WalletScreen';
import { InboxScreen } from './components/inbox/InboxScreen';
import { AuthScreen } from './components/auth/AuthScreen';
import { GoLiveScreen } from './components/golive/GoLiveScreen';
import { IncomingCallModal } from './components/videocall/IncomingCallModal';
import { UserProfileModal } from './components/profile/UserProfileModal';
import { Wifi, BatteryMedium, Signal, Smartphone, Monitor } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentScreen, isAuthenticated, deviceFrameEnabled, setDeviceFrameEnabled } = useApp();

  // If user navigated to auth or is not authenticated and is on auth screen
  if (!isAuthenticated && currentScreen === 'auth') {
    return <AuthScreen />;
  }

  // Active Screen renderer
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'live_room':
        return <LiveRoomScreen />;
      case 'video_call':
        return <VideoCallScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'wallet':
        return <WalletScreen />;
      case 'inbox':
        return <InboxScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'go_live':
        return <GoLiveScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const isFullScreenMode = currentScreen === 'live_room' || currentScreen === 'video_call';

  // Android Mobile Status Bar
  const AndroidStatusBar = () => (
    <div className="w-full px-5 py-1.5 flex items-center justify-between text-xs text-slate-400 select-none bg-[#080911]/90 z-30">
      <span className="font-semibold text-slate-300 tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5 text-slate-300">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <BatteryMedium className="w-4 h-4 text-emerald-400" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#06070c] text-white flex flex-col items-center justify-start antialiased selection:bg-pink-500 selection:text-white">
      {/* If device frame preview is active on desktop */}
      {deviceFrameEnabled ? (
        <div className="py-6 px-4 flex flex-col items-center">
          {/* Top Bar Switch Helper */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs text-slate-400">Android Preview Frame Active</span>
            <button
              onClick={() => setDeviceFrameEnabled(false)}
              className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-pink-300 font-semibold transition-colors flex items-center gap-1"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Switch to Responsive Fullscreen</span>
            </button>
          </div>

          {/* Android Device Frame */}
          <div className="relative w-[390px] h-[844px] rounded-[48px] bg-[#080911] border-[10px] border-[#1d2238] shadow-[0_0_60px_-15px_rgba(236,72,153,0.3)] overflow-hidden flex flex-col">
            {/* Front Camera Notch / Punch-hole */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black z-50 border border-white/10 shadow-inner" />

            {/* Android Status Bar */}
            <AndroidStatusBar />

            {/* Inner viewport */}
            <div className="flex-1 overflow-y-auto flex flex-col relative no-scrollbar">
              {!isFullScreenMode && <TopBar />}
              <main className="flex-1">{renderScreen()}</main>
              {!isFullScreenMode && <BottomNav />}
            </div>

            {/* Android Bottom Home Bar */}
            <div className="h-4 bg-[#080911] flex items-center justify-center">
              <div className="w-32 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        /* Responsive Mobile-First Container (fluid on phones, neatly centered max-w-lg on wide displays) */
        <div className="w-full max-w-lg min-h-screen bg-[#080911] flex flex-col relative shadow-2xl border-x border-white/5">
          {/* Simulated Mobile Status bar */}
          <AndroidStatusBar />

          {/* Top Bar (hidden on full-screen live room or video call) */}
          {!isFullScreenMode && <TopBar />}

          {/* Screen Content */}
          <main className="flex-1 relative">{renderScreen()}</main>

          {/* Bottom Navigation */}
          {!isFullScreenMode && <BottomNav />}
        </div>
      )}

      {/* Global Modals: Incoming Call Screen & User Profile Viewer */}
      <IncomingCallModal />
      <UserProfileModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
