import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { Service } from '../types/Home';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, primaryColor } from '@/constants/theme';

interface ServiceCardsGridProps {
  services: Service[];
  contentContainerStyle?: object;
  onServicePress?: (service: Service) => void;
}

export function ServiceCardsGrid({ services, contentContainerStyle, onServicePress }: ServiceCardsGridProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Split services into two columns for masonry layout
  const column1: Service[] = [];
  const column2: Service[] = [];

  services.forEach((service, index) => {
    if (index % 2 === 0) {
      column1.push(service);
    } else {
      column2.push(service);
    }
  });

  const renderServiceCard = (service: Service) => (
    <TouchableOpacity
      key={service.id}
      className="mb-4"
      activeOpacity={0.7}
      onPress={() => onServicePress?.(service)}
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
          <View className="flex-row flex-wrap" style={{ gap: 4 }}>
            {service.duration.map((duration, index) => (
              <View
                key={index}
                className="px-2 py-1 rounded-full mb-1"
                style={{ 
                  backgroundColor: colors.primary + '20',
                  flexShrink: 1,
                }}
              >
                <Text 
                  className="text-xs font-medium" 
                  style={{ color: colors.primary }}
                  numberOfLines={1}
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
    <ScrollView 
      className="flex-1" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
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
  );
}
