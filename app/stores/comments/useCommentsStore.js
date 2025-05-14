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

  postNewComment: async (id_post, id_usuario, descricao) => {
    set({ isLoading: true, error: null });

    try {
      await fetch(`${apiUrl}/comentarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descricao,
          id_post,
          id_usuario,
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
