import { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

import { useAuthStore } from '../stores/authentication/useAuthStore';

export default function Home() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [senhaNova, setSenhaNova] = useState('');

  const { updateProfile } = useAuthStore();

  const handleAtualizar = async () => {
    await updateProfile(nome, sobrenome, telefone, senhaNova, senhaAtual);
  };

  return (
    <>
      <View className="absolute left-0 right-0 top-0 z-10 items-start justify-center bg-yellow-400 px-4 py-2">
        <SafeAreaView>
          <Text className="text-lg font-bold text-slate-700">Editar Perfil</Text>
        </SafeAreaView>
      </View>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginTop: 80 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />

          <TextInput
            placeholder="Sobrenome"
            value={sobrenome}
            onChangeText={setSobrenome}
            style={styles.input}
          />

          <TextInput
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.input}
            keyboardType="phone-pad"
          />

          <TextInput
            placeholder="Senha Atual"
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            style={styles.input}
            textContentType="password"
            autoComplete="off"
          />

          <TextInput
            placeholder="Nova Senha"
            value={senhaNova}
            onChangeText={setSenhaNova}
            style={styles.input}
            textContentType="password"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleAtualizar}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  button: {
    backgroundColor: '#facc15',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#1e293b',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
