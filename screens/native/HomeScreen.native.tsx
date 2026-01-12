import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [currentDealIndex, setCurrentDealIndex] = useState(0);

  // Mock data for special deals
  const specialDeals = [
    { id: '1', title: 'Get Special Discount.', discount: '40', tag: 'Limited time!' },
    { id: '2', title: 'Summer Sale', discount: '30', tag: 'New' },
    { id: '3', title: 'Weekend Special', discount: '25', tag: 'Hot' },
  ];

  // Mock data for services
  const services = [
    { id: '1', name: 'Filipino', image: require('../../assets/home-massage-spain.jpg') },
    { id: '2', name: 'Swedish', image: require('../../assets/home-massage-spain.jpg') },
    { id: '3', name: 'Shiatsu', image: require('../../assets/home-massage-spain.jpg') },
    { id: '4', name: 'Thai', image: require('../../assets/home-massage-spain.jpg') },
    { id: '5', name: 'Aromatherapy', image: require('../../assets/home-massage-spain.jpg') },
  ];

  // Mock data for top rated salons
  const topRatedSalons = [
    { id: '1', name: 'Salon Elite', rating: 4.8, location: 'Talamban, Cebu', image: require('../../assets/salon.jpg') },
    { id: '2', name: 'Beauty Haven', rating: 4.9, location: 'Banilad, Cebu', image: require('../../assets/salon.jpg') },
    { id: '3', name: 'Style Studio', rating: 4.7, location: 'Mandaue City, Cebu', image: require('../../assets/salon.jpg') },
    { id: '4', name: 'Glamour House', rating: 4.8, location: 'Lapu-Lapu City, Cebu', image: require('../../assets/salon.jpg') },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-4">
          {/* User Profile */}
          <View className="flex-row items-center">
            <Image
              source={require('../../assets/pfp.png')}
              className="w-10 h-10 rounded-full mr-3"
            />
            <Text className="text-base font-semibold" style={{ color: colors.text }}>
              John Doe
            </Text>
          </View>

          {/* Notification Icon */}
          <TouchableOpacity className="relative">
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            <View className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
          </TouchableOpacity>
        </View>

        {/* Search Bar and Filter */}
        <View className="flex-row items-center px-5 py-2 mb-4">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-1 mr-3">
            <Ionicons name="search-outline" size={20} color={colors.icon} />
            <TextInput
              placeholder="Search Salon, Specialist..."
              placeholderTextColor={colors.icon}
              className="flex-1 ml-2 text-base"
              style={{ color: colors.text }}
            />
          </View>
          <TouchableOpacity
            className="w-12 h-12 rounded-xl items-center justify-center"
            style={{ backgroundColor: primaryColor }}
          >
            <Ionicons name="options-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Special Deals Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-5 mb-4">
            <Text className="text-xl font-bold" style={{ color: colors.text }}>
              #SpecialForYou
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-medium" style={{ color: primaryColor }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            className="mb-4"
            scrollEventThrottle={16}
            onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
              const scrollPosition = event.nativeEvent.contentOffset.x;
              const cardWidth = 320 + 16; // w-80 (320px) + mr-4 (16px)
              const currentIndex = Math.round(scrollPosition / cardWidth);
              setCurrentDealIndex(currentIndex);
            }}
            pagingEnabled={false}
            decelerationRate="fast"
          >
            {specialDeals.map((deal, index) => (
              <View
                key={deal.id}
                className="w-80 h-52 rounded-2xl mr-4 overflow-hidden"
                style={{ backgroundColor: '#2C2C2C' }}
              >
                <View className="absolute top-4 left-4 z-10">
                  <View className="bg-white/90 px-3 py-1 rounded-full">
                    <Text className="text-xs font-semibold" style={{ color: primaryColor }}>
                      {deal.tag}
                    </Text>
                  </View>
                </View>

                <View className="flex-1 p-5 justify-between">
                  <Text className="text-2xl font-bold text-white mb-2 mt-8">{deal.title}</Text>
                  <View className="flex-row items-start mb-2">
                    <Text className="text-l font-bold text-white">Up to</Text>
                    <View className="flex-row items-end ml-2">
                      <Text className="text-4xl font-bold text-white">{deal.discount}</Text>
                      <View className="bg-white/20 px-2 py-1 rounded mb-2 ml-1">
                        <Text className="text-sm font-bold text-white">%</Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-white/70">All Salons available | T&C Applied</Text>
                    <TouchableOpacity
                      className="bg-white/20 px-6 py-2 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Text className="text-white font-semibold">Claim</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Page Indicators */}
          <View className="flex-row justify-center items-center">
            {specialDeals.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full mx-1 ${index === currentDealIndex ? 'w-6' : 'w-2'}`}
                style={{ backgroundColor: index === currentDealIndex ? primaryColor : '#E0E0E0' }}
              />
            ))}
          </View>
        </View>

        {/* Services Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-5 mb-4">
            <Text className="text-xl font-bold" style={{ color: colors.text }}>
              Massage Services
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-medium" style={{ color: primaryColor }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {services.map((service) => (
              <View key={service.id} className="mr-4 items-center">
                <View className="w-24 h-24 rounded-xl overflow-hidden mb-2 bg-gray-100">
                  <Image
                    source={service.image}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-sm font-medium text-center" style={{ color: colors.text }}>
                  {service.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Top Rated Salons Section */}
        <View className="mb-6 pb-6">
          <View className="flex-row items-center justify-between px-5 mb-4">
            <Text className="text-xl font-bold" style={{ color: colors.text }}>
              Top Rated Salons
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-medium" style={{ color: primaryColor }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {topRatedSalons.map((salon) => (
              <View key={salon.id} className="w-56 mr-4">
                <View className="relative rounded-2xl overflow-hidden mb-2">
                  <Image
                    source={salon.image}
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                  <View className="absolute bottom-2 right-2 flex-row items-center bg-black/60 px-2 py-1 rounded-full">
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text className="text-white text-sm font-semibold ml-1">{salon.rating}</Text>
                  </View>
                </View>
                <View>
                  <Text className="text-base font-semibold mb-1" style={{ color: colors.text }}>
                    {salon.name}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={14} color={colors.icon} />
                    <Text className="text-sm ml-1" style={{ color: colors.icon }}>
                      {salon.location}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
