import { SafeAreaView, Text, View } from 'react-native';

import Post from '../../components/posts/Post';

export default function Home() {
  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 16 }}>
        <Text>Home</Text>
        <Post />
      </View>
    </SafeAreaView>
  );
}
