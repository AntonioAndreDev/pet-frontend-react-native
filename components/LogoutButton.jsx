import { TouchableOpacity, Text, View } from 'react-native';

import { useAuthStore } from '../app/stores/authentication/useAuthStore';

export default function LogoutButton() {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <View className="mt-4 w-full flex-1 items-center justify-center">
      <TouchableOpacity
        onPress={handleLogout}
        className="w-full rounded-md bg-red-600 px-6 py-3"
        activeOpacity={0.7}>
        <Text className="text-center text-lg font-semibold text-white">Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}
