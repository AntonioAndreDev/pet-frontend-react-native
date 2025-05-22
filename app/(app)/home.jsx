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
    <SafeAreaView className="flex-1 bg-white">
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          zIndex: 10,
          height: 82,
          backgroundColor: '#facc15',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: 40,
          paddingHorizontal: 16,
        }}>
        <Text className="text-slate-700" style={{ fontSize: 18, fontWeight: 'bold' }}>
          Pet
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 52 }}>
        <View>
          {posts.map((post) => (
            <View key={post.id_post} style={{ marginBottom: 20 }}>
              <Post post={post} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
