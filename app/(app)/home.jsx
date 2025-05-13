import { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import Post from '../../components/posts/Post';
import { usePostsStore } from '../stores/posts/usePostsStore';

export default function Home() {
  const { posts, getPosts, isLoading, error } = usePostsStore();

  useEffect(() => {
    getPosts();
  }, []);

  if (isLoading)
    return (
      <SafeAreaView>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  if (error)
    return (
      <SafeAreaView>
        <Text>Erro: {error}</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Text>Home</Text>
        <View>
          {posts.map((post) => (
            <View key={post.id_post} style={{ marginBottom: 30 }}>
              <Post post={post} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
