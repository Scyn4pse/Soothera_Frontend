import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface SearchBarWithBackProps {
  onBack?: () => void;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export function SearchBarWithBack({ 
  onBack, 
  placeholder = "Search Services...",
  value,
  onChangeText
}: SearchBarWithBackProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View className="flex-row items-center px-5 py-2 mb-4">
      {/* Back Button */}
      <TouchableOpacity 
        onPress={onBack}
        className="mr-3"
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      {/* Search Bar */}
      <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-1">
        <Ionicons name="search-outline" size={20} color={colors.icon} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.icon}
          value={value}
          onChangeText={onChangeText}
          className="flex-1 ml-2 text-base"
          style={{ color: colors.text }}
        />
      </View>
    </View>
  );
}
