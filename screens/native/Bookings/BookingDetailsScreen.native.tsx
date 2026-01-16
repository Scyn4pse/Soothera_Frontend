import React, { useEffect } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { Text } from '@/components/Text';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BookingDetails } from './types/BookingDetails';
import { BOOKING_STATUS } from './types/Booking';

interface BookingDetailsScreenProps {
  bookingDetails: BookingDetails;
  onBack: () => void;
  onRateSpa?: () => void;
  onRateTherapist?: () => void;
  onRebook?: () => void;
}

// Map placeholder component (can be replaced with react-native-maps later)
const MapPlaceholder = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View 
      className="w-full rounded-xl overflow-hidden"
      style={{ 
        height: 200, 
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}
    >
      <View className="flex-1 items-center justify-center">
        <Ionicons name="map-outline" size={48} color={colors.icon} />
        <Text className="text-sm mt-2" style={{ color: colors.icon }}>
          Map View (Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)})
        </Text>
      </View>
    </View>
  );
};

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View className="flex-row items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Ionicons key={`full-${i}`} name="star" size={16} color="#F59E0B" />
      ))}
      {hasHalfStar && (
        <Ionicons name="star-half" size={16} color="#F59E0B" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#F59E0B" />
      ))}
      <Text className="text-sm ml-2 font-semibold" style={{ color: '#F59E0B' }}>
        {rating.toFixed(1)}
      </Text>
    </View>
  );
};

export default function BookingDetailsScreen({ 
  bookingDetails, 
  onBack,
  onRateSpa,
  onRateTherapist,
  onRebook,
}: BookingDetailsScreenProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isCompleted = bookingDetails.status === BOOKING_STATUS.COMPLETED;
  const insets = useSafeAreaInsets();

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true; // Prevent default behavior (quitting the app)
    });

    return () => backHandler.remove();
  }, [onBack]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Spa Image with Overlay Header */}
        <View className="w-full relative" style={{ height: 250 }}>
          <Image
            source={bookingDetails.spaImage}
            className="w-full h-full"
            resizeMode="cover"
          />
          
          {/* Transparent Header Overlay */}
          <View 
            className="absolute left-0 right-0 flex-row items-center px-5 py-4"
            style={{ 
              backgroundColor: 'transparent',
              top: 0,
              paddingTop: insets.top,
            }}
          >
              <TouchableOpacity 
                onPress={onBack} 
                className="w-10 h-10 items-center justify-center rounded-full mr-3"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text className="text-lg font-semibold" style={{ color: 'white' }}>
                Booking Details
              </Text>
          </View>
          
          {/* Floating Heart Button */}
          <TouchableOpacity 
            className="absolute bottom-0 right-5 items-center justify-center rounded-full"
            style={{ 
              backgroundColor: 'white',
              width: 50,
              height: 50,
              marginBottom: -25, // Half overlaps into details section
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => {
              // TODO: Implement add to favorites functionality
              console.log('Add to favorites:', bookingDetails.id);
            }}
          >
            <Ionicons name="heart-outline" size={24} color={primaryColor} />
          </TouchableOpacity>
        </View>

        <View className="px-5 py-4">
          {/* Spa Name */}
          <Text className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
            {bookingDetails.spaName}
          </Text>

          {/* Address */}
          <View className="flex-row items-center mb-4">
            <Ionicons name="location-outline" size={16} color={colors.icon} />
            <Text className="text-sm ml-1" style={{ color: colors.icon }}>
              {bookingDetails.address}
            </Text>
          </View>

          {/* Spa Rating */}
          <View className="mb-4">
            <StarRating rating={bookingDetails.spaRating} />
          </View>

          {/* Map */}
          <View className="mb-4">
            <MapPlaceholder 
              latitude={bookingDetails.latitude} 
              longitude={bookingDetails.longitude} 
            />
          </View>

          {/* Spa Details */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
              Spa Details
            </Text>
            <Text className="text-sm leading-5" style={{ color: colors.icon }}>
              {bookingDetails.spaDetails}
            </Text>
          </View>

          {/* Service Information Section */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
              Service Information
            </Text>
            
            {/* Service Name */}
            <View className="mb-3 flex-row items-center">
              <Ionicons name="sparkles-outline" size={18} color={colors.primary} />
              <Text className="text-base font-semibold ml-2" style={{ color: colors.text }}>
                {bookingDetails.serviceName}
              </Text>
            </View>

            {/* Therapist Name */}
            <View className="mb-3 flex-row items-start">
              <Ionicons name="person-outline" size={18} color={colors.primary} style={{ marginTop: 2 }} />
              <View className="ml-2 flex-1">
                <Text className="text-base font-semibold" style={{ color: colors.text }}>
                  {bookingDetails.therapistName}
                </Text>
                <Text className="text-sm mt-1" style={{ color: colors.icon }}>
                  {bookingDetails.therapistTitle}
                </Text>
              </View>
            </View>

            {/* Date and Time */}
            <View className="mb-3">
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={18} color={colors.primary} />
                <Text className="text-base font-semibold ml-2" style={{ color: colors.text }}>
                  {bookingDetails.date}
                </Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Ionicons name="time-outline" size={18} color={colors.primary} />
                <Text className="text-base font-semibold ml-2" style={{ color: colors.text }}>
                  {bookingDetails.time}
                </Text>
              </View>
            </View>

            {/* Price */}
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold ml-2" style={{ color: primaryColor }}>
                ₱{bookingDetails.price.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Rate Buttons (only for completed bookings - status 2) */}
          {isCompleted ? (
            <View className="mb-6">
              <View className="flex-row mb-2">
                <TouchableOpacity
                  className="flex-1 flex-row items-center justify-center px-4 py-3 rounded-xl mr-2 border"
                  style={{ borderColor: primaryColor, backgroundColor: 'white' }}
                  onPress={onRateSpa}
                >
                  <Ionicons name="star-outline" size={18} color={primaryColor} />
                  <Text className="text-sm font-semibold ml-2" style={{ color: primaryColor }}>
                    Rate Spa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 flex-row items-center justify-center px-4 py-3 rounded-xl border"
                  style={{ borderColor: primaryColor, backgroundColor: 'white' }}
                  onPress={onRateTherapist}
                >
                  <Ionicons name="person-outline" size={18} color={primaryColor} />
                  <Text className="text-sm font-semibold ml-2" style={{ color: primaryColor }}>
                    Rate Therapist
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* Booking Information Section */}
          <View className="mb-6 pt-4 border-t" style={{ borderTopColor: '#E5E7EB' }}>
            <Text className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
              Booking Information
            </Text>
            
            {/* Booking ID */}
            <View className="mb-3 flex-row items-center">
              <Ionicons name="receipt-outline" size={18} color={colors.text} />
              <Text className="text-base font-semibold ml-2" style={{ color: colors.text }}>
                {bookingDetails.bookingId}
              </Text>
            </View>

            {/* Paid By */}
            <View className="mb-4 flex-row items-center">
              <Ionicons name="wallet-outline" size={18} color={colors.text} />
              <Text className="text-base font-semibold ml-2" style={{ color: colors.text }}>
                Paid By: {bookingDetails.paidBy}
              </Text>
            </View>

            {/* Download Invoice Button */}
            <TouchableOpacity
              className="w-full flex-row items-center justify-center px-4 py-3 rounded-xl border"
              style={{ borderColor: primaryColor, backgroundColor: 'white' }}
              onPress={() => {
                // TODO: Implement download invoice functionality
                console.log('Download invoice:', bookingDetails.bookingId);
              }}
            >
              <Ionicons name="download-outline" size={18} color={primaryColor} />
              <Text className="text-sm font-semibold ml-2" style={{ color: primaryColor }}>
                Download Invoice
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer Button: Rebook */}
      <View className="px-5 py-4 border-t" style={{ borderTopColor: '#E5E7EB' }}>
        <TouchableOpacity
          className="w-full flex-row items-center justify-center px-4 py-4 rounded-xl"
          style={{ backgroundColor: primaryColor }}
          onPress={onRebook}
        >
          <Ionicons name="refresh" size={20} color="white" />
          <Text className="text-base text-white font-semibold ml-2">Rebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
