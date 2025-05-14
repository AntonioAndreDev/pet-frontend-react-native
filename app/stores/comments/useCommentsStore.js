import { create } from 'zustand';

const apiUrl = process.env.EXPO_PUBLIC_URL;

export const useCommentsStore = create((set) => ({
  comments: [],
  isLoading: false,
  error: null,

  getCommentsFromPost: async (id_post) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${apiUrl}/posts/${id_post}/comentarios`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch comments');
      }

      const comments = await response.json();
      set({ comments });
    } catch (err) {
      set({ error: err?.message || 'Unknown error' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
