import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Post from '../../components/posts/Post';
import { usePostsStore } from '../stores/posts/usePostsStore';

export default function Home() {
  const insets = useSafeAreaInsets();
  const { posts, getPosts, isLoading, error } = usePostsStore();

  const [filtros, setFiltros] = useState({ especie: '', sexo: '', raca: '', idade: '' });
  const [mostrarRacas, setMostrarRacas] = useState(false);

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
      (!filtros.sexo || post.sexo === filtros.sexo) &&
      (!filtros.raca || post.raca === filtros.raca) &&
      (!filtros.idade || String(post.idade) === filtros.idade)
    );
  });

  useEffect(() => {
    getPosts();
  }, []);

  if (isLoading)
    return (
      <SafeAreaView>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  if (error)
    return (
      <SafeAreaView>
        <Text>Erro: {error}</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        style={{
          paddingTop: insets.top,
        }}
        className="absolute left-0 right-0 top-0 z-10 bg-yellow-400 items-start justify-center px-4">
        <Text className="text-slate-700 text-lg font-bold">Pet</Text>
      </View>

      <View
        style={{
          marginTop: insets.top,
        }}
        className="px-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-2"
          contentContainerStyle={{ gap: 8 }}>
          {['especie', 'sexo'].map((campo) =>
            extrairValoresUnicos(campo).map((valor) => (
              <TouchableOpacity
                key={`${campo}-${valor}`}
                className={`px-4 py-2 rounded-full ${
                  filtros[campo] === String(valor)
                    ? 'bg-yellow-400'
                    : 'bg-gray-200'
                }`}
                onPress={() => handleFiltroChange(campo, String(valor))}>
                <Text className="text-sm text-gray-800 font-medium">{valor}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* <TouchableOpacity
          className="px-4 py-2 bg-gray-200 rounded-full self-start mb-2"
          onPress={() => setMostrarRacas((prev) => !prev)}>
          <Text className="text-sm text-gray-800 font-medium">
            {mostrarRacas ? 'Ocultar raças' : '+ Filtrar por raça'}
          </Text>
        </TouchableOpacity> */}

        {mostrarRacas && (
          <ScrollView
            className="max-h-[150px] mb-4"
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {extrairValoresUnicos('raca').map((valor) => (
              <TouchableOpacity
                key={`raca-${valor}`}
                className={`px-4 py-2 rounded-full ${
                  filtros.raca === String(valor)
                    ? 'bg-yellow-400'
                    : 'bg-gray-200'
                }`}
                onPress={() => handleFiltroChange('raca', String(valor))}>
                <Text className="text-sm text-gray-800 font-medium">{valor}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <View>
          {postsFiltrados.map((post) => (
            <View key={post.id_post} className="mb-5">
              <Post post={post} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
