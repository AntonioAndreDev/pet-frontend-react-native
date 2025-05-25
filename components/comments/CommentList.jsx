import { useEffect } from 'react';
import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

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
          <View key={comentario.id_comentario} className=" mb-4 flex-row gap-2">
            {comentario.usuario_c.imagem !== null && (
              <>
                <Image
                  source={{
                    uri: comentario.usuario_c.imagem,
                  }}
                  className="size-8 rounded-full"
                  resizeMode="cover"
                />
              </>
            )}
            {comentario.usuario_c.imagem === null && (
              <>
                <Image
                  source={require('../../public/images/avatars/default.png')}
                  className="size-8 rounded-full"
                  resizeMode="cover"
                />
              </>
            )}
            <View>
              <Text className="font-semibold">{comentario.usuario_c.nome}</Text>
              <Text style={styles.itemText}>{comentario.descricao}</Text>
            </View>
          </View>
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
