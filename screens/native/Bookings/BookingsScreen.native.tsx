import React, { useState, useRef } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text } from '@/components/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/native/Header';
import { 
  Booking,
  allBookings,
  getUpcomingBookings,
  getCompletedBookings,
  getCancelledBookings
} from './configs/mockBookingsData';
import BookingCard from './components/BookingCard';
import TabNavigation from './components/TabNavigation';

export default function BookingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled' | 'all'>('all');
  
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

  // Get all bookings sorted by date (most recent first)
  const getAllBookings = (): Booking[] => {
    // Sort by date (most recent first)
    // Date format is MM/DD/YYYY
    return [...allBookings].sort((a, b) => {
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

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header Section */}
      <Header />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabPress={handleTabPress} />

      {/* Bookings List - Horizontal Pager */}
      <ScrollView
        ref={pageScrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handlePageScroll}
        className="flex-1"
        decelerationRate="fast"
      >
        {tabs.map((tab) => {
          const tabBookings = 
            tab === 'upcoming' ? getUpcomingBookings(allBookings) :
            tab === 'completed' ? getCompletedBookings(allBookings) :
            tab === 'cancelled' ? getCancelledBookings(allBookings) :
            getAllBookings();

          return (
            <ScrollView
              key={tab}
              className="flex-1 px-5"
              style={{ width: screenWidth }}
              showsVerticalScrollIndicator={false}
            >
              {tabBookings.length > 0 ? (
                tabBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} tabType={tab} />
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
    </SafeAreaView>
  );
}
