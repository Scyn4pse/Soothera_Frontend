import React from 'react';
import { View } from 'react-native';
import { SearchBarWithBack } from './components/SearchBarWithBack';
import { ServiceCardsGrid } from './components/ServiceCardsGrid';
import { services } from './configs/mockData';

interface ServicesScreenProps {
  onBack?: () => void;
}

export default function ServicesScreen({ onBack }: ServicesScreenProps = {}) {
  return (
    <View className="flex-1 bg-white">
      {/* Search Bar with Back Button */}
      <SearchBarWithBack onBack={onBack} />

      {/* All Services in Card View - Masonry Layout */}
      <ServiceCardsGrid 
        services={services}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      />
    </View>
  );
}
