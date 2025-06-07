import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function TipoOptions({ tipoAtual, setTipo, tipoOriginal }) {
  const getOptions = () => {
    switch (tipoOriginal) {
      case 'Perdido':
        return ['Encontrado', 'Adoção', 'Padrão'];
      case 'Adoção':
        return ['Adotado', 'Perdido', 'Padrão'];
      case 'Adotado':
        return ['Adoção', 'Perdido', 'Padrão'];
      case 'Encontrado':
        return ['Perdido', 'Adoção', 'Padrão'];
      case 'Padrão':
        return ['Adoção', 'Perdido'];
      default:
        return ['Adoção', 'Perdido'];
    }
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {getOptions().map((tipo) => (
        <TouchableOpacity
          key={tipo}
          onPress={() => setTipo(tipo)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            marginRight: 8,
            marginBottom: 8,
            borderRadius: 8,
            backgroundColor: tipoAtual === tipo ? '#2563eb' : '#e5e7eb',
          }}>
          <Text style={{ color: tipoAtual === tipo ? '#fff' : '#111827' }}>{tipo}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
