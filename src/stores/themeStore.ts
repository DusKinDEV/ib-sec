import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  primaryColor: string;
  secondaryColor: string;
  fontSize: string;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setFontSize: (size: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      primaryColor: '#16A34A',
      secondaryColor: '#FEE12B',
      fontSize: 'base',
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setSecondaryColor: (color) => set({ secondaryColor: color }),
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: 'theme-storage',
    }
  )
);