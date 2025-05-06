import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function AppLayout() {
  return (
    <SafeAreaView>
      <Slot />
    </SafeAreaView>
  );
}
