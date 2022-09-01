import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface SidebarProviderProps {
  children: ReactNode;
}

interface SidebarContextData {
  isVisible: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext({} as SidebarContextData);

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isVisible, setIsVisible] = useState(true);

  const toggleSidebar = useCallback(() => {
    setIsVisible((oldState) => !oldState);
  }, [isVisible]);

  return (
    <SidebarContext.Provider
      value={{
        isVisible,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
