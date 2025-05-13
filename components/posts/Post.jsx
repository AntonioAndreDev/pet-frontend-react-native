import { Image, SafeAreaView, Text, View } from 'react-native';

import ImageCarousel from './ImageCarousel';

export default function Post({ post }) {
  return (
    <SafeAreaView>
      <View className="flex flex-row items-center gap-2">
        <Image
          className="size-8 rounded-full"
          source={
            post.usuario_p?.imagem
              ? { uri: post.usuario_p.imagem }
              : require('../../public/images/avatars/default.png')
          }
        />
        <Text className="font-semibold lowercase text-gray-700">
          {post.usuario_p?.nome || 'usuário'}
        </Text>
      </View>
      <ImageCarousel image={post.imagem} />
      <Text className="mb-1 text-xl font-semibold">{post.titulo}</Text>
      <View className="flex flex-row">
        <Text className="lowercase text-gray-800">
          <Text className="font-bold">@{post.usuario_p?.nome}</Text> {post.descricao}
        </Text>
      </View>
    </SafeAreaView>
  );
}
