import React, {
  createContext,
  useContext,
  useState,
  ReactNode
} from 'react';

type Screen =
  | 'home'
  | 'live_room'
  | 'video_call'
  | 'profile'
  | 'wallet'
  | 'inbox'
  | 'auth'
  | 'go_live';

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  deviceFrameEnabled: boolean;
  setDeviceFrameEnabled: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [deviceFrameEnabled, setDeviceFrameEnabled] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        isAuthenticated,
        setIsAuthenticated,
        deviceFrameEnabled,
        setDeviceFrameEnabled
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }

  return context;
}
