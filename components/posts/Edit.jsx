import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import TipoOptions from './TipoOptions';
import { usePostsStore } from '../../app/stores/posts/usePostsStore';

export default function Edit({
  post,
  isVisible,
  onClose,
  editTitulo,
  setEditTitulo,
  editDescricao,
  setEditDescricao,
  editTipo,
  setEditTipo,
}) {
  const { updatePost } = usePostsStore();

  const handleEditSave = async () => {
    await updatePost(post.id_post, {
      tipo_post: editTipo,
      titulo: editTitulo,
      descricao: editDescricao,
    });
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
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

        <Text style={styles.label}>Tipo de Post:</Text>
        <TipoOptions tipoAtual={editTipo} setTipo={setEditTipo} tipoOriginal={post.tipo_post} />

        <View style={styles.modalButtons}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditSave} style={styles.saveButton}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: { justifyContent: 'center', alignItems: 'center' },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '90%',
    elevation: 6,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#1f2937' },
  label: { marginBottom: 8, fontWeight: '600', color: '#374151' },
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
  cancelText: { color: '#fff', fontWeight: '600' },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
  },
  saveText: { color: '#fff', fontWeight: '600' },
});
