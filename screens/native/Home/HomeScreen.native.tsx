import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Header } from '@/components/native/Header';
import { SearchBar } from './components/Home/SearchBar';
import { SpecialDeals } from './components/Home/SpecialDeals';
import { Services } from './components/Home/Services';
import { TopRatedSalons } from './components/Home/TopRatedSalons';
import ServicesScreen from './ServicesScreen.native';
import TopRatedSalonsScreen from './TopRatedSalonsScreen.native';
import SalonDetailsScreen from './SalonDetailsScreen.native';
import BookAppointmentScreen from './BookAppointmentScreen.native';
import { getSalonDetails } from './configs/mockData';

interface HomeScreenProps {
  onServicesScreenChange?: (isActive: boolean) => void;
  onTopRatedSalonsScreenChange?: (isActive: boolean) => void;
  onSalonDetailsScreenChange?: (isActive: boolean) => void;
  onBookAppointmentScreenChange?: (isActive: boolean) => void;
}

export default function HomeScreen({ onServicesScreenChange, onTopRatedSalonsScreenChange, onSalonDetailsScreenChange, onBookAppointmentScreenChange }: HomeScreenProps = {}) {
  const [showServicesScreen, setShowServicesScreen] = useState(false);
  const [showTopRatedSalonsScreen, setShowTopRatedSalonsScreen] = useState(false);
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);
  const [showBookAppointmentScreen, setShowBookAppointmentScreen] = useState(false);

  // Notify parent when services screen state changes
  useEffect(() => {
    onServicesScreenChange?.(showServicesScreen);
  }, [showServicesScreen, onServicesScreenChange]);

  // Notify parent when top rated salons screen state changes
  useEffect(() => {
    onTopRatedSalonsScreenChange?.(showTopRatedSalonsScreen);
  }, [showTopRatedSalonsScreen, onTopRatedSalonsScreenChange]);

  // Notify parent when salon details screen state changes
  useEffect(() => {
    onSalonDetailsScreenChange?.(selectedSalonId !== null);
  }, [selectedSalonId, onSalonDetailsScreenChange]);

  // Notify parent when book appointment screen state changes
  useEffect(() => {
    onBookAppointmentScreenChange?.(showBookAppointmentScreen);
  }, [showBookAppointmentScreen, onBookAppointmentScreenChange]);

  // Handle salon press
  const handleSalonPress = (salonId: string) => {
    setSelectedSalonId(salonId);
  };

  // Handle back from salon details
  const handleBackFromSalonDetails = () => {
    setSelectedSalonId(null);
  };

  // Handle back from book appointment
  const handleBackFromBookAppointment = () => {
    setShowBookAppointmentScreen(false);
  };

  // Handle book appointment completion
  const handleBookAppointmentComplete = () => {
    setShowBookAppointmentScreen(false);
    // TODO: Navigate to bookings screen or show success message
    console.log('Booking completed');
  };

  // If book appointment screen is active, show book appointment screen
  if (showBookAppointmentScreen && selectedSalonId) {
    const salonDetails = getSalonDetails(selectedSalonId);
    if (salonDetails) {
      return (
        <BookAppointmentScreen
          salonDetails={salonDetails}
          onBack={handleBackFromBookAppointment}
          onComplete={handleBookAppointmentComplete}
        />
      );
    }
  }

  // If salon details screen is active, show salon details screen
  if (selectedSalonId) {
    const salonDetails = getSalonDetails(selectedSalonId);
    if (salonDetails) {
      return (
        <SalonDetailsScreen
          salonDetails={salonDetails}
          onBack={handleBackFromSalonDetails}
          onBookAppointment={() => {
            setShowBookAppointmentScreen(true);
          }}
        />
      );
    }
  }

  // If services screen is active, show services screen
  if (showServicesScreen) {
    return <ServicesScreen onBack={() => setShowServicesScreen(false)} />;
  }

  // If top rated salons screen is active, show top rated salons screen
  if (showTopRatedSalonsScreen) {
    return (
      <TopRatedSalonsScreen 
        onBack={() => setShowTopRatedSalonsScreen(false)}
        onSalonPress={handleSalonPress}
      />
    );
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
        <TopRatedSalons 
          onSeeAll={() => setShowTopRatedSalonsScreen(true)}
          onSalonPress={handleSalonPress}
        />
      </ScrollView>
    </View>
  );
}
