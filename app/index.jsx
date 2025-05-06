import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = false;
      setIsLoggedIn(loggedIn);
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redireciona com base no login
  return isLoggedIn ? <Redirect href="/(app)/home" /> : <Redirect href="/(auth)/login" />;
}
