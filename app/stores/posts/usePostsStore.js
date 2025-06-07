import { create } from 'zustand';

import { useAuthStore } from '../authentication/useAuthStore';

const apiUrl = process.env.EXPO_PUBLIC_URL;

export const usePostsStore = create((set) => ({
  posts: [],
  isLoading: false,
  error: null,

  getPosts: async () => {
    set({ isLoading: true, error: null });
    console.log('Fetching posts from API...');
    console.log('API URL:', apiUrl);
    console.log('Full URL:', `${apiUrl}/posts`);

    try {
      const token = useAuthStore.getState().token;

      const response = await fetch(`${apiUrl}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.erro || 'Failed to fetch posts');
      }

      const posts = await response.json();
      set({ posts });
    } catch (err) {
      set({ error: err?.message || 'Unknown error' });
    } finally {
      set({ isLoading: false });
    }
  },

  getSinglePost: async (id_post) => {
    try {
      const token = useAuthStore.getState().token;

      const response = await fetch(`${apiUrl}/posts/${id_post}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.erro || 'Failed to fetch post');
      }

      const post = await response.json();
      return post;
    } catch (err) {
      set({ error: err?.message || 'Unknown error' });
    }
  },

  newPost: async (formData) => {
    set({ isLoading: true, error: null });

    try {
      const token = useAuthStore.getState().token;

      const response = await fetch(`${apiUrl}/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.erro || 'Failed to create post');
      }

      await usePostsStore.getState().getPosts();
    } catch (err) {
      set({ error: err?.message || 'Unknown error' });
    } finally {
      set({ isLoading: false });
    }
  },

  updatePost: async (id_post, { tipo_post, titulo, descricao }) => {
    set({ isLoading: true, error: null });

    console.log('Updating post with ID:', id_post);
    console.log('New values:', { tipo_post, titulo, descricao });

    try {
      const token = useAuthStore.getState().token;

      const response = await fetch(`${apiUrl}/posts/${id_post}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo_post,
          titulo,
          descricao,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.erro || 'Failed to update post');
      }

      await usePostsStore.getState().getPosts();
    } catch (err) {
      set({ error: err?.message || 'Unknown error' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
