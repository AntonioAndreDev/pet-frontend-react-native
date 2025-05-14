import { FontAwesome } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useMemo } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ImageCarousel from './ImageCarousel';

export default function Post({ post }) {
  const bottomSheetModalRef = useRef(null);

  // Apenas uma posição em 50% da altura da tela
  const snapPoints = useMemo(() => ['50%'], []);

  // Índice inicial deve ser 0 já que só temos um ponto de snap
  const initialSnapIndex = 0;

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center gap-2">
        <Image
          className="size-8 rounded-full"
          source={
            post.usuario_p?.imagem
              ? { uri: post.usuario_p.imagem }
              : require('../../public/images/avatars/default.png')
          }
        />
        <Text className="font-semibold lowercase text-gray-700">
          {post.usuario_p?.nome || 'usuário'}
        </Text>
      </View>
      <ImageCarousel image={post.imagem} />
      <TouchableOpacity className="size-8" onPress={handlePresentModalPress}>
        <FontAwesome name="comment-o" size={24} color="black" />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={initialSnapIndex}
        snapPoints={snapPoints}
        enableContentPanningGesture
        enableHandlePanningGesture
        handleComponent={() => (
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
        )}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
          <Text className="mb-2 text-center text-lg font-bold">Comentários</Text>
          {post.comentarios_p.length > 0 &&
            post.comentarios_p.map((comentario) => (
              <Text key={comentario.id_comentario} style={styles.itemText}>
                {comentario.descricao}
              </Text>
            ))}
          {post.comentarios_p.length === 0 && (
            <Text className="text-center">Nenhum comentário ainda</Text>
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
      <Text className="mb-1 text-xl font-semibold">{post.titulo}</Text>
      <View className="flex flex-row">
        <Text className="lowercase text-gray-800">
          <Text className="font-bold">@{post.usuario_p?.nome}</Text> {post.descricao}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  handleContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
  },
  handle: {
    width: 36,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 16,
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
});
