import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

export const raceNavigationItems = [
  {
    id: 'Fort William, Scotland',
    label: 'Fort William',
  },
  {
    id: 'Bielsko - Biała, Poland',
    label: 'Bielsko, Poland',
  },
] as const;
export const categoryNavigationItems = [
  { label: 'Elite Women', id: 'Women Elite' },
  { label: 'Elite Men', id: 'Men Elite' },
  { label: 'Junior Women', id: 'Women Junior' },
  { label: 'Junior Men', id: 'Men Junior' },
] as const;
export const dayNavigationItems = [
  { label: 'Timed Training', id: 'Timed Training' },
  { label: 'Qualifying', id: 'Qualification' },
  { label: 'Semifinals', id: 'Semi-Final' },
  { label: 'Finals', id: 'Final' },
] as const;

type NavigationProps = {
  race: (typeof raceNavigationItems)[number]['id'];
  category: (typeof categoryNavigationItems)[number]['id'];
  day: (typeof dayNavigationItems)[number]['id'];
};
interface NavigationContextType {
  currentPath: NavigationProps;
  setCurrentPath: Dispatch<SetStateAction<NavigationProps>>;
}
// Create the context
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Define the provider component
interface NavigationProviderProps {
  children: ReactNode;
}
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<NavigationProps>({
    race: 'Fort William, Scotland',
    category: 'Men Elite',
    day: 'Final',
  });
  return (
    <NavigationContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook to use the navigation context
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
