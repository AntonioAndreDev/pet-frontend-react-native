import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

export default function Loading() {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(254, 240, 138, 0.8)',
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FontAwesome
        className="animate-spin"
        name="spinner"
        size={36}
        color="#334155"
        style={{ transform: [{ rotate: '45deg' }] }}
      />
    </View>
  );
}
