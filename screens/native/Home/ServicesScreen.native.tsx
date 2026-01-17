import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { SearchBarWithBack } from './components/SearchBarWithBack';
import { services } from './configs/mockData';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface ServicesScreenProps {
  onBack?: () => void;
}

export default function ServicesScreen({ onBack }: ServicesScreenProps = {}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View className="flex-1 bg-white">
      {/* Search Bar with Back Button */}
      <SearchBarWithBack onBack={onBack} />

      {/* All Services in Card View */}
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      >
        <View className="flex-row flex-wrap justify-between">
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              className="w-[48%] mb-4"
              activeOpacity={0.7}
            >
              <View 
                className="rounded-xl overflow-hidden mb-2 bg-gray-100"
                style={{ 
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}
              >
                <Image
                  source={service.image}
                  className="w-full h-32"
                  resizeMode="cover"
                />
              </View>
              <Text 
                className="text-base font-medium text-center" 
                style={{ color: colors.text }}
              >
                {service.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
