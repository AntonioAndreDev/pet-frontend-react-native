import { useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, SafeAreaView } from 'react-native';

import Loading from '../../components/Loading';
import Tip from '../../components/tips/Tip';
import { useTipsStore } from '../stores/tips/useTipsStore';

export default function Tips() {
  const { tips, getTips, isLoading, error } = useTipsStore();

  useEffect(() => {
    getTips();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Erro ao carregar dicas: {error}</Text>
      </View>
    );
  }

  return (
    <>
      <View className="absolute left-0 right-0 top-0 z-10 items-start justify-center bg-yellow-400 px-4 py-2">
        <SafeAreaView>
          <Text className="text-lg font-bold text-slate-700">Dicas</Text>
        </SafeAreaView>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <View style={{ marginTop: 100 }}>
          {tips.length === 0 ? (
            <Text>Nenhuma dica encontrada.</Text>
          ) : (
            tips.map((dica, index) => (
              <View key={dica?.id_dica ?? `tip-${index}`} style={{ marginBottom: 32 }}>
                <Tip tip={dica} />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
}
