import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type TabType = 'all' | 'upcoming' | 'completed' | 'cancelled';

interface TabNavigationProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const tabs: TabType[] = ['all', 'upcoming', 'completed', 'cancelled'];

const getTabLabel = (tab: TabType): string => {
  switch (tab) {
    case 'all':
      return 'All';
    case 'upcoming':
      return 'Upcoming';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return tab;
  }
};

export default function TabNavigation({ activeTab, onTabPress }: TabNavigationProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View className="mx-5 mt-2 mb-4 bg-gray-100 rounded-xl p-1">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            className={`px-4 py-3 rounded-lg ${index < tabs.length - 1 ? 'mr-2' : ''}`}
            style={{ backgroundColor: activeTab === tab ? colors.primary : 'transparent' }}
            onPress={() => onTabPress(tab)}
          >
            <Text
              className={`text-center font-semibold ${activeTab === tab ? '' : 'opacity-60'}`}
              style={{ color: activeTab === tab ? 'white' : colors.icon }}
            >
              {getTabLabel(tab)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
