import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/native/Header';
import { useConfirmation } from '@/components/native/ConfirmationModalContext';
import { 
  Booking,
  allBookings,
  getUpcomingBookings,
  getCompletedBookings,
  getCancelledBookings
} from './configs/mockBookingsData';
import BookingCard from './components/BookingCard';
import TabNavigation from './components/TabNavigation';
import BookingDetailsScreen from './BookingDetailsScreen.native';
import RatingSpaScreen from './RatingSpaScreen.native';
import RatingTherapistScreen from './RatingTherapistScreen.native';
import ReviewChoiceModal from './components/ReviewChoiceModal';
import { getBookingDetails } from './configs/mockBookingDetailsData';
import BookAppointmentScreen from '../Home/BookAppointmentScreen.native';
import PaymentSuccessfulScreen from '../Home/PaymentSuccessfulScreen.native';
import PaymentFailedScreen from '../Home/PaymentFailedScreen.native';
import { getSalonDetails, topRatedSalons } from '../Home/configs/mockData';
import type { SalonDetails } from '../Home/types/SalonDetails';
import type { Service } from '../Home/types/Home';
import type { Therapist } from '../Home/types/SalonDetails';

interface AddOn {
  id: string;
  name: string;
  price: number;
}

interface BookingData {
  service: Service | null;
  duration: string;
  addOns: AddOn[];
  therapist: Therapist | null;
  date: Date;
  time: Date;
  instructions: string;
  promoCode: string;
  salonDetails: SalonDetails;
  totalPrice: number;
}

interface BookingsScreenProps {
  onDetailsScreenChange?: (isActive: boolean) => void;
  onNavigateToProfile?: () => void;
}

export default function BookingsScreen({ onDetailsScreenChange, onNavigateToProfile }: BookingsScreenProps = {}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { showConfirmation } = useConfirmation();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled' | 'all'>('all');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [showRatingScreen, setShowRatingScreen] = useState(false);
  const [ratingBookingId, setRatingBookingId] = useState<string | null>(null);
  const [showTherapistRatingScreen, setShowTherapistRatingScreen] = useState(false);
  const [therapistRatingBookingId, setTherapistRatingBookingId] = useState<string | null>(null);
  const [showReviewChoiceModal, setShowReviewChoiceModal] = useState(false);
  const [reviewBookingId, setReviewBookingId] = useState<string | null>(null);
  const [isFromReviewButton, setIsFromReviewButton] = useState(false);
  const [showBookAppointmentScreen, setShowBookAppointmentScreen] = useState(false);
  const [rebookSalonDetails, setRebookSalonDetails] = useState<SalonDetails | null>(null);
  const [showPaymentSuccessfulScreen, setShowPaymentSuccessfulScreen] = useState(false);
  const [showPaymentFailedScreen, setShowPaymentFailedScreen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  
  // Tab order for paging (All is first)
  const tabs: Array<'all' | 'upcoming' | 'completed' | 'cancelled'> = ['all', 'upcoming', 'completed', 'cancelled'];
  const pageScrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;
  
  // Handle page scroll to sync active tab
  const handlePageScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / screenWidth);
    if (pageIndex >= 0 && pageIndex < tabs.length) {
      setActiveTab(tabs[pageIndex]);
    }
  };
  
  // Handle tab press to scroll to corresponding page
  const handleTabPress = (tab: 'all' | 'upcoming' | 'completed' | 'cancelled') => {
    const tabIndex = tabs.indexOf(tab);
    if (tabIndex >= 0 && pageScrollViewRef.current) {
      pageScrollViewRef.current.scrollTo({
        x: tabIndex * screenWidth,
        animated: true,
      });
    }
    setActiveTab(tab);
  };

  // Helper function to sort bookings by date (most recent first)
  const sortBookingsByDate = (bookings: Booking[]): Booking[] => {
    // Sort by date (most recent first)
    // Date format is MM/DD/YYYY
    return [...bookings].sort((a, b) => {
      const parseDate = (dateStr: string): Date => {
        const [month, day, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
      };
      
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      
      // Most recent first (descending order)
      return dateB.getTime() - dateA.getTime();
    });
  };

  // Get all bookings sorted by date (most recent first)
  const getAllBookings = (): Booking[] => {
    return sortBookingsByDate(allBookings);
  };

  // Handle booking card press
  const handleBookingPress = (bookingId: string) => {
    setSelectedBookingId(bookingId);
  };

  // Handle back from details screen
  const handleBack = () => {
    setSelectedBookingId(null);
  };

  // Handle rate spa
  const handleRateSpa = () => {
    if (selectedBookingId) {
      setRatingBookingId(selectedBookingId);
      setShowRatingScreen(true);
      setIsFromReviewButton(false); // Coming from BookingDetailsScreen
    }
  };

  // Handle back from rating screen
  const handleBackFromRating = () => {
    setShowRatingScreen(false);
    setRatingBookingId(null);
    setIsFromReviewButton(false); // Reset flag
  };

  // Handle submit rating
  const handleSubmitRating = async (rating: number, review: string) => {
    // TODO: Implement API call to submit rating
    console.log('Submit rating:', ratingBookingId, rating, review);
    // After successful submission, the screen will navigate back automatically
  };

  // Handle rate therapist
  const handleRateTherapist = () => {
    if (selectedBookingId) {
      setTherapistRatingBookingId(selectedBookingId);
      setShowTherapistRatingScreen(true);
      setIsFromReviewButton(false); // Coming from BookingDetailsScreen
    }
  };

  // Handle back from therapist rating screen
  const handleBackFromTherapistRating = () => {
    setShowTherapistRatingScreen(false);
    setTherapistRatingBookingId(null);
    setIsFromReviewButton(false); // Reset flag
  };

  // Handle review button press from BookingCard
  const handleReviewPress = (bookingId: string) => {
    setReviewBookingId(bookingId);
    setShowReviewChoiceModal(true);
  };

  // Handle choose spa from review modal
  const handleChooseSpa = () => {
    if (reviewBookingId) {
      setShowReviewChoiceModal(false);
      setRatingBookingId(reviewBookingId);
      setShowRatingScreen(true);
      setIsFromReviewButton(true); // Track that we came from review button
      setReviewBookingId(null);
    }
  };

  // Handle choose therapist from review modal
  const handleChooseTherapist = () => {
    if (reviewBookingId) {
      setShowReviewChoiceModal(false);
      setTherapistRatingBookingId(reviewBookingId);
      setShowTherapistRatingScreen(true);
      setIsFromReviewButton(true); // Track that we came from review button
      setReviewBookingId(null);
    }
  };

  // Handle cancel review modal
  const handleCancelReviewModal = () => {
    setShowReviewChoiceModal(false);
    setReviewBookingId(null);
  };

  // Handle submit therapist rating
  const handleSubmitTherapistRating = async (rating: number, review: string) => {
    // TODO: Implement API call to submit therapist rating
    console.log('Submit therapist rating:', therapistRatingBookingId, rating, review);
    // After successful submission, the screen will navigate back automatically
  };

  // Open BookAppointmentScreen for a given spa name (map to salon details)
  const openRebookForSpaName = (spaName: string) => {
    // Find matching salon by name from top rated salons
    const matchingSalon = topRatedSalons.find((salon) => salon.name === spaName);
    if (!matchingSalon) {
      console.warn('No matching salon found for spa name:', spaName);
      return;
    }

    const salonDetails = getSalonDetails(matchingSalon.id);
    if (!salonDetails) {
      console.warn('No salon details found for salon id:', matchingSalon.id);
      return;
    }

    setRebookSalonDetails(salonDetails);
    setShowBookAppointmentScreen(true);
  };

  // Handle rebook from booking details footer button
  const handleRebook = () => {
    if (!selectedBookingId) return;
    const bookingDetails = getBookingDetails(selectedBookingId);
    if (!bookingDetails) return;
    openRebookForSpaName(bookingDetails.spaName);
  };

  // Handle rebook from booking card button
  const handleRebookFromCard = (booking: Booking) => {
    openRebookForSpaName(booking.spaName);
  };

  // Handle payment success from BookAppointmentScreen
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
    if (rebookSalonDetails) {
      setShowBookAppointmentScreen(true);
    }
  };

  // Handle book appointment completion (fallback if onPaymentSuccess not provided)
  const handleBookAppointmentComplete = () => {
    setShowBookAppointmentScreen(false);
    // TODO: Navigate to bookings screen or show success message
    console.log('Booking completed');
  };

  // Handle reschedule (just a placeholder callback, modal is handled in BookingDetailsScreen)
  const handleReschedule = () => {
    // Modal is now handled in BookingDetailsScreen
  };

  // Handle cancel booking
  const handleCancel = async () => {
    if (!selectedBookingId) return;

    const confirmed = await showConfirmation({
      title: 'Cancel Booking',
      message: 'Are you sure you want to cancel this booking? This action cannot be undone.',
      confirmText: 'Cancel Booking',
      cancelText: 'Keep Booking',
      icon: 'warning-outline',
      iconColor: '#EF4444',
      confirmButtonColor: '#EF4444',
    });

    if (confirmed) {
      // TODO: Implement cancel booking functionality
      console.log('Cancel booking:', selectedBookingId);
      // You can add your cancel booking logic here
    }
  };

  // If booking details not found, reset selection
  useEffect(() => {
    if (selectedBookingId) {
      const bookingDetails = getBookingDetails(selectedBookingId);
      if (!bookingDetails) {
        setSelectedBookingId(null);
      }
    }
  }, [selectedBookingId]);

  // Notify parent when details screen is shown/hidden
  useEffect(() => {
    onDetailsScreenChange?.(
      selectedBookingId !== null ||
      showRatingScreen ||
      showTherapistRatingScreen ||
      showBookAppointmentScreen ||
      showPaymentSuccessfulScreen ||
      showPaymentFailedScreen
    );
  }, [selectedBookingId, showRatingScreen, showTherapistRatingScreen, showBookAppointmentScreen, showPaymentSuccessfulScreen, showPaymentFailedScreen, onDetailsScreenChange]);

  // Handle ScrollView layout to set initial position immediately
  const handleScrollViewLayout = () => {
    if (pageScrollViewRef.current) {
      const tabIndex = tabs.indexOf(activeTab);
      if (tabIndex >= 0) {
        // Set scroll position immediately without animation
        pageScrollViewRef.current.scrollTo({
          x: tabIndex * screenWidth,
          animated: false,
        });
      }
    }
  };

  // Restore scroll position when returning from details screen (synchronously before paint)
  useLayoutEffect(() => {
    if (selectedBookingId === null && pageScrollViewRef.current) {
      // Set scroll position immediately when returning from details
      const tabIndex = tabs.indexOf(activeTab);
      if (tabIndex >= 0) {
        // Set position synchronously before paint to avoid flash
        pageScrollViewRef.current.scrollTo({
          x: tabIndex * screenWidth,
          animated: false,
        });
      }
    }
  }, [selectedBookingId, activeTab, screenWidth]);

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

  // If BookAppointmentScreen is active from rebook, show it above everything else
  if (showBookAppointmentScreen && rebookSalonDetails) {
    return (
      <BookAppointmentScreen
        salonDetails={rebookSalonDetails}
        onBack={() => {
          setShowBookAppointmentScreen(false);
          setRebookSalonDetails(null);
        }}
        onComplete={handleBookAppointmentComplete}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  // If therapist rating screen is active, show therapist rating screen
  if (showTherapistRatingScreen && therapistRatingBookingId) {
    const bookingDetails = getBookingDetails(therapistRatingBookingId);
    if (bookingDetails) {
      return (
        <RatingTherapistScreen
          bookingDetails={bookingDetails}
          onBack={handleBackFromTherapistRating}
          onSubmit={handleSubmitTherapistRating}
        />
      );
    }
  }

  // If rating screen is active, show rating screen
  if (showRatingScreen && ratingBookingId) {
    const bookingDetails = getBookingDetails(ratingBookingId);
    if (bookingDetails) {
      return (
        <RatingSpaScreen
          bookingDetails={bookingDetails}
          onBack={handleBackFromRating}
          onSubmit={handleSubmitRating}
        />
      );
    }
  }

  // If a booking is selected, show details screen
  if (selectedBookingId) {
    const bookingDetails = getBookingDetails(selectedBookingId);
    if (bookingDetails) {
      return (
        <BookingDetailsScreen
          bookingDetails={bookingDetails}
          onBack={handleBack}
          onRateSpa={handleRateSpa}
          onRateTherapist={handleRateTherapist}
          onRebook={handleRebook}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
        />
      );
    }
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <Header onProfilePress={onNavigateToProfile} />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabPress={handleTabPress} />

      {/* Bookings List - Horizontal Pager */}
      <ScrollView
        ref={pageScrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handlePageScroll}
        onLayout={handleScrollViewLayout}
        className="flex-1"
        decelerationRate="fast"
      >
        {tabs.map((tab) => {
          const filteredBookings = 
            tab === 'upcoming' ? getUpcomingBookings(allBookings) :
            tab === 'completed' ? getCompletedBookings(allBookings) :
            tab === 'cancelled' ? getCancelledBookings(allBookings) :
            allBookings;
          
          // Sort all tab bookings by date (recent to old)
          const tabBookings = sortBookingsByDate(filteredBookings);

          return (
            <ScrollView
              key={tab}
              className="flex-1 px-5"
              style={{ width: screenWidth }}
              showsVerticalScrollIndicator={false}
            >
              {tabBookings.length > 0 ? (
                tabBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    tabType={tab}
                    onPress={() => handleBookingPress(booking.id)}
                    onReview={handleReviewPress}
                    onRebook={handleRebookFromCard}
                  />
                ))
              ) : (
                <View className="items-center justify-center py-20">
                  <Ionicons name="calendar-outline" size={64} color={colors.icon} />
                  <Text className="text-lg font-semibold mt-4" style={{ color: colors.text }}>
                    {tab === 'all' ? 'No bookings' : `No ${tab} bookings`}
                  </Text>
                  <Text className="text-sm mt-2" style={{ color: colors.icon }}>
                    {tab === 'all' ? 'Your bookings will appear here' : `Your ${tab} bookings will appear here`}
                  </Text>
                </View>
              )}
            </ScrollView>
          );
        })}
      </ScrollView>

      {/* Review Choice Modal */}
      <ReviewChoiceModal
        visible={showReviewChoiceModal}
        onChooseSpa={handleChooseSpa}
        onChooseTherapist={handleChooseTherapist}
        onCancel={handleCancelReviewModal}
      />
    </View>
  );
}
