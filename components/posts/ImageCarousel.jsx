import * as React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

function ImageCarousel({ image }) {
  console.log('ImageCarousel - imagem recebida:', image);

  if (typeof image === 'string') {
    return (
      <View className="my-2">
        <View className="h-[250px] w-[calc(100%-32px)] overflow-hidden rounded-lg">
          <Image source={{ uri: image }} className="h-full w-full" resizeMode="cover" />
        </View>
      </View>
    );
  }

  return null;
}

export default ImageCarousel;
