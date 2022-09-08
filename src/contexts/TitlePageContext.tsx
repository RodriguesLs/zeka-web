import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface TitlePageProviderProps {
  children: ReactNode;
}

interface TitlePageContextData {
  title: string;
  changeTitlePage: (title: string) => void;
}

const TitlePageContext = createContext({} as TitlePageContextData);

export function TitlePageProvider({ children }: TitlePageProviderProps) {
  const [title, setTitle] = useState('');

  const changeTitlePage = useCallback((title: string) => {
    setTitle(title);
  }, []);

  return (
    <TitlePageContext.Provider
      value={{
        title,
        changeTitlePage,
      }}
    >
      {children}
    </TitlePageContext.Provider>
  );
}

export const useTitlePage = () => useContext(TitlePageContext);
