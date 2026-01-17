import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { topRatedSalons } from '../configs/mockData';

export function TopRatedSalons() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View className="mb-6 pb-6">
      <View className="flex-row items-center justify-between px-5 mb-4">
        <Text className="text-xl font-bold" style={{ color: colors.text }}>
          Top Rated Salons
        </Text>
        <TouchableOpacity>
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
        {topRatedSalons.map((salon) => (
          <View key={salon.id} className="w-56 mr-4">
            <View className="relative rounded-2xl overflow-hidden mb-2">
              <Image
                source={salon.image}
                className="w-full h-40"
                resizeMode="cover"
              />
              <View className="absolute bottom-2 right-2 flex-row items-center bg-black/60 px-2 py-1 rounded-full">
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text className="text-white text-sm font-semibold ml-1">{salon.rating}</Text>
              </View>
            </View>
            <View>
              <Text className="text-base font-semibold mb-1" style={{ color: colors.text }}>
                {salon.name}
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="location" size={14} color={colors.icon} />
                <Text className="text-sm ml-1" style={{ color: colors.icon }}>
                  {salon.location}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
