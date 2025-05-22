import { FontAwesome } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useMemo } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

import ImageCarousel from './ImageCarousel';
import NewComment from './NewComment';
import CommentList from '../comments/CommentList';

export default function Post({ post }) {
  const bottomSheetModalRef = useRef(null);

  // Snappoints para o modal
  const snapPoints = useMemo(() => ['50%'], []);

  const handlePresentModalPress = useCallback(() => {
    console.log('Tentando abrir o modal');
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
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

      {/* Botão de comentário com área de toque maior */}
      <TouchableOpacity
        style={styles.commentButton}
        onPress={handlePresentModalPress}
        activeOpacity={0.7}>
        <FontAwesome name="comment-o" size={24} color="black" />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enableContentPanningGesture
        enableHandlePanningGesture
        handleComponent={() => (
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
        )}
        onChange={handleSheetChanges}
        keyboardBehavior={Platform.OS === 'ios' ? 'extend' : 'interactive'}
        keyboardBlurBehavior="restore">
        <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
          <Text className="mb-2 text-center text-lg font-bold">Comentários</Text>
          <CommentList postId={post.id_post} />
          <View style={styles.commentInputContainer}>
            <NewComment id_post={post.id_post} />
          </View>
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
  safeArea: {
    flex: 0, // Modificar se necessário para o layout
  },
  commentButton: {
    padding: 8, // Área de toque maior
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    height: 4,
    borderRadius: 2,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  commentInputContainer: {
    marginTop: 16,
  },
  itemText: {
    fontSize: 16,
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
});
