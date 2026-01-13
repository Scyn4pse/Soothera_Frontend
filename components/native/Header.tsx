import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface HeaderProps {
  userName?: string;
  onNotificationPress?: () => void;
}

export const Header = ({ userName = 'John Doe', onNotificationPress }: HeaderProps) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View className="flex-row items-center justify-between px-5 pt-4 pb-4">
      {/* User Profile */}
      <View className="flex-row items-center">
        <Image
          source={require('../../assets/pfp.png')}
          className="w-10 h-10 rounded-full mr-3"
        />
        <Text className="text-base font-semibold" style={{ color: colors.text }}>
          {userName}
        </Text>
      </View>

      {/* Notification Icon */}
      <TouchableOpacity className="relative" onPress={onNotificationPress}>
        <Ionicons name="notifications-outline" size={24} color={colors.text} />
        <View className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
      </TouchableOpacity>
    </View>
  );
};
