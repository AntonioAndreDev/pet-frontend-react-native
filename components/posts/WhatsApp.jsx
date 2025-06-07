import { Linking, Text, View } from 'react-native';

export default function WhatsApp({ numero, nome, tipo_post }) {
  const messages = {
    Perdido: `Olá ${nome}, vi seu post de animal perdido no Petly e gostaria de ajudar.`,
    Adoção: `Olá ${nome}, vi seu post de adoção no Petly e tenho interesse.`,
    Adotado: `Olá ${nome}, vi que o animal foi adotado no Petly, parabéns!`,
    Encontrado: `Olá ${nome}, vi que encontrou o seu animal no Petly, que bom!`,
    Padrão: `Olá ${nome}, vim pelo Petly!`,
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Text
        className="text-lg font-bold"
        onPress={() => {
          const phone = numero.replace(/\D/g, '');
          const message = encodeURIComponent(messages[tipo_post] || messages.Padrão);
          const url = `https://wa.me/55${phone}?text=${message}`;
          Linking.openURL(url);
        }}>
        WhatsApp
      </Text>
    </View>
  );
}
