import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import Loading from './Loading';
import { useAuthStore } from '../app/stores/authentication/useAuthStore';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const router = useRouter();

  const { login, userProfileData, isLoading } = useAuthStore();

  async function handleLogin() {
    await login(email.toLocaleLowerCase(), password);

    // Redireciona se o login for bem-sucedido
    if (useAuthStore.getState().isLogged) {
      await userProfileData();
      router.replace('/(app)/home');
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-yellow-400">
      {isLoading && <Loading />}
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

        {/* Login Form */}
        <View className="mb-4 mt-12 w-full">
          <TextInput
            className="mb-4 h-12 w-full rounded-full bg-white px-4 text-gray-500"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <View className="relative w-full">
            <TextInput
              className="h-12 w-full rounded-full bg-white px-4 text-gray-500"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-slate-700"
              onPress={() => setHidePassword(!hidePassword)}>
              <FontAwesome name={hidePassword ? 'eye' : 'eye-slash'} size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="flex w-full justify-end text-slate-700">
          Não tem uma conta?{' '}
          <Link href="(auth)/register" className="font-bold">
            Registre-se
          </Link>
        </Text>

        <TouchableOpacity
          onPress={handleLogin}
          className="mb-6 mt-4 h-12 w-full items-center justify-center rounded-full bg-slate-700">
          <Text className="text-lg font-bold text-white">Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
