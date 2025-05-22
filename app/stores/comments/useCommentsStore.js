import { create } from 'zustand';

import { useAuthStore } from '../authentication/useAuthStore';

const apiUrl = process.env.EXPO_PUBLIC_URL;

export const useCommentsStore = create((set) => ({
  comments: [],
  isLoading: false,
  error: null,

  getCommentsFromPost: async (id_post) => {
    set({ isLoading: true, error: null });

    try {
      const token = useAuthStore.getState().token;

      const response = await fetch(`${apiUrl}/posts/${id_post}/comentarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  postNewComment: async (id_post, descricao) => {
    set({ isLoading: true, error: null });
    descricao = descricao.trim();

    try {
      const token = useAuthStore.getState().token;

      await fetch(`${apiUrl}/comentarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descricao,
          id_post,
          status: 'ativo',
        }),
      });
    } catch (err) {
      set({ error: err?.message || 'Unknown error' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
