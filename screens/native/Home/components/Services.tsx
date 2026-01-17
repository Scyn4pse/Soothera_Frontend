import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { services } from '../configs/mockData';

interface ServicesProps {
  onSeeAll?: () => void;
}

export function Services({ onSeeAll }: ServicesProps = {}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between px-5 mb-4">
        <Text className="text-xl font-bold" style={{ color: colors.text }}>
          Massage Services
        </Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text className="text-base font-medium" style={{ color: primaryColor }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {services.map((service) => (
          <View key={service.id} className="mr-4 items-center">
            <View className="w-24 h-24 rounded-xl overflow-hidden mb-2 bg-gray-100">
              <Image
                source={service.image}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-sm font-medium text-center" style={{ color: colors.text }}>
              {service.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
