import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabs } from '../components/native/BottomTabs';
import HomeScreen from '../screens/native/Home/HomeScreen.native';
import BookingsScreen from '../screens/native/Bookings/BookingsScreen.native';
import ProfileScreen from '../screens/native/Profile/ProfileScreen.native';

type TabId = 'home' | 'bookings' | 'profile';

// Main content with bottom tab navigation
function MainContent() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isDetailsScreenActive, setIsDetailsScreenActive] = useState(false);
  const [isServicesScreenActive, setIsServicesScreenActive] = useState(false);
  const [isTopRatedSalonsScreenActive, setIsTopRatedSalonsScreenActive] = useState(false);
  const [isSalonDetailsScreenActive, setIsSalonDetailsScreenActive] = useState(false);

  const handleTabPress = (tabId: TabId) => {
    setActiveTab(tabId);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen 
            onServicesScreenChange={setIsServicesScreenActive}
            onTopRatedSalonsScreenChange={setIsTopRatedSalonsScreenActive}
            onSalonDetailsScreenChange={setIsSalonDetailsScreenActive}
          />
        );
      case 'bookings':
        return <BookingsScreen onDetailsScreenChange={setIsDetailsScreenActive} />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return (
          <HomeScreen 
            onServicesScreenChange={setIsServicesScreenActive}
            onTopRatedSalonsScreenChange={setIsTopRatedSalonsScreenActive}
            onSalonDetailsScreenChange={setIsSalonDetailsScreenActive}
          />
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>

      {/* Bottom Tab Navigation - Hide when details screen, services screen, top rated salons screen, or salon details screen is active */}
      {!isDetailsScreenActive && !isServicesScreenActive && !isTopRatedSalonsScreenActive && !isSalonDetailsScreenActive && (
      <BottomTabs
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
      )}
    </SafeAreaView>
  );
}

// Simple Native Navigator (state-based, no React Navigation)
export default function NativeNavigator() {
  return <MainContent />;
}
