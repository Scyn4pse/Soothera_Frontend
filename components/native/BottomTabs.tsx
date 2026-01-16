import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Text } from '@/components/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

type TabId = 'home' | 'bookings' | 'profile';

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
  { id: 'profile', label: 'Profile', icon: 'person', iconOutline: 'person-outline' },
];

export function BottomTabs({ activeTab, onTabPress }: BottomTabsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

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

        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            className="flex-1 items-center justify-center py-3"
            activeOpacity={0.7}
          >
            <Ionicons name={iconName} size={24} color={color} />
            <Text
              className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}
              style={{ color }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
