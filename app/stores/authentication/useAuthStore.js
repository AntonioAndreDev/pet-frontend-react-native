import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
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
        const data = await res.json();
        set({ token: data.token });
        set({ isLogged: true });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Credenciais inválidas!',
          text2: 'Verifique seu email e senha e tente novamente.',
          visibilityTime: 12_000,
        });
      }
    } catch (err) {
      set({ error: err?.erro || 'Erro desconhecido' });
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login!',
        text2: err?.message || 'Tente novamente mais tarde.',
        visibilityTime: 12_000,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (nome, sobrenome, telefone, email, senha) => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${apiUrl}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          sobrenome,
          telefone,
          email,
          senha,
        }),
      });

      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: 'Conta criada com sucesso!',
          text2: 'Você já pode fazer login 👏',
          visibilityTime: 12_000,
        });
        router.replace('(auth)/login');
      }
    } catch (err) {
      set({ error: err?.message || 'Unknown error' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
