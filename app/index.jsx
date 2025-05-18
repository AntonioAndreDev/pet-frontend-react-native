import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

import { useAuthStore } from './stores/authentication/useAuthStore';

export default function Index() {
  const { isLogged } = useAuthStore();

  if (isLogged === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redireciona com base no login
  return isLogged ? <Redirect href="/(app)/home" /> : <Redirect href="/(auth)/login" />;
}
