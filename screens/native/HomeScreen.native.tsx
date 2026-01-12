import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#151718]">
      <View className="flex-1 p-5 justify-center items-center">
        <Text className="text-[32px] font-bold mb-2 text-center dark:text-[#ECEDEE]" style={{ color: colors.text }}>
          Welcome to Soothera
        </Text>
        <Text className="text-lg mb-8 text-center dark:text-[#9BA1A6]" style={{ color: colors.icon }}>
          Home Screen
        </Text>
        <View className="bg-gray-100 dark:bg-[#2a2a2a] p-5 rounded-xl w-full max-w-[300px]">
          <Text className="text-base text-center leading-6 dark:text-[#ECEDEE]" style={{ color: colors.text }}>
            This is your home screen. Navigate using the bottom tabs.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
