import React from 'react';
import { View } from 'react-native';
import { SearchBarWithBack } from './components/SearchBarWithBack';
import { ServiceCardsGrid } from './components/ServiceCardsGrid';
import { services } from './configs/mockData';
import { Service } from './types/Home';

interface ServicesScreenProps {
  onBack?: () => void;
  onServicePress?: (service: Service) => void;
}

export default function ServicesScreen({ onBack, onServicePress }: ServicesScreenProps = {}) {
  return (
    <View className="flex-1 bg-white">
      {/* Search Bar with Back Button */}
      <SearchBarWithBack
        onBack={onBack}
        placeholder="Search Services..."
        enableFilters={false}
      />

      {/* All Services in Card View - Masonry Layout */}
      <ServiceCardsGrid 
        services={services}
        onServicePress={onServicePress}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      />
    </View>
  );
}
