import { SafeAreaView, Text } from 'react-native';

import ImageCarousel from './ImageCarousel';
import User from './User';

export default function Post() {
  return (
    <SafeAreaView>
      <Text>Post</Text>
      <User />
      <ImageCarousel />
    </SafeAreaView>
  );
}
