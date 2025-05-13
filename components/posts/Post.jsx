import { SafeAreaView, Text } from 'react-native';

import ImageCarousel from './ImageCarousel';
import User from './User';

export default function Post({ posts }) {
  return (
    <SafeAreaView>
      <User />
      <Text>{posts.titulo}</Text>
      <Text>{posts.descricao}</Text>
      <ImageCarousel />
    </SafeAreaView>
  );
}
