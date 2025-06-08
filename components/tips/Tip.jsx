import { useState } from 'react';
import { Image, Text, View, StyleSheet, ActivityIndicator } from 'react-native';

export default function Tip({ tip }) {
  const [loading, setLoading] = useState(true);

  return (
    <View>
      <View className="rounded-lg bg-white px-4 py-4">
        {loading && (
          <View className="absolute inset-0 z-10 flex items-center justify-center bg-white">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <Image
          onLoadEnd={() => setLoading(false)}
          style={styles.avatar}
          source={
            tip.usuario_d?.imagem
              ? {
                  uri: `http://${process.env.EXPO_PUBLIC_IP}:3000/${tip.usuario_d.imagem.replace('src/', '')}`,
                }
              : require('../../public/images/avatars/default.png')
          }
        />

        <Text style={styles.title}>{tip.titulo}</Text>
        <Text style={styles.description}>{tip.descricao}</Text>

        {tip.imagem && (
          <Image style={styles.tipImage} source={{ uri: tip.imagem }} resizeMode="cover" />
        )}

        <Text style={styles.postedBy}>Postado por: {tip.usuario_d?.nome}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 24,
    marginBottom: 8,
  },
  tipImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  postedBy: {
    marginTop: 8,
    fontSize: 12,
    color: '#555',
  },
});
