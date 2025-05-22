import { Image, View, StyleSheet } from 'react-native';

export function renderItem({ item }) {
  // Se não tiver item ou for inválido
  if (!item) {
    return <View style={[styles.itemContainer, { backgroundColor: '#cccccc' }]} />;
  }

  // Se for uma string que começa com http (URL)
  if (typeof item === 'string') {
    if (item.startsWith('http')) {
      console.log('Renderizando imagem:', item); // Debug
      return (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
        </View>
      );
    } else {
      // Assumimos que é uma cor
      return <View style={[styles.itemContainer, { backgroundColor: item }]} />;
    }
  }

  // Fallback
  return <View style={[styles.itemContainer, { backgroundColor: '#e0e0e0' }]} />;
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
