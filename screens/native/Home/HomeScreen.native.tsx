import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Header } from '@/components/native/Header';
import { SearchBar } from './components/SearchBar';
import { SpecialDeals } from './components/SpecialDeals';
import { Services } from './components/Services';
import { TopRatedSalons } from './components/TopRatedSalons';
import ServicesScreen from './ServicesScreen.native';

interface HomeScreenProps {
  onServicesScreenChange?: (isActive: boolean) => void;
}

export default function HomeScreen({ onServicesScreenChange }: HomeScreenProps = {}) {
  const [showServicesScreen, setShowServicesScreen] = useState(false);

  // Notify parent when services screen state changes
  useEffect(() => {
    onServicesScreenChange?.(showServicesScreen);
  }, [showServicesScreen, onServicesScreenChange]);

  // If services screen is active, show services screen
  if (showServicesScreen) {
    return <ServicesScreen onBack={() => setShowServicesScreen(false)} />;
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <Header />

        {/* Search Bar and Filter */}
        <SearchBar />

        {/* Special Deals Section */}
        <SpecialDeals />

        {/* Services Section */}
        <Services onSeeAll={() => setShowServicesScreen(true)} />

        {/* Top Rated Salons Section */}
        <TopRatedSalons />
      </ScrollView>
    </View>
  );
}
