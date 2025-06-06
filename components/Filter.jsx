import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Filter({ handleFiltroChange, extrairValoresUnicos, filtros }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        marginTop: insets.top - 8,
      }}
      className="px-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-2"
        contentContainerStyle={{ gap: 8 }}>
        {Object.keys(filtros).map((campo) =>
          extrairValoresUnicos(campo).map((valor) => (
            <TouchableOpacity
              key={`${campo}-${valor}`}
              className={`rounded-full px-4 py-2 ${
                filtros[campo] === String(valor) ? 'bg-yellow-400' : 'bg-gray-200'
              }`}
              onPress={() => handleFiltroChange(campo, String(valor))}>
              <Text className="text-sm font-medium text-gray-800">{valor}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
