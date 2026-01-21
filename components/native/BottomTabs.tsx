import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Platform, Animated } from 'react-native';
import { Text } from '@/components/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

type TabId = 'home' | 'bookings' | 'messaging' | 'profile';

interface BottomTabsProps {
  activeTab: TabId;
  onTabPress: (tabId: TabId) => void;
}

interface TabConfig {
  id: TabId;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
}

const tabs: TabConfig[] = [
  { id: 'home', label: 'Home', icon: 'home', iconOutline: 'home-outline' },
  { id: 'bookings', label: 'Bookings', icon: 'calendar', iconOutline: 'calendar-outline' },
  { id: 'messaging', label: 'Messages', icon: 'chatbubbles', iconOutline: 'chatbubbles-outline' },
  { id: 'profile', label: 'Profile', icon: 'person', iconOutline: 'person-outline' },
];

export function BottomTabs({ activeTab, onTabPress }: BottomTabsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  const animValues = useRef<Record<TabId, Animated.Value>>({
    home: new Animated.Value(activeTab === 'home' ? 1 : 0),
    bookings: new Animated.Value(activeTab === 'bookings' ? 1 : 0),
    messaging: new Animated.Value(activeTab === 'messaging' ? 1 : 0),
    profile: new Animated.Value(activeTab === 'profile' ? 1 : 0),
  }).current;

  useEffect(() => {
    tabs.forEach((tab) => {
      Animated.spring(animValues[tab.id], {
        toValue: activeTab === tab.id ? 1 : 0,
        useNativeDriver: true,
        speed: 16,
        bounciness: 7,
      }).start();
    });
  }, [activeTab, animValues]);

  return (
    <View
      className="flex-row bg-white dark:bg-[#151718] border-t border-gray-200 dark:border-[#2a2a2a]"
      style={{
        paddingBottom: Math.max(insets.bottom, Platform.OS === 'ios' ? 20 : 16),
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const iconName = isActive ? tab.icon : tab.iconOutline;
        const color = isActive ? colors.primary : colors.icon;
        const scale = animValues[tab.id].interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.08],
        });

        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            className="flex-1 items-center justify-center py-3"
            activeOpacity={0.7}
          >
            <Animated.View style={{ alignItems: 'center', transform: [{ scale }] }}>
              <Ionicons name={iconName} size={24} color={color} />
              <Text
                className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}
                style={{ color }}
              >
                {tab.label}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
