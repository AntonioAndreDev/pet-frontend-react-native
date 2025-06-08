import { router } from 'expo-router';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';

const apiUrl = process.env.EXPO_PUBLIC_URL;

export const useAuthStore = create((set) => ({
  token: '',
  isLogged: false,
  isLoading: false,
  error: null,
  userId: null,

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

  userProfileData: async () => {
    set({ isLoading: true, error: null });

    try {
      const token = useAuthStore.getState().token;

      const response = await fetch(`${apiUrl}/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.erro || 'Failed to fetch user profile');
      }

      const userProfile = await response.json();
      set({ userId: userProfile.id });
    } catch (err) {
      set({ error: err?.message || 'Unknown error' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (
    nome = '',
    sobrenome = '',
    telefone = '',
    senhaNova = '',
    senhaAtual = ''
  ) => {
    set({ isLoading: true, error: null });

    console.log(`Atualizando perfil com: );
      nome: ${nome}, 
      sobrenome: ${sobrenome}, 
      telefone: ${telefone}, 
      senhaNova: ${senhaNova}, 
      senhaAtual: ${senhaAtual}`);

    // Validação: nova senha precisa ser preenchida se senha atual for enviada
    if (senhaAtual.trim() !== '' && senhaNova.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha a nova senha.');
      set({ isLoading: false });
      return;
    }

    // Validação: pelo menos um campo deve ser preenchido
    if (
      nome.trim() === '' &&
      sobrenome.trim() === '' &&
      telefone.trim() === '' &&
      senhaAtual.trim() === '' &&
      senhaNova.trim() === ''
    ) {
      Alert.alert('Erro', 'Por favor, preencha pelo menos um campo.');
      set({ isLoading: false });
      return;
    }

    try {
      const token = useAuthStore.getState().token;

      const response = await fetch(`${apiUrl}/usuarios`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          sobrenome,
          telefone,
          senhaNova,
          senhaAtual,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.mensagem || 'Failed to update profile');
      }

      Toast.show({
        type: 'success',
        text1: 'Perfil atualizado com sucesso!',
        visibilityTime: 12_000,
      });

      set({ token: '', isLogged: false, userId: null });
      router.replace('(auth)/login');
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: err?.mensagem || err?.message || 'Unknown error',
        visibilityTime: 12_000,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ token: '', isLogged: false, userId: null });
    router.replace('(auth)/login');
  },
}));
