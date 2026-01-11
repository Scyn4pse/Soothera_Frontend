import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomTabs } from '../components/native/BottomTabs';
import HomeScreen from '../screens/native/HomeScreen.native';
import ExploreScreen from '../screens/native/ExploreScreen.native';
import ProfileScreen from '../screens/native/ProfileScreen.native';

type TabId = 'home' | 'explore' | 'profile';

// Main content with bottom tab navigation
function MainContent() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const handleTabPress = (tabId: TabId) => {
    setActiveTab(tabId);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'explore':
        return <ExploreScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>

      {/* Bottom Tab Navigation */}
      <BottomTabs
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </View>
  );
}

// Simple Native Navigator (state-based, no React Navigation)
export default function NativeNavigator() {
  return <MainContent />;
}
