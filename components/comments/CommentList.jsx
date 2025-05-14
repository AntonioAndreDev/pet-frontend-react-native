import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { useCommentsStore } from '../../app/stores/comments/useCommentsStore';

export default function CommentList({ postId }) {
  const { comments, getCommentsFromPost } = useCommentsStore();

  useEffect(() => {
    getCommentsFromPost(postId);
    const interval = setInterval(() => getCommentsFromPost(postId), 10000);
    return () => clearInterval(interval);
  }, [postId]);

  return (
    <View>
      {comments.length > 0 ? (
        comments.map((comentario) => (
          <Text key={comentario.id_comentario} style={styles.itemText}>
            {comentario.descricao}
          </Text>
        ))
      ) : (
        <Text className="text-center">Nenhum comentário ainda</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 16,
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
});
