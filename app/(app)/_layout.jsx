import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="home"
            options={{
              title: 'Início',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="pets" color={color} size={size} />
              ),
            }}
            listeners={{
              tabPress: () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
              },
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Configurações',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="settings" color={color} size={size} />
              ),
            }}
            listeners={{
              tabPress: () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
              },
            }}
          />
        </Tabs>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
