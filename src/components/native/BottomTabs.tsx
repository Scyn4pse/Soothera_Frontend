import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

type TabId = 'home' | 'explore' | 'profile';

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
  { id: 'explore', label: 'Explore', icon: 'compass', iconOutline: 'compass-outline' },
  { id: 'profile', label: 'Profile', icon: 'person', iconOutline: 'person-outline' },
];

export function BottomTabs({ activeTab, onTabPress }: BottomTabsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e5e5',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
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
        const color = isActive ? colors.tint : colors.icon;

        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
            }}
            activeOpacity={0.7}
          >
            <Ionicons name={iconName} size={24} color={color} />
            <Text
              style={{
                fontSize: 12,
                marginTop: 4,
                color: color,
                fontWeight: isActive ? '600' : '400',
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
