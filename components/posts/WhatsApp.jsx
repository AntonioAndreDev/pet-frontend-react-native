import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Linking, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function WhatsApp({ numero, nome, tipo_post }) {
  const messages = {
    Perdido: `Olá ${nome}, vi seu post de animal perdido no Petly e gostaria de ajudar.`,
    Adoção: `Olá ${nome}, vi seu post de adoção no Petly e tenho interesse.`,
    Adotado: `Olá ${nome}, vi que o animal foi adotado no Petly, parabéns!`,
    Encontrado: `Olá ${nome}, vi que encontrou o seu animal no Petly, que bom!`,
    Padrão: `Olá ${nome}, vim pelo Petly!`,
  };

  const handleWhatsApp = () => {
    if (!numero) {
      Alert.alert('Número inválido', 'Número de telefone não fornecido.');
      return;
    }

    const phone = numero.replace(/\D/g, '');
    const message = encodeURIComponent(messages[tipo_post] || messages.Padrão);
    const url = `https://wa.me/55${phone}?text=${message}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
        }
      })
      .catch(() => Alert.alert('Erro', 'Ocorreu um erro ao tentar abrir o WhatsApp.'));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleWhatsApp}>
        <FontAwesome name="whatsapp" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
