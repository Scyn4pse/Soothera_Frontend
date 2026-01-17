import React from 'react';
import { View } from 'react-native';
import { SearchBarWithBack } from './components/SearchBarWithBack';
import { SalonCardsList } from './components/SalonCardsList';
import { topRatedSalons } from './configs/mockData';

interface TopRatedSalonsScreenProps {
  onBack?: () => void;
  onSalonPress?: (salonId: string) => void;
  autoOpenFilter?: boolean;
}

export default function TopRatedSalonsScreen({ onBack, onSalonPress, autoOpenFilter = false }: TopRatedSalonsScreenProps = {}) {
  return (
    <View className="flex-1 bg-white">
      {/* Search Bar with Back Button */}
      <SearchBarWithBack 
        onBack={onBack} 
        placeholder="Search Salons..." 
        autoFocus={true}
        autoOpenFilter={autoOpenFilter}
      />

      {/* All Salons in Card View - Single Column */}
      <SalonCardsList 
        salons={topRatedSalons}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        onSalonPress={onSalonPress}
      />
    </View>
  );
}
