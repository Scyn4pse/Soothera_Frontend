import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export function SearchBar() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View className="flex-row items-center px-5 py-2 mb-4">
      <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-1 mr-3">
        <Ionicons name="search-outline" size={20} color={colors.icon} />
        <TextInput
          placeholder="Search Salon, Specialist..."
          placeholderTextColor={colors.icon}
          className="flex-1 ml-2 text-base"
          style={{ color: colors.text }}
        />
      </View>
      <TouchableOpacity
        className="w-12 h-12 rounded-xl items-center justify-center"
        style={{ backgroundColor: primaryColor }}
      >
        <Ionicons name="options-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
