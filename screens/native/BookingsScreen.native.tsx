import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from '@/components/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/native/Header';

type BookingStatus = 'completed' | 'cancelled' | 'confirmed' | 'pending';

interface Booking {
  id: string;
  serviceName: string;
  spaName: string;
  status: BookingStatus;
  date: string;
  time: string;
  therapist: string;
  price?: number;
  rating?: number;
  address?: string;
}

export default function BookingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled' | 'all'>('upcoming');

  // Mock data for upcoming bookings
  const upcomingBookings: Booking[] = [
    {
      id: '1',
      serviceName: 'Aromatherapy Massage',
      spaName: 'Tranquil Oasis Spa',
      status: 'confirmed',
      date: '05/27/2024',
      time: '10:00 AM - 11:00 AM',
      therapist: 'Ms. Emily Chen',
      rating: 4.8,
      address: 'Talamban, Cebu City',
      price: 150.00,
    },
    {
      id: '2',
      serviceName: 'Deep Tissue Therapy',
      spaName: 'Urban Retreat',
      status: 'pending',
      date: '06/05/2024',
      time: '02:00 PM - 03:30 PM',
      therapist: 'Mr. David Lee',
      rating: 4.7,
      address: 'Mandaue City, Cebu',
      price: 180.00,
    },
  ];

  // Mock data for completed bookings
  const completedBookings: Booking[] = [
    {
      id: '3',
      serviceName: 'Hot Stone Massage',
      spaName: 'Serenity Spa Center',
      status: 'completed',
      date: '04/21/2024',
      time: '03:00 PM - 04:00 PM',
      therapist: 'Ms. Sarah Jones',
      price: 120.00,
    },
  ];

  // Mock data for cancelled bookings
  const cancelledBookings: Booking[] = [
    {
      id: '4',
      serviceName: 'Swedish Massage',
      spaName: 'The Royale Spa',
      status: 'cancelled',
      date: '03/12/2024',
      time: '11:30 AM - 12:30 PM',
      therapist: 'Mr. John Smith',
      price: 95.00,
    },
  ];

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'completed':
      case 'confirmed':
        return primaryColor; // Green/teal
      case 'cancelled':
        return '#EF4444'; // Red
      case 'pending':
        return '#F59E0B'; // Yellow/Orange
      default:
        return colors.icon;
    }
  };

  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  // Combine all bookings and sort by date (most recent first)
  const getAllBookings = (): Booking[] => {
    const allBookings = [...upcomingBookings, ...completedBookings, ...cancelledBookings];
    
    // Sort by date (most recent first)
    // Date format is MM/DD/YYYY
    return allBookings.sort((a, b) => {
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

  const renderBookingCard = (booking: Booking, tabType: 'upcoming' | 'completed' | 'cancelled' | 'all') => {
    // Determine which buttons to show based on booking status when in 'all' tab
    const showUpcomingButtons = tabType === 'upcoming' || (tabType === 'all' && (booking.status === 'confirmed' || booking.status === 'pending'));
    const showCompletedButtons = tabType === 'completed' || (tabType === 'all' && booking.status === 'completed');
    const showCancelledButtons = tabType === 'cancelled' || (tabType === 'all' && booking.status === 'cancelled');
    const showStatusTag = tabType === 'upcoming' || (tabType === 'all' && (booking.status === 'confirmed' || booking.status === 'pending' || booking.status === 'completed' || booking.status === 'cancelled'));

    return (
    <View
      key={booking.id}
      className="bg-white rounded-2xl p-4 mb-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      {/* Top Section: Image and Details */}
      <View className="flex-row mb-4">
        {/* Image */}
        <Image
          source={require('../../assets/salon.jpg')}
          className="w-20 h-20 rounded-xl mr-3"
          resizeMode="cover"
        />
        
        {/* Details */}
        <View className="flex-1">
          {/* Service Name and Status */}
          <View className="flex-row items-start justify-between mb-1">
            <Text className="text-lg font-bold flex-1" style={{ color: colors.text }}>
              {booking.serviceName}
            </Text>
            {showStatusTag && (
              <View
                className="px-3 py-1 rounded-full ml-2"
                style={{ backgroundColor: getStatusColor(booking.status) + '20' }}
              >
                <Text className="text-xs font-semibold" style={{ color: getStatusColor(booking.status) }}>
                  {getStatusText(booking.status)}
                </Text>
              </View>
            )}
          </View>

          {/* Date and Spa Name */}
          <View className="flex-row items-center mb-1">
            <Ionicons name="calendar-outline" size={14} color={colors.icon} />
            <Text className="text-xs ml-1 mr-2" style={{ color: colors.icon }}>
              {booking.date}
            </Text>
            <Text className="text-xs mr-2" style={{ color: colors.icon }}>•</Text>
            <Ionicons name="business-outline" size={14} color={colors.icon} />
            <Text className="text-xs ml-1" style={{ color: colors.icon }}>
              {booking.spaName}
            </Text>
          </View>

          {/* Time */}
          <View className="flex-row items-center mb-1">
            <Ionicons name="time-outline" size={14} color={colors.icon} />
            <Text className="text-xs ml-1" style={{ color: colors.icon }}>
              {booking.time}
            </Text>
          </View>

          {/* Location/Address */}
          {booking.address && (
            <View className="flex-row items-start">
              <Ionicons name="location-outline" size={14} color={colors.icon} style={{ marginTop: 2 }} />
              <Text className="text-xs ml-1 flex-1" style={{ color: colors.icon }} numberOfLines={1}>
                {booking.address}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Price Row */}
      {booking.price !== undefined && (
        <View className="mb-3 flex-row justify-end">
          <Text className="text-l" style={{ color: colors.primary }}>
            ₱{booking.price.toFixed(2)}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View className="flex-row">
        {showUpcomingButtons && (
          <>
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center px-4 py-2 rounded-xl mr-2 border"
              style={{ borderColor: colors.icon, backgroundColor: 'white' }}
            >
              <Ionicons name="location-outline" size={16} color={colors.text} />
              <Text className="text-sm font-semibold ml-2" style={{ color: colors.text }}>
                Directions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center px-4 py-2 rounded-xl"
              style={{ backgroundColor: primaryColor }}
            >
              <Ionicons name="checkmark-circle-outline" size={16} color="white" />
              <Text className="text-sm text-white font-semibold ml-2">Manage Booking</Text>
            </TouchableOpacity>
          </>
        )}

        {showCompletedButtons && (
          <>
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center px-4 py-2 rounded-xl mr-2"
              style={{ backgroundColor: primaryColor }}
            >
              <Ionicons name="refresh" size={16} color="white" />
              <Text className="text-sm text-white font-semibold ml-2">Re-book</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center px-4 py-2 rounded-xl border"
              style={{ borderColor: colors.icon, backgroundColor: 'white' }}
            >
              <Ionicons name="star-outline" size={16} color={colors.text} />
              <Text className="text-sm font-semibold ml-2" style={{ color: colors.text }}>
                Review
              </Text>
            </TouchableOpacity>
          </>
        )}

        {showCancelledButtons && (
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center px-4 py-2 rounded-xl"
            style={{ backgroundColor: primaryColor }}
          >
            <Ionicons name="refresh" size={16} color="white" />
            <Text className="text-sm text-white font-semibold ml-2">Re-book</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
    );
  };

  const currentBookings = 
    activeTab === 'upcoming' ? upcomingBookings :
    activeTab === 'completed' ? completedBookings :
    activeTab === 'cancelled' ? cancelledBookings :
    getAllBookings();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header Section */}
      <Header />

      {/* Tab Navigation */}
      <View className="mx-5 mt-2 mb-4 bg-gray-100 rounded-xl p-1">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 4 }}
        >
          <TouchableOpacity
            className="px-4 py-3 rounded-lg mr-2"
            style={{ backgroundColor: activeTab === 'all' ? colors.primary : 'transparent' }}
            onPress={() => setActiveTab('all')}
          >
            <Text
              className={`text-center font-semibold ${activeTab === 'all' ? '' : 'opacity-60'}`}
              style={{ color: activeTab === 'all' ? 'white' : colors.icon }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-3 rounded-lg mr-2"
            style={{ backgroundColor: activeTab === 'upcoming' ? colors.primary : 'transparent' }}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text
              className={`text-center font-semibold ${activeTab === 'upcoming' ? '' : 'opacity-60'}`}
              style={{ color: activeTab === 'upcoming' ? 'white' : colors.icon }}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-3 rounded-lg mr-2"
            style={{ backgroundColor: activeTab === 'completed' ? colors.primary : 'transparent' }}
            onPress={() => setActiveTab('completed')}
          >
            <Text
              className={`text-center font-semibold ${activeTab === 'completed' ? '' : 'opacity-60'}`}
              style={{ color: activeTab === 'completed' ? 'white' : colors.icon }}
            >
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-3 rounded-lg"
            style={{ backgroundColor: activeTab === 'cancelled' ? colors.primary : 'transparent' }}
            onPress={() => setActiveTab('cancelled')}
          >
            <Text
              className={`text-center font-semibold ${activeTab === 'cancelled' ? '' : 'opacity-60'}`}
              style={{ color: activeTab === 'cancelled' ? 'white' : colors.icon }}
            >
              Cancelled
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Bookings List */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {currentBookings.length > 0 ? (
          currentBookings.map((booking) => renderBookingCard(booking, activeTab))
        ) : (
          <View className="items-center justify-center py-20">
            <Ionicons name="calendar-outline" size={64} color={colors.icon} />
            <Text className="text-lg font-semibold mt-4" style={{ color: colors.text }}>
              {activeTab === 'all' ? 'No bookings' : `No ${activeTab} bookings`}
            </Text>
            <Text className="text-sm mt-2" style={{ color: colors.icon }}>
              {activeTab === 'all' ? 'Your bookings will appear here' : `Your ${activeTab} bookings will appear here`}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
