import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

export function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View className="flex-1 items-center justify-center bg-sky-50 p-6">
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
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          <View className="relative w-full">
            <TextInput
              className="h-12 w-full rounded-full bg-white px-4 text-gray-500"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
            />
            <TouchableOpacity
              className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-slate-700"
              onPress={() => setHidePassword(!hidePassword)}>
              <FontAwesome name={hidePassword ? 'eye' : 'eye-slash'} size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity className="mb-6 h-12 w-full items-center justify-center rounded-full bg-slate-700">
          <Text className="text-lg font-bold text-white">Login</Text>
        </TouchableOpacity>

        {/* Social Media Icons */}
        <View className="mb-4 flex-row justify-center">
          <TouchableOpacity className="mx-2 h-10 w-10 items-center justify-center rounded-full bg-slate-700">
            <FontAwesome name="facebook" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="mx-2 h-10 w-10 items-center justify-center rounded-full bg-slate-700">
            <FontAwesome name="twitter" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="mx-2 h-10 w-10 items-center justify-center rounded-full bg-slate-700">
            <FontAwesome name="github" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="font-medium text-slate-700">Code with Aarzoo</Text>
      </View>
    </View>
  );
}
