import { FontAwesome } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useMemo, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';

import ImageCarousel from './ImageCarousel';
import NewComment from './NewComment';
import Tipo from './Tipo';
import { useAuthStore } from '../../app/stores/authentication/useAuthStore';
import { usePostsStore } from '../../app/stores/posts/usePostsStore';
import CommentList from '../comments/CommentList';

export default function Post({ post }) {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const [showEditForm, setShowEditForm] = useState(false);
  const [editTitulo, setEditTitulo] = useState('');
  const [editDescricao, setEditDescricao] = useState('');
  const [editTipo, setEditTipo] = useState(post.tipo_post);

  const { updatePost } = usePostsStore();

  const handleEditSave = async (id_post) => {
    console.log(
      'Novo título:',
      editTitulo,
      'Nova descrição:',
      editDescricao,
      'Novo tipo:',
      editTipo
    );
    await updatePost(id_post, {
      tipo_post: editTipo,
      titulo: editTitulo,
      descricao: editDescricao,
    });
    setShowEditForm(false);
  };

  const renderTipoOptions = () => {
    switch (post.tipo_post) {
      case 'Perdido':
        return (
          <>
            <OptionButton label="Encontrado" value="Encontrado" />
            <OptionButton label="Padrão" value="Padrão" />
          </>
        );
      case 'Adoção':
        return (
          <>
            <OptionButton label="Adotado" value="Adotado" />
            <OptionButton label="Padrão" value="Padrão" />
          </>
        );
      default:
        return (
          <>
            <OptionButton label="Adoção" value="Adoção" />
            <OptionButton label="Perdido" value="Perdido" />
          </>
        );
    }
  };

  const OptionButton = ({ label, value }) => (
    <TouchableOpacity
      onPress={() => setEditTipo(value)}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: editTipo === value ? '#2563eb' : '#e5e7eb',
      }}>
      <Text style={{ color: editTipo === value ? '#fff' : '#111827' }}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex flex-row items-center justify-between gap-2">
        <View>
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

        {post.id_usuario === useAuthStore.getState().userId && post.tipo_post && (
          <TouchableOpacity
            onPress={() => {
              setEditTitulo(post.titulo);
              setEditDescricao(post.descricao);
              setEditTipo(post.tipo_post);
              setShowEditForm(true);
            }}
            style={styles.editButton}>
            <Text style={styles.editButtonText}>✏️ Editar Post</Text>
          </TouchableOpacity>
        )}
      </View>

      <ImageCarousel
        image={
          post?.imagem?.startsWith('http')
            ? post.imagem
            : `http://${process.env.EXPO_PUBLIC_IP}:3000/${post.imagem?.replace('src/', '')}`
        }
      />

      <View style={styles.commentSection}>
        <TouchableOpacity
          style={styles.commentButton}
          onPress={handlePresentModalPress}
          activeOpacity={0.7}>
          <FontAwesome name="comment-o" size={24} color="black" />
        </TouchableOpacity>
        <Tipo tipo={post.tipo_post} />
      </View>

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

      <Modal
        isVisible={showEditForm}
        onBackdropPress={() => setShowEditForm(false)}
        onBackButtonPress={() => setShowEditForm(false)}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropOpacity={0.4}
        animationIn="zoomIn"
        animationOut="zoomOut"
        style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>✏️ Editar Post</Text>

          <TextInput
            style={styles.input}
            value={editTitulo}
            onChangeText={setEditTitulo}
            placeholder="Título"
            placeholderTextColor="#9ca3af"
          />

          <TextInput
            style={styles.textarea}
            value={editDescricao}
            onChangeText={setEditDescricao}
            placeholder="Descrição"
            placeholderTextColor="#9ca3af"
            multiline
          />

          <Text style={{ marginBottom: 8, fontWeight: '600', color: '#374151' }}>
            Tipo de Post:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{renderTipoOptions()}</View>

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setShowEditForm(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEditSave(post.id_post)}
              style={styles.saveButton}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 0 },
  commentButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    marginTop: 12,
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#e0f2fe',
    borderRadius: 6,
  },
  editButtonText: {
    color: '#0284c7',
    fontWeight: '500',
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
  modalWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    minHeight: 80,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f87171',
  },
  cancelText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});
