import { View } from 'react-native';

export function renderItem({ rounded }) {
  return ({ item, index }) => (
    <View
      key={index}
      style={{
        backgroundColor: item,
        borderRadius: rounded ? 10 : 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
