import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useCommentsStore } from '../../app/stores/comments/useCommentsStore';

export default function NewComment({ id_post }) {
  const [comment, setComment] = useState('');

  const { postNewComment, getCommentsFromPost } = useCommentsStore();

  const handleCommentSubmit = async () => {
    if (comment.trim() === '') {
      return;
    }

    try {
      // TODO - Obter id_usuario do usuário logado
      await postNewComment(id_post, 1, comment);
      await getCommentsFromPost(id_post);
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        className="mr-2 flex-1 rounded-lg border border-gray-300 px-4 py-2 text-base"
        placeholder="Escreva um comentário..."
        multiline
        returnKeyType="send"
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity>
        <Feather
          onPress={handleCommentSubmit}
          className="rounded-2xl bg-yellow-600 px-4 py-1.5"
          name="arrow-up-circle"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
});
