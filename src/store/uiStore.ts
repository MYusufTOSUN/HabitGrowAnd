import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

type UIState = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
};

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            theme: Appearance.getColorScheme() || 'light',
            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === 'light' ? 'dark' : 'light',
                })),
        }),
        {
            name: 'ui-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
); 