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
import PaymentSuccessfulScreen from './PaymentSuccessfulScreen.native';
import PaymentFailedScreen from './PaymentFailedScreen.native';
import NotificationsScreen from '../Notifications/NotificationsScreen.native';
import { getSalonDetails } from './configs/mockData';
import { Service } from './types/Home';
import { SalonDetails, Therapist } from './types/SalonDetails';

interface BookingData {
  service: Service | null;
  duration: string;
  addOns: Array<{ id: string; name: string; price: number }>;
  therapist: Therapist | null;
  date: Date;
  time: Date;
  instructions: string;
  promoCode: string;
  salonDetails: SalonDetails;
  totalPrice: number;
}

interface HomeScreenProps {
  onServicesScreenChange?: (isActive: boolean) => void;
  onTopRatedSalonsScreenChange?: (isActive: boolean) => void;
  onSalonDetailsScreenChange?: (isActive: boolean) => void;
  onBookAppointmentScreenChange?: (isActive: boolean) => void;
  onNotificationsScreenChange?: (isActive: boolean) => void;
  onNavigateToProfile?: () => void;
}

export default function HomeScreen({ onServicesScreenChange, onTopRatedSalonsScreenChange, onSalonDetailsScreenChange, onBookAppointmentScreenChange, onNotificationsScreenChange, onNavigateToProfile }: HomeScreenProps = {}) {
  const [showServicesScreen, setShowServicesScreen] = useState(false);
  const [showTopRatedSalonsScreen, setShowTopRatedSalonsScreen] = useState(false);
  const [autoOpenFilterModal, setAutoOpenFilterModal] = useState(false);
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);
  const [showBookAppointmentScreen, setShowBookAppointmentScreen] = useState(false);
  const [showPaymentSuccessfulScreen, setShowPaymentSuccessfulScreen] = useState(false);
  const [showPaymentFailedScreen, setShowPaymentFailedScreen] = useState(false);
  const [showNotificationsScreen, setShowNotificationsScreen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

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

  // Notify parent when notifications screen state changes
  useEffect(() => {
    onNotificationsScreenChange?.(showNotificationsScreen);
  }, [showNotificationsScreen, onNotificationsScreenChange]);

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

  // Handle payment success
  const handlePaymentSuccess = (data: BookingData) => {
    setBookingData(data);
    setShowBookAppointmentScreen(false);
    setShowPaymentSuccessfulScreen(true);
  };

  // Handle back from payment successful screen
  const handleBackFromPaymentSuccessful = () => {
    setShowPaymentSuccessfulScreen(false);
    setBookingData(null);
  };

  // Handle home from payment successful screen - temporarily navigate to payment failed screen
  const handleHomeFromPaymentSuccessful = () => {
    setShowPaymentSuccessfulScreen(false);
    setShowPaymentFailedScreen(true);
    // Keep bookingData for the failed screen
  };

  // Handle back from payment failed screen
  const handleBackFromPaymentFailed = () => {
    setShowPaymentFailedScreen(false);
    setBookingData(null);
  };

  // Handle try again from payment failed screen
  const handleTryAgainFromPaymentFailed = () => {
    setShowPaymentFailedScreen(false);
    // Navigate back to booking screen
    if (selectedSalonId) {
      setShowBookAppointmentScreen(true);
    }
  };

  // Handle back from notifications screen
  const handleBackFromNotifications = () => {
    setShowNotificationsScreen(false);
  };

  // If payment failed screen is active, show payment failed screen
  if (showPaymentFailedScreen && bookingData) {
    return (
      <PaymentFailedScreen
        bookingData={bookingData}
        onBack={handleBackFromPaymentFailed}
        onTryAgain={handleTryAgainFromPaymentFailed}
      />
    );
  }

  // If payment successful screen is active, show payment successful screen
  if (showPaymentSuccessfulScreen && bookingData) {
    return (
      <PaymentSuccessfulScreen
        bookingData={bookingData}
        onBack={handleBackFromPaymentSuccessful}
        onHome={handleHomeFromPaymentSuccessful}
      />
    );
  }

  // If book appointment screen is active, show book appointment screen
  if (showBookAppointmentScreen && selectedSalonId) {
    const salonDetails = getSalonDetails(selectedSalonId);
    if (salonDetails) {
      return (
        <BookAppointmentScreen
          salonDetails={salonDetails}
          onBack={handleBackFromBookAppointment}
          onComplete={handleBookAppointmentComplete}
          onPaymentSuccess={handlePaymentSuccess}
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
    return (
      <ServicesScreen
        onBack={() => setShowServicesScreen(false)}
        onServicePress={() => {
          setShowServicesScreen(false);
          setShowTopRatedSalonsScreen(true);
          setAutoOpenFilterModal(false);
        }}
      />
    );
  }

  // If top rated salons screen is active, show top rated salons screen
  if (showTopRatedSalonsScreen) {
    return (
      <TopRatedSalonsScreen 
        onBack={() => {
          setShowTopRatedSalonsScreen(false);
          setAutoOpenFilterModal(false);
        }}
        onSalonPress={handleSalonPress}
        autoOpenFilter={autoOpenFilterModal}
      />
    );
  }

  // If notifications screen is active, show notifications screen
  if (showNotificationsScreen) {
    return <NotificationsScreen onBack={handleBackFromNotifications} />;
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <Header 
          onProfilePress={onNavigateToProfile}
          onNotificationPress={() => setShowNotificationsScreen(true)}
        />

        {/* Search Bar and Filter */}
        <SearchBar 
          onPress={() => setShowTopRatedSalonsScreen(true)} 
          onFilterPress={() => {
            setAutoOpenFilterModal(true);
            setShowTopRatedSalonsScreen(true);
          }}
        />

        {/* Special Deals Section */}
        <SpecialDeals />

        {/* Services Section */}
        <Services
          onSeeAll={() => setShowServicesScreen(true)}
          onServicePress={() => {
            setAutoOpenFilterModal(false);
            setShowTopRatedSalonsScreen(true);
          }}
        />

        {/* Top Rated Salons Section */}
        <TopRatedSalons 
          onSeeAll={() => setShowTopRatedSalonsScreen(true)}
          onSalonPress={handleSalonPress}
        />
      </ScrollView>
    </View>
  );
}
