import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    telefone: '',
    email: '',
    senha: '',
  });

  const [hidePassword, setHidePassword] = useState(true);
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    console.log('Dados do formulário de registro:', formData);
    // Exemplo de redirecionamento após sucesso
    // router.replace('/(app)/home');
  };

  return (
    <View className="flex-1 items-center justify-center bg-yellow-400">
      <View className="w-full max-w-md items-center overflow-hidden rounded-3xl bg-yellow-400 p-6 shadow-lg">
        {/* Dog Ears */}
        <View className="absolute left-0 top-0 size-40 -translate-x-12 -translate-y-12 rounded-full bg-slate-700" />
        <View className="absolute right-0 top-0 size-40 -translate-y-12 translate-x-12 rounded-full bg-slate-700" />

        {/* Dog Eyes */}
        <View className="mb-4 mt-12 w-full flex-row justify-center">
          <View className="mx-6 h-8 w-8 items-center justify-center rounded-full bg-slate-700">
            <View className="absolute left-1 top-1 h-3 w-3 rounded-full bg-white" />
          </View>
          <View className="mx-6 h-8 w-8 items-center justify-center rounded-full bg-slate-700">
            <View className="absolute left-1 top-1 h-3 w-3 rounded-full bg-white" />
          </View>
        </View>

        {/* Dog Nose and Mouth */}
        <View className="mb-2 h-8 w-8 items-center justify-center rounded-full bg-slate-700">
          <View className="absolute bottom-1 h-2 w-4 rounded-full bg-slate-500" />
        </View>
        <View className="mb-2 h-8 w-16 rounded-b-full border-b-4 border-slate-700" />
        <View className="-mt-2 mb-6 h-8 w-6 rounded-b-lg bg-pink-200" />

        {/* Dog Paws */}
        <View className="relative w-full flex-row justify-between">
          <View className="absolute left-8 top-2">
            <View className="flex-row">
              <View className="mx-1 h-6 w-3 rounded-b-full bg-slate-700" />
              <View className="mx-1 h-6 w-3 rounded-b-full bg-slate-700" />
              <View className="mx-1 h-6 w-3 rounded-b-full bg-slate-700" />
            </View>
          </View>

          <View className="absolute right-8 top-2">
            <View className="flex-row">
              <View className="mx-1 h-6 w-3 rounded-b-full bg-slate-700" />
              <View className="mx-1 h-6 w-3 rounded-b-full bg-slate-700" />
              <View className="mx-1 h-6 w-3 rounded-b-full bg-slate-700" />
            </View>
          </View>
        </View>

        {/* Register Form */}
        <View className="mb-4 mt-12 w-full">
          <TextInput
            className="mb-4 h-12 w-full rounded-full bg-white px-4 text-gray-500"
            placeholder="Nome"
            value={formData.nome}
            onChangeText={(value) => handleInputChange('nome', value)}
          />
          <TextInput
            className="mb-4 h-12 w-full rounded-full bg-white px-4 text-gray-500"
            placeholder="Sobrenome"
            value={formData.sobrenome}
            onChangeText={(value) => handleInputChange('sobrenome', value)}
          />
          <TextInput
            className="mb-4 h-12 w-full rounded-full bg-white px-4 text-gray-500"
            placeholder="Telefone"
            value={formData.telefone}
            onChangeText={(value) => handleInputChange('telefone', value)}
          />
          <TextInput
            className="mb-4 h-12 w-full rounded-full bg-white px-4 text-gray-500"
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
          />

          <View className="relative w-full">
            <TextInput
              className="h-12 w-full rounded-full bg-white px-4 text-gray-500"
              placeholder="Senha"
              value={formData.senha}
              onChangeText={(value) => handleInputChange('senha', value)}
              secureTextEntry={hidePassword}
            />
            <TouchableOpacity
              className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-slate-700"
              onPress={() => setHidePassword(!hidePassword)}>
              <FontAwesome name={hidePassword ? 'eye' : 'eye-slash'} size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="flex w-full justify-end text-slate-700">
          Já tem uma conta?{' '}
          <Link href="(auth)/login" className="font-bold">
            Entrar
          </Link>
        </Text>

        <TouchableOpacity
          onPress={handleRegister}
          className="mb-6 mt-4 h-12 w-full items-center justify-center rounded-full bg-slate-700">
          <Text className="text-lg font-bold text-white">Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
