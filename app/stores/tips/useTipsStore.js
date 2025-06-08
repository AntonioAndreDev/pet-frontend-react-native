import { create } from 'zustand';

import { useAuthStore } from '../authentication/useAuthStore';

const apiUrl = process.env.EXPO_PUBLIC_URL;

export const useTipsStore = create((set) => ({
  tips: [],
  isLoading: false,
  error: null,

  getTips: async () => {
    set({ isLoading: true, error: null });

    try {
      const token = useAuthStore.getState().token;

      const response = await fetch(`${apiUrl}/dicas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch tips');
      }

      const tips = await response.json();
      set({ tips });
    } catch (err) {
      set({ error: err?.message || 'Unknown error' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
