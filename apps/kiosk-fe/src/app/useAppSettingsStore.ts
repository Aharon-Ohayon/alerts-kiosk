import { create } from 'zustand';

export interface AppSettingsStore {
    isDarkMode: boolean;
    interestedZones: string[];

    setDarkMode: (isDarkMode: boolean) => void;
    setInterestedZones: (zones: string[]) => void;
}

export const useAppSettingsStore = create<AppSettingsStore>(set => ({
    isDarkMode: true,
    interestedZones: [],

    setDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
    setInterestedZones: (zones: string[]) => set({ interestedZones: zones })
}));
