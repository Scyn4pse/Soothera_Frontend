import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabs } from '../components/native/BottomTabs';
import { RisingPage } from '../components/native/RisingPage';
import HomeScreen from '../screens/native/Home/HomeScreen.native';
import BookingsScreen from '../screens/native/Bookings/BookingsScreen.native';
import InboxScreen from '../screens/native/Messaging/InboxScreen.native';
import ProfileScreen from '../screens/native/Profile/ProfileScreen.native';

type TabId = 'home' | 'bookings' | 'messaging' | 'profile';

// Main content with bottom tab navigation
function MainContent() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isDetailsScreenActive, setIsDetailsScreenActive] = useState(false);
  const [isServicesScreenActive, setIsServicesScreenActive] = useState(false);
  const [isTopRatedSalonsScreenActive, setIsTopRatedSalonsScreenActive] = useState(false);
  const [isSalonDetailsScreenActive, setIsSalonDetailsScreenActive] = useState(false);
  const [isBookAppointmentScreenActive, setIsBookAppointmentScreenActive] = useState(false);
  const [isChatRoomActive, setIsChatRoomActive] = useState(false);
  const [isNotificationsScreenActive, setIsNotificationsScreenActive] = useState(false);

  const handleTabPress = (tabId: TabId) => {
    setActiveTab(tabId);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View style={{ flex: 1, position: 'relative' }}>
        <RisingPage visible={activeTab === 'home'}>
          <HomeScreen 
            onServicesScreenChange={setIsServicesScreenActive}
            onTopRatedSalonsScreenChange={setIsTopRatedSalonsScreenActive}
            onSalonDetailsScreenChange={setIsSalonDetailsScreenActive}
            onBookAppointmentScreenChange={setIsBookAppointmentScreenActive}
            onNotificationsScreenChange={setIsNotificationsScreenActive}
            onNavigateToProfile={() => setActiveTab('profile')}
          />
        </RisingPage>

        <RisingPage visible={activeTab === 'bookings'} fadeIn={false} fadeOut={false}>
          <BookingsScreen 
            onDetailsScreenChange={setIsDetailsScreenActive}
            onNavigateToProfile={() => setActiveTab('profile')}
            isActive={activeTab === 'bookings'}
          />
        </RisingPage>

        <RisingPage visible={activeTab === 'messaging'}>
          <InboxScreen 
            onChatRoomChange={setIsChatRoomActive}
            onNavigateToProfile={() => setActiveTab('profile')}
          />
        </RisingPage>

        <RisingPage visible={activeTab === 'profile'} fadeIn={false} fadeOut={false}>
          <ProfileScreen isActive={activeTab === 'profile'} />
        </RisingPage>
      </View>

      {/* Bottom Tab Navigation - Hide when details screen, services screen, top rated salons screen, salon details screen, book appointment screen, notifications screen, or chat room is active */}
      <RisingPage
        visible={
          !isDetailsScreenActive &&
          !isServicesScreenActive &&
          !isTopRatedSalonsScreenActive &&
          !isSalonDetailsScreenActive &&
          !isBookAppointmentScreenActive &&
          !isNotificationsScreenActive &&
          !isChatRoomActive
        }
        fillContainer={false}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
      >
        <BottomTabs
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </RisingPage>
    </SafeAreaView>
  );
}

// Simple Native Navigator (state-based, no React Navigation)
export default function NativeNavigator() {
  return <MainContent />;
}
