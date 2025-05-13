import { create } from 'zustand';

const apiUrl = process.env.EXPO_PUBLIC_URL;

export const usePostsStore = create((set) => ({
  posts: [],
  isLoading: false,
  error: null,

  getPosts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${apiUrl}/posts`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch posts');
      }

      const posts = await response.json();
      set({ posts });
    } catch (err) {
      set({ error: err?.message || 'Unknown error' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
