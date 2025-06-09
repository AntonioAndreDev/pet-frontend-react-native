import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Filter from '../../components/Filter';
import Loading from '../../components/Loading';
import Post from '../../components/posts/Post';
import { usePostsStore } from '../stores/posts/usePostsStore';

export default function Home() {
  const insets = useSafeAreaInsets();
  const { posts, getPosts, isLoading, error } = usePostsStore();

  const [filtros, setFiltros] = useState({ especie: '', sexo: '' });

  const handleFiltroChange = (campo, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: prev[campo] === valor ? '' : valor,
    }));
  };

  const extrairValoresUnicos = (campo) => [...new Set(posts.map((p) => p[campo]).filter(Boolean))];

  const postsFiltrados = posts.filter((post) => {
    return (
      (!filtros.especie || post.especie === filtros.especie) &&
      (!filtros.sexo || post.sexo === filtros.sexo)
    );
  });

  useEffect(() => {
    getPosts();
  }, []);

  if (error) {
    return (
      <SafeAreaView>
        <Text>Erro: {error}</Text>
      </SafeAreaView>
    );
  }

  if (posts.length === 0 && !isLoading) {
    return (
      <SafeAreaView>
        <Text className="text-black">Nenhum post encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading && <Loading />}
      <View className="absolute left-0 right-0 top-0 z-10 items-start justify-center bg-yellow-400 px-4 py-2">
        <SafeAreaView>
          <Text className="text-lg font-bold text-slate-700">Petly</Text>
        </SafeAreaView>
      </View>

      {/*Filtro*/}
      <Filter
        handleFiltroChange={handleFiltroChange}
        extrairValoresUnicos={extrairValoresUnicos}
        filtros={filtros}
      />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <View>
          {postsFiltrados.map((post) => (
            <View key={post.id_post} style={{ marginBottom: 32 }}>
              <Post post={post} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
