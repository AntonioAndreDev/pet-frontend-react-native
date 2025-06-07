import { Text } from 'react-native';

export default function Tipo({ tipo }) {
  if (tipo.toLowerCase() === 'adoção') {
    return <Text className="text-xs font-bold uppercase text-green-500">Adoção</Text>;
  } else if (tipo.toLowerCase() === 'perdido') {
    return <Text className="text-xs font-bold uppercase text-red-500">Perdido</Text>;
  } else if (tipo.toLowerCase() === 'adotado') {
    return <Text className="text-xs font-bold uppercase text-amber-500">Pet adotado!</Text>;
  } else if (tipo.toLowerCase() === 'encontrado') {
    return <Text className="text-xs font-bold uppercase text-blue-500">Pet encontrado!</Text>;
  } else if (tipo.toLowerCase() === 'padrão') {
    return <Text className="text-xs font-bold uppercase text-pink-500">Petly ❤️</Text>;
  }
  return null;
}
