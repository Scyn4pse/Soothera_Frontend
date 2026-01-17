import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { SearchBarWithBack } from './components/SearchBarWithBack';
import { services } from './configs/mockData';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, primaryColor } from '@/constants/theme';

interface ServicesScreenProps {
  onBack?: () => void;
}

export default function ServicesScreen({ onBack }: ServicesScreenProps = {}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Split services into two columns for masonry layout
  const column1: typeof services = [];
  const column2: typeof services = [];

  services.forEach((service, index) => {
    if (index % 2 === 0) {
      column1.push(service);
    } else {
      column2.push(service);
    }
  });

  const renderServiceCard = (service: typeof services[0]) => (
    <TouchableOpacity
      key={service.id}
      className="mb-4"
      activeOpacity={0.7}
    >
      <View 
        className="rounded-xl overflow-hidden bg-white"
        style={{ 
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        {/* Service Image */}
        <View className="relative">
          <Image
            source={service.image}
            className="w-full h-40"
            resizeMode="cover"
          />
        </View>

        {/* Service Details */}
        <View className="p-3">
          {/* Service Name */}
          <Text 
            className="text-base font-semibold mb-1" 
            style={{ color: colors.text }}
            numberOfLines={2}
          >
            {service.name}
          </Text>

          {/* Price */}
          <Text 
            className="text-lg font-bold mb-1" 
            style={{ color: primaryColor }}
          >
            {formatPrice(service.price)}
          </Text>

          {/* Description */}
          <Text 
            className="text-xs mb-2" 
            style={{ color: colors.icon }}
            numberOfLines={2}
          >
            {service.description}
          </Text>

          {/* Duration Tags */}
          <View className="flex-row flex-wrap">
            {service.duration.map((duration, index) => (
              <View
                key={index}
                className="px-2 py-1 rounded-full mr-1 mb-1"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Text 
                  className="text-xs font-medium" 
                  style={{ color: colors.primary }}
                >
                  {duration}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Search Bar with Back Button */}
      <SearchBarWithBack onBack={onBack} />

      {/* All Services in Card View - Masonry Layout */}
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      >
        <View className="flex-row" style={{ gap: 12 }}>
          {/* Column 1 */}
          <View className="flex-1">
            {column1.map((service) => renderServiceCard(service))}
          </View>

          {/* Column 2 */}
          <View className="flex-1">
            {column2.map((service) => renderServiceCard(service))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
