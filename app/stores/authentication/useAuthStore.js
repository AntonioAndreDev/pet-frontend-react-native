import { create } from 'zustand';

const apiUrl = process.env.EXPO_PUBLIC_URL;

export const useAuthStore = create((set) => ({
  token: '',
  isLogged: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha: password,
        }),
      });

      if (res.ok) {
        console.log('entrei no login');
        const data = await res.json();
        set({ token: data.token });
        set({ isLogged: true });
      }
    } catch (err) {
      set({ error: err?.message || 'Unknown error' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
