import * as React from 'react';
import { useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

function ImageCarousel({ image }) {
  console.log('ImageCarousel - imagem recebida:', image);
  const [loading, setLoading] = useState(true);

  if (typeof image === 'string') {
    return (
      <View className="my-2">
        <View className="h-[250px] w-[calc(100%-32px)] overflow-hidden rounded-lg">
          {loading && (
            <View className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-white">
              <ActivityIndicator size="large" color="#0000ff" style={{ alignSelf: 'center' }} />
            </View>
          )}
          <Image
            source={{ uri: image }}
            className="h-full w-full"
            resizeMode="cover"
            onLoadEnd={() => setLoading(false)}
          />
        </View>
      </View>
    );
  }

  return null;
}

export default ImageCarousel;
