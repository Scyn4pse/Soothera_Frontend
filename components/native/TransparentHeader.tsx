import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TransparentHeaderProps {
  onBack: () => void;
  title?: string;
}

export function TransparentHeader({ onBack, title }: TransparentHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View 
      className="absolute left-0 right-0 flex-row items-center px-5 py-4"
      style={{ 
        backgroundColor: 'transparent',
        top: 0,
        paddingTop: insets.top,
      }}
    >
      <TouchableOpacity 
        onPress={onBack} 
        className="w-10 h-10 items-center justify-center rounded-full mr-3"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      {title && (
        <Text className="text-lg font-semibold" style={{ color: 'white' }}>
          {title}
        </Text>
      )}
    </View>
  );
}
