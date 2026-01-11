import React, { useState } from 'react';
import { View } from 'react-native';
import Sidebar from './Sidebar';
import HomeScreenWeb from '../../screens/web/HomeScreen.web';
import ExploreScreenWeb from '../../screens/web/ExploreScreen.web';
import ProfileScreenWeb from '../../screens/web/ProfileScreen.web';

type Screen = 'home' | 'explore' | 'profile';

export default function WebLayout() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreenWeb />;
      case 'explore':
        return <ExploreScreenWeb />;
      case 'profile':
        return <ProfileScreenWeb />;
      default:
        return <HomeScreenWeb />;
    }
  };

  return (
    <View className="flex-1 flex-row bg-gray-50 min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar activeScreen={activeScreen} onNavigate={setActiveScreen} />
      
      {/* Main Content Area */}
      <View className="flex-1 overflow-auto">
        {renderScreen()}
      </View>
    </View>
  );
}
