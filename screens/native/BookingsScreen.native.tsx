import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
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
}

export default function BookingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Mock data for upcoming bookings
  const upcomingBookings: Booking[] = [
    {
      id: '1',
      serviceName: 'Aromatherapy Massage',
      spaName: 'Tranquil Oasis Spa',
      status: 'confirmed',
      date: 'Monday, May 27, 2024',
      time: '10:00 AM - 11:00 AM',
      therapist: 'Ms. Emily Chen',
    },
    {
      id: '2',
      serviceName: 'Deep Tissue Therapy',
      spaName: 'Urban Retreat',
      status: 'pending',
      date: 'Wednesday, June 5, 2024',
      time: '02:00 PM - 03:30 PM',
      therapist: 'Mr. David Lee',
    },
  ];

  // Mock data for past bookings
  const pastBookings: Booking[] = [
    {
      id: '3',
      serviceName: 'Hot Stone Massage',
      spaName: 'Serenity Spa Center',
      status: 'completed',
      date: 'Sunday, April 21, 2024',
      time: '03:00 PM - 04:00 PM',
      therapist: 'Ms. Sarah Jones',
      price: 120.00,
    },
    {
      id: '4',
      serviceName: 'Swedish Massage',
      spaName: 'The Royale Spa',
      status: 'cancelled',
      date: 'Tuesday, March 12, 2024',
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

  // Calculate total spendings from past bookings
  const calculateTotalSpendings = () => {
    return pastBookings
      .filter((booking) => booking.status === 'completed' && booking.price)
      .reduce((total, booking) => {
        return total + (booking.price || 0);
      }, 0);
  };

  const totalSpendings = calculateTotalSpendings();

  const renderBookingCard = (booking: Booking, isPast: boolean) => (
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
      {/* Service Name and Status */}
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-xl font-bold mb-1" style={{ color: colors.text }}>
            {booking.serviceName}
          </Text>
          <Text className="text-sm" style={{ color: colors.icon }}>
            {booking.spaName}
          </Text>
        </View>
        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: getStatusColor(booking.status) }}
        >
          <Text className="text-xs font-semibold text-white">
            {getStatusText(booking.status)}
          </Text>
        </View>
      </View>

      {/* Date */}
      <View className="flex-row items-center mb-2">
        <Ionicons name="calendar-outline" size={16} color={colors.icon} />
        <Text className="text-sm ml-2" style={{ color: colors.text }}>
          {booking.date}
        </Text>
      </View>

      {/* Time */}
      <View className="flex-row items-center mb-2">
        <Ionicons name="time-outline" size={16} color={colors.icon} />
        <Text className="text-sm ml-2" style={{ color: colors.text }}>
          {booking.time}
        </Text>
      </View>

      {/* Therapist */}
      <View className="flex-row items-center mb-3">
        <Ionicons name="person-outline" size={16} color={colors.icon} />
        <Text className="text-sm ml-2" style={{ color: colors.text }}>
          Therapist: {booking.therapist}
        </Text>
      </View>

      {/* Price (only for past bookings) */}
      {isPast && booking.price && (
        <Text className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
          ₱{booking.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      )}

      {/* Action Buttons */}
      {isPast ? (
        <View className="flex-row">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center px-3 py-3 rounded-xl mr-2"
            style={{ backgroundColor: primaryColor }}
          >
            <Ionicons name="refresh" size={18} color="white" />
            <Text className="text-white font-semibold ml-2">Re-book</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center px-3 py-3 rounded-xl mr-2 border"
            style={{ borderColor: colors.icon, backgroundColor: 'white' }}
          >
            <Ionicons name="star-outline" size={18} color={colors.text} />
            <Text className="font-semibold ml-2" style={{ color: colors.text }}>
              Review
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center px-3 py-3 rounded-xl border"
            style={{ borderColor: colors.icon, backgroundColor: 'white' }}
          >
            <Ionicons name="document-text-outline" size={18} color={colors.text} />
            <Text className="font-semibold ml-2" style={{ color: colors.text }}>
              Invoice
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            className="flex-row items-center justify-center px-4 py-3 rounded-xl mb-2 border"
            style={{ borderColor: colors.icon, backgroundColor: 'white' }}
          >
            <Ionicons name="location-outline" size={18} color={colors.text} />
            <Text className="font-semibold ml-2" style={{ color: colors.text }}>
              Get Directions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-center px-4 py-3 rounded-xl"
            style={{ backgroundColor: primaryColor }}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color="white" />
            <Text className="text-white font-semibold ml-2">Manage Booking</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const currentBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header Section */}
      <Header />

      {/* Total Spendings Card */}
      <View className="mx-5 mb-2">
        <View
          className="rounded-2xl p-5"
          style={{
            backgroundColor: primaryColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text className="text-sm font-medium text-white/80 mb-1">Total Spendings</Text>
          <Text className="text-3xl font-bold text-white">
            ₱{totalSpendings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
          <Text className="text-xs text-white/70 mt-1">From completed bookings</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View className="flex-row mx-5 mt-4 mb-4 bg-gray-100 rounded-xl p-1">
        <TouchableOpacity
          className={`flex-1 py-3 rounded-lg ${activeTab === 'upcoming' ? 'bg-white' : ''}`}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            className={`text-center font-semibold ${activeTab === 'upcoming' ? '' : 'opacity-60'}`}
            style={{ color: activeTab === 'upcoming' ? colors.text : colors.icon }}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 rounded-lg ${activeTab === 'past' ? 'bg-white' : ''}`}
          onPress={() => setActiveTab('past')}
        >
          <Text
            className={`text-center font-semibold ${activeTab === 'past' ? '' : 'opacity-60'}`}
            style={{ color: activeTab === 'past' ? colors.text : colors.icon }}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {currentBookings.length > 0 ? (
          currentBookings.map((booking) => renderBookingCard(booking, activeTab === 'past'))
        ) : (
          <View className="items-center justify-center py-20">
            <Ionicons name="calendar-outline" size={64} color={colors.icon} />
            <Text className="text-lg font-semibold mt-4" style={{ color: colors.text }}>
              No {activeTab === 'upcoming' ? 'upcoming' : 'past'} bookings
            </Text>
            <Text className="text-sm mt-2" style={{ color: colors.icon }}>
              Your {activeTab === 'upcoming' ? 'upcoming' : 'past'} bookings will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
