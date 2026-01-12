import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#151718]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-5">
          <Text className="text-[32px] font-bold mb-2 dark:text-[#ECEDEE]" style={{ color: colors.text }}>
            Explore
          </Text>
          <Text className="text-lg mb-6 dark:text-[#9BA1A6]" style={{ color: colors.icon }}>
            Discover new content
          </Text>
          
          <View className="p-5 rounded-xl mb-4 bg-gray-100 dark:bg-[#2a2a2a]">
            <Text className="text-xl font-semibold mb-2 dark:text-[#ECEDEE]" style={{ color: colors.text }}>
              Feature 1
            </Text>
            <Text className="text-base leading-6 dark:text-[#9BA1A6]" style={{ color: colors.icon }}>
              Explore amazing features and content in this section.
            </Text>
          </View>

          <View className="p-5 rounded-xl mb-4 bg-gray-100 dark:bg-[#2a2a2a]">
            <Text className="text-xl font-semibold mb-2 dark:text-[#ECEDEE]" style={{ color: colors.text }}>
              Feature 2
            </Text>
            <Text className="text-base leading-6 dark:text-[#9BA1A6]" style={{ color: colors.icon }}>
              Discover new possibilities and expand your horizons.
            </Text>
          </View>

          <View className="p-5 rounded-xl mb-4 bg-gray-100 dark:bg-[#2a2a2a]">
            <Text className="text-xl font-semibold mb-2 dark:text-[#ECEDEE]" style={{ color: colors.text }}>
              Feature 3
            </Text>
            <Text className="text-base leading-6 dark:text-[#9BA1A6]" style={{ color: colors.icon }}>
              Navigate through different sections using the bottom navigation.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
