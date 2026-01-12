import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#151718]">
      <View className="flex-1 p-5 items-center">
        <View
          className="w-[100px] h-[100px] rounded-full justify-center items-center mb-4"
          style={{ backgroundColor: colors.tint }}
        >
          <Text className="text-[40px] font-bold text-white">U</Text>
        </View>
        <Text className="text-[28px] font-bold mb-1 dark:text-[#ECEDEE]" style={{ color: colors.text }}>
          User Profile
        </Text>
        <Text className="text-base mb-8 dark:text-[#9BA1A6]" style={{ color: colors.icon }}>
          profile@soothera.com
        </Text>
        
        <View className="w-full max-w-[400px]">
          <View className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-[#2a2a2a]">
            <Text className="text-base dark:text-[#9BA1A6]" style={{ color: colors.icon }}>
              Name
            </Text>
            <Text className="text-base font-medium dark:text-[#ECEDEE]" style={{ color: colors.text }}>
              John Doe
            </Text>
          </View>
          <View className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-[#2a2a2a]">
            <Text className="text-base dark:text-[#9BA1A6]" style={{ color: colors.icon }}>
              Member Since
            </Text>
            <Text className="text-base font-medium dark:text-[#ECEDEE]" style={{ color: colors.text }}>
              January 2024
            </Text>
          </View>
          <View className="flex-row justify-between items-center py-4">
            <Text className="text-base dark:text-[#9BA1A6]" style={{ color: colors.icon }}>
              Settings
            </Text>
            <Text className="text-base font-medium" style={{ color: colors.tint }}>
              Manage
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
