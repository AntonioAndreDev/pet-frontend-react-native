import { Image, Text, View } from 'react-native';

export default function User() {
  return (
    <View className="flex flex-row items-center gap-2">
      <Image
        className="size-8 rounded-full"
        source={require('../../public/images/avatars/default.png')} // Caminho para a imagem
      />
      <Text>
        <Text className="text-gray-500">@antonio_andre03</Text>
      </Text>
    </View>
  );
}
