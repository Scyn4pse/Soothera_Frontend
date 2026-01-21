import React, { useEffect, useMemo, useState } from 'react';
import { BackHandler, Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { BottomTabs } from '../components/native/BottomTabs';
import { RisingPage } from '../components/native/RisingPage';
import HomeScreen from '../screens/native/Home/HomeScreen.native';
import ServicesScreen from '../screens/native/Home/ServicesScreen.native';
import TopRatedSalonsScreen from '../screens/native/Home/TopRatedSalonsScreen.native';
import SalonDetailsScreen from '../screens/native/Home/SalonDetailsScreen.native';
import BookAppointmentScreen from '../screens/native/Home/BookAppointmentScreen.native';
import PaymentSuccessfulScreen from '../screens/native/Home/PaymentSuccessfulScreen.native';
import PaymentFailedScreen from '../screens/native/Home/PaymentFailedScreen.native';
import NotificationsScreen from '../screens/native/Notifications/NotificationsScreen.native';
import { getSalonDetails } from '../screens/native/Home/configs/mockData';
import BookingsScreen from '../screens/native/Bookings/BookingsScreen.native';
import BookingDetailsScreen from '../screens/native/Bookings/BookingDetailsScreen.native';
import RatingSpaScreen from '../screens/native/Bookings/RatingSpaScreen.native';
import RatingTherapistScreen from '../screens/native/Bookings/RatingTherapistScreen.native';
import { getBookingDetails } from '../screens/native/Bookings/configs/mockBookingDetailsData';
import InboxScreen from '../screens/native/Messaging/InboxScreen.native';
import ChatRoomScreen from '../screens/native/Messaging/ChatRoomScreen.native';
import ProfileScreen from '../screens/native/Profile/ProfileScreen.native';
import type { Service } from '../screens/native/Home/types/Home';
import type { SalonDetails, Therapist } from '../screens/native/Home/types/SalonDetails';
import type { Conversation } from '../screens/native/Messaging/InboxScreen.native';

type TabId = 'home' | 'bookings' | 'messaging' | 'profile';

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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSITION_DURATION = 300;

export default function NativeNavigator() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // Home overlays
  const [homeServicesVisible, setHomeServicesVisible] = useState(false);
  const [homeTopRatedVisible, setHomeTopRatedVisible] = useState(false);
  const [homeTopRatedAutoFilter, setHomeTopRatedAutoFilter] = useState(false);
  const [homeSelectedSalonId, setHomeSelectedSalonId] = useState<string | null>(null);
  const [homeBookVisible, setHomeBookVisible] = useState(false);
  const [homePaymentSuccess, setHomePaymentSuccess] = useState<BookingData | null>(null);
  const [homePaymentFailed, setHomePaymentFailed] = useState<BookingData | null>(null);
  const [homeNotificationsVisible, setHomeNotificationsVisible] = useState(false);

  const homeServicesTx = useSharedValue(SCREEN_WIDTH);
  const homeTopRatedTx = useSharedValue(SCREEN_WIDTH);
  const homeSalonTx = useSharedValue(SCREEN_WIDTH);
  const homeBookTx = useSharedValue(SCREEN_WIDTH);

  // Bookings overlays
  const [bookingSelectedId, setBookingSelectedId] = useState<string | null>(null);
  const [bookingRatingSpaId, setBookingRatingSpaId] = useState<string | null>(null);
  const [bookingRatingTherapistId, setBookingRatingTherapistId] = useState<string | null>(null);
  const [bookingRatingFromReview, setBookingRatingFromReview] = useState(false);
  const bookingsDetailsTx = useSharedValue(SCREEN_WIDTH);
  const bookingsRatingSpaTx = useSharedValue(SCREEN_WIDTH);
  const bookingsRatingTherapistTx = useSharedValue(SCREEN_WIDTH);

  // Messaging overlay
  const [chatConversation, setChatConversation] = useState<Conversation | null>(null);
  const chatTx = useSharedValue(SCREEN_WIDTH);

  // Bottom tabs visibility: hide if any overlay is active
  const isOverlayActive = useMemo(
    () =>
      homeServicesVisible ||
      homeTopRatedVisible ||
      !!homeSelectedSalonId ||
      homeBookVisible ||
      !!homePaymentSuccess ||
      !!homePaymentFailed ||
      homeNotificationsVisible ||
      !!bookingSelectedId ||
      !!bookingRatingSpaId ||
      !!bookingRatingTherapistId ||
      !!chatConversation,
    [
      homeServicesVisible,
      homeTopRatedVisible,
      homeSelectedSalonId,
      homeBookVisible,
      homePaymentSuccess,
      homePaymentFailed,
      homeNotificationsVisible,
      bookingSelectedId,
      bookingRatingSpaId,
      bookingRatingTherapistId,
      chatConversation,
    ]
  );

  // Home animations
  useEffect(() => {
    homeServicesTx.value = withTiming(homeServicesVisible ? 0 : SCREEN_WIDTH, { duration: TRANSITION_DURATION });
  }, [homeServicesVisible, homeServicesTx]);

  useEffect(() => {
    homeTopRatedTx.value = withTiming(homeTopRatedVisible ? 0 : SCREEN_WIDTH, { duration: TRANSITION_DURATION });
  }, [homeTopRatedVisible, homeTopRatedTx]);

  useEffect(() => {
    homeSalonTx.value = withTiming(homeSelectedSalonId ? 0 : SCREEN_WIDTH, { duration: TRANSITION_DURATION });
  }, [homeSelectedSalonId, homeSalonTx]);

  useEffect(() => {
    homeBookTx.value = withTiming(homeBookVisible ? 0 : SCREEN_WIDTH, { duration: TRANSITION_DURATION });
  }, [homeBookVisible, homeBookTx]);

  const homeServicesStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: homeServicesTx.value }],
  }));
  const homeTopRatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: homeTopRatedTx.value }],
  }));
  const homeSalonStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: homeSalonTx.value }],
  }));
  const homeBookStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: homeBookTx.value }],
  }));

  // Bookings animations
  useEffect(() => {
    bookingsDetailsTx.value = withTiming(bookingSelectedId ? 0 : SCREEN_WIDTH, { duration: TRANSITION_DURATION });
  }, [bookingSelectedId, bookingsDetailsTx]);
  useEffect(() => {
    bookingsRatingSpaTx.value = withTiming(bookingRatingSpaId ? 0 : SCREEN_WIDTH, { duration: TRANSITION_DURATION });
  }, [bookingRatingSpaId, bookingsRatingSpaTx]);
  useEffect(() => {
    bookingsRatingTherapistTx.value = withTiming(
      bookingRatingTherapistId ? 0 : SCREEN_WIDTH,
      { duration: TRANSITION_DURATION }
    );
  }, [bookingRatingTherapistId, bookingsRatingTherapistTx]);

  const bookingsDetailsStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: bookingsDetailsTx.value }],
  }));
  const bookingsRatingSpaStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: bookingsRatingSpaTx.value }],
  }));
  const bookingsRatingTherapistStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: bookingsRatingTherapistTx.value }],
  }));

  // Chat animation
  useEffect(() => {
    chatTx.value = withTiming(chatConversation ? 0 : SCREEN_WIDTH, { duration: TRANSITION_DURATION });
  }, [chatConversation, chatTx]);
  const chatStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: chatTx.value }],
  }));

  // Home navigation handlers
  const openHomeServices = () => setHomeServicesVisible(true);
  const openHomeTopRated = (autoOpenFilter?: boolean) => {
    setHomeTopRatedAutoFilter(!!autoOpenFilter);
    setHomeTopRatedVisible(true);
  };
  const openHomeSalon = (salonId: string) => setHomeSelectedSalonId(salonId);
  const openHomeBook = (salonId: string) => {
    setHomeSelectedSalonId(salonId);
    setHomeBookVisible(true);
  };
  const openHomeNotifications = () => setHomeNotificationsVisible(true);

  const closeHomeServices = () => {
    homeServicesTx.value = withTiming(SCREEN_WIDTH, { duration: TRANSITION_DURATION }, () =>
      runOnJS(setHomeServicesVisible)(false)
    );
  };
  const closeHomeTopRated = () => {
    homeTopRatedTx.value = withTiming(SCREEN_WIDTH, { duration: TRANSITION_DURATION }, () =>
      runOnJS(setHomeTopRatedVisible)(false)
    );
  };
  const closeHomeSalon = () => {
    homeSalonTx.value = withTiming(SCREEN_WIDTH, { duration: TRANSITION_DURATION }, () =>
      runOnJS(setHomeSelectedSalonId)(null)
    );
  };
  const closeHomeBook = () => {
    homeBookTx.value = withTiming(SCREEN_WIDTH, { duration: TRANSITION_DURATION }, () =>
      runOnJS(setHomeBookVisible)(false)
    );
  };

  const handleHomePaymentSuccess = (data: BookingData) => {
    setHomePaymentSuccess(data);
    setHomeBookVisible(false);
  };
  const handleHomePaymentSuccessBack = () => {
    setHomePaymentSuccess(null);
  };
  const handleHomePaymentSuccessHome = () => {
    // Mirror previous behavior: move to failed screen optionally
    if (homePaymentSuccess) {
      setHomePaymentFailed(homePaymentSuccess);
    }
    setHomePaymentSuccess(null);
  };
  const handleHomePaymentFailedBack = () => {
    setHomePaymentFailed(null);
  };
  const handleHomePaymentFailedTryAgain = () => {
    setHomePaymentFailed(null);
    if (homeSelectedSalonId) {
      setHomeBookVisible(true);
    }
  };

  // Bookings navigation handlers
  const openBookingDetails = (id: string) => setBookingSelectedId(id);
  const openBookingRatingSpa = (id: string, fromReview = false) => {
    setBookingRatingSpaId(id);
    setBookingRatingFromReview(fromReview);
  };
  const openBookingRatingTherapist = (id: string, fromReview = false) => {
    setBookingRatingTherapistId(id);
    setBookingRatingFromReview(fromReview);
  };
  const closeBookingDetails = () => {
    bookingsDetailsTx.value = withTiming(SCREEN_WIDTH, { duration: TRANSITION_DURATION }, () =>
      runOnJS(setBookingSelectedId)(null)
    );
  };
  const closeBookingRatingSpa = () => {
    bookingsRatingSpaTx.value = withTiming(SCREEN_WIDTH, { duration: TRANSITION_DURATION }, () => {
      runOnJS(setBookingRatingSpaId)(null);
      runOnJS(setBookingRatingFromReview)(false);
    });
  };
  const closeBookingRatingTherapist = () => {
    bookingsRatingTherapistTx.value = withTiming(
      SCREEN_WIDTH,
      { duration: TRANSITION_DURATION },
      () => {
        runOnJS(setBookingRatingTherapistId)(null);
        runOnJS(setBookingRatingFromReview)(false);
      }
    );
  };

  // Messaging handlers
  const openChat = (conversation: Conversation) => setChatConversation(conversation);
  const closeChat = () => {
    chatTx.value = withTiming(SCREEN_WIDTH, { duration: TRANSITION_DURATION }, () =>
      runOnJS(setChatConversation)(null)
    );
  };

  // Centralized hardware back handling
  useEffect(() => {
    const onBackPress = () => {
      if (homePaymentFailed) {
        handleHomePaymentFailedBack();
        return true;
      }
      if (homePaymentSuccess) {
        handleHomePaymentSuccessBack();
        return true;
      }
      if (homeBookVisible) {
        closeHomeBook();
        return true;
      }
      if (homeSelectedSalonId) {
        closeHomeSalon();
        return true;
      }
      if (homeTopRatedVisible) {
        closeHomeTopRated();
        return true;
      }
      if (homeServicesVisible) {
        closeHomeServices();
        return true;
      }
      if (bookingRatingTherapistId) {
        closeBookingRatingTherapist();
        return true;
      }
      if (bookingRatingSpaId) {
        closeBookingRatingSpa();
        return true;
      }
      if (bookingSelectedId) {
        closeBookingDetails();
        return true;
      }
      if (chatConversation) {
        closeChat();
        return true;
      }
      return false;
    };

    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [
    chatConversation,
    homeBookVisible,
    homePaymentFailed,
    homePaymentSuccess,
    homeSelectedSalonId,
    homeServicesVisible,
    homeTopRatedVisible,
    bookingSelectedId,
    bookingRatingSpaId,
    bookingRatingTherapistId,
    closeChat,
    closeHomeBook,
    closeHomeSalon,
    closeHomeServices,
    closeHomeTopRated,
    closeBookingDetails,
    closeBookingRatingSpa,
    closeBookingRatingTherapist,
    handleHomePaymentFailedBack,
    handleHomePaymentSuccessBack,
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View style={{ flex: 1, position: 'relative' }}>
        {/* Tab bases */}
        <RisingPage visible={activeTab === 'home'}>
          <HomeScreen
            useNavigatorOverlays
            onNavigateToProfile={() => setActiveTab('profile')}
            onNavigateServices={openHomeServices}
            onNavigateTopRated={({ autoOpenFilter } = {}) => openHomeTopRated(autoOpenFilter)}
            onNavigateSalonDetails={openHomeSalon}
            onNavigateBookAppointment={openHomeBook}
            onNavigateNotifications={openHomeNotifications}
          />
        </RisingPage>

        <RisingPage visible={activeTab === 'bookings'} fadeIn={false} fadeOut={false}>
          <BookingsScreen
            useNavigatorOverlays
            onNavigateToProfile={() => setActiveTab('profile')}
            onNavigateBookingDetails={openBookingDetails}
            onNavigateRatingSpa={openBookingRatingSpa}
            onNavigateRatingTherapist={openBookingRatingTherapist}
          />
        </RisingPage>

        <RisingPage visible={activeTab === 'messaging'}>
          <InboxScreen
            useNavigatorOverlays
            onNavigateToProfile={() => setActiveTab('profile')}
            onNavigateChatRoom={openChat}
          />
        </RisingPage>

        <RisingPage visible={activeTab === 'profile'} fadeIn={false} fadeOut={false}>
          <ProfileScreen isActive={activeTab === 'profile'} />
        </RisingPage>
      </View>

      {/* Overlays - Home */}
      {homeServicesVisible && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 5,
            },
            homeServicesStyle,
          ]}
        >
          <ServicesScreen
            onBack={closeHomeServices}
            onServicePress={() => {
              setHomeTopRatedVisible(true);
              setHomeTopRatedAutoFilter(false);
            }}
          />
        </Animated.View>
      )}

      {homeTopRatedVisible && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 6,
            },
            homeTopRatedStyle,
          ]}
        >
          <TopRatedSalonsScreen
            onBack={closeHomeTopRated}
            onSalonPress={openHomeSalon}
            autoOpenFilter={homeTopRatedAutoFilter}
          />
        </Animated.View>
      )}

      {homeSelectedSalonId && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 7,
            },
            homeSalonStyle,
          ]}
        >
          {(() => {
            const salonDetails = getSalonDetails(homeSelectedSalonId);
            if (!salonDetails) return null;
            return (
              <SalonDetailsScreen
                salonDetails={salonDetails}
                onBack={closeHomeSalon}
                onBookAppointment={() => setHomeBookVisible(true)}
              />
            );
          })()}
        </Animated.View>
      )}

      {homeBookVisible && homeSelectedSalonId && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 8,
            },
            homeBookStyle,
          ]}
        >
          {(() => {
            const salonDetails = getSalonDetails(homeSelectedSalonId);
            if (!salonDetails) return null;
            return (
              <BookAppointmentScreen
                salonDetails={salonDetails}
                onBack={closeHomeBook}
                onComplete={closeHomeBook}
                onPaymentSuccess={handleHomePaymentSuccess}
              />
            );
          })()}
        </Animated.View>
      )}

      {homeNotificationsVisible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9,
          }}
        >
          <NotificationsScreen onBack={() => setHomeNotificationsVisible(false)} />
        </View>
      )}

      {homePaymentSuccess && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
          }}
        >
          <PaymentSuccessfulScreen
            bookingData={homePaymentSuccess}
            onBack={handleHomePaymentSuccessBack}
            onHome={handleHomePaymentSuccessHome}
          />
        </View>
      )}

      {homePaymentFailed && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 11,
          }}
        >
          <PaymentFailedScreen
            bookingData={homePaymentFailed}
            onBack={handleHomePaymentFailedBack}
            onTryAgain={handleHomePaymentFailedTryAgain}
          />
        </View>
      )}

      {/* Overlays - Bookings */}
      {bookingSelectedId && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 12,
            },
            bookingsDetailsStyle,
          ]}
        >
          {(() => {
            const details = getBookingDetails(bookingSelectedId);
            if (!details) return null;
            return (
              <BookingDetailsScreen
                bookingDetails={details}
                onBack={closeBookingDetails}
                onRateSpa={() => openBookingRatingSpa(bookingSelectedId)}
                onRateTherapist={() => openBookingRatingTherapist(bookingSelectedId)}
                onRebook={() => {}}
                onReschedule={() => {}}
                onCancel={() => {}}
              />
            );
          })()}
        </Animated.View>
      )}

      {bookingRatingSpaId && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 13,
            },
            bookingsRatingSpaStyle,
          ]}
        >
          {(() => {
            const details = getBookingDetails(bookingRatingSpaId);
            if (!details) return null;
            return (
              <RatingSpaScreen
                bookingDetails={details}
                onBack={closeBookingRatingSpa}
                onSubmit={() => closeBookingRatingSpa()}
              />
            );
          })()}
        </Animated.View>
      )}

      {bookingRatingTherapistId && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 14,
            },
            bookingsRatingTherapistStyle,
          ]}
        >
          {(() => {
            const details = getBookingDetails(bookingRatingTherapistId);
            if (!details) return null;
            return (
              <RatingTherapistScreen
                bookingDetails={details}
                onBack={closeBookingRatingTherapist}
                onSubmit={() => closeBookingRatingTherapist()}
              />
            );
          })()}
        </Animated.View>
      )}

      {/* Overlays - Messaging */}
      {chatConversation && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 15,
            },
            chatStyle,
          ]}
        >
          <ChatRoomScreen conversation={chatConversation as any} onBack={closeChat} />
        </Animated.View>
      )}

      {/* Bottom Tabs */}
      <RisingPage
        visible={!isOverlayActive}
        fillContainer={false}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
      >
        <BottomTabs activeTab={activeTab} onTabPress={setActiveTab} />
      </RisingPage>
    </SafeAreaView>
  );
}
