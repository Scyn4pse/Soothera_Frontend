import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { RisingItem } from '@/components/native/RisingItem';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  colors: typeof Colors.light;
  textColor?: string;
  iconColor?: string;
}

function SettingItem({ icon, label, onPress, colors, textColor, iconColor }: SettingItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-4 px-4"
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={24} color={iconColor || colors.icon} />
      <Text className="text-base ml-4 flex-1" style={{ color: textColor || colors.text }}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={20} color={iconColor || colors.icon} />
    </TouchableOpacity>
  );
}

interface ProfileScreenProps {
  isActive?: boolean;
}

export default function ProfileScreen({ isActive }: ProfileScreenProps = {}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const isVisible = isActive ?? true;
  const [imageError, setImageError] = useState(false);
  const maxAnimatedFavorites = 6;
  const maxAnimatedRecommended = 6;
  const perItemDelay = 60;
  
  // User data
  const userName = 'User Profile';
  const userEmail = 'profile@soothera.com';
  const profileImage = require('../../../assets/pfp.png');

  // Mock data for recommended salons
  const recommendedSalons = [
    { id: '1', name: 'Salon Elite', rating: 4.8, location: 'Talamban, Cebu', image: require('../../../assets/salon.jpg') },
    { id: '2', name: 'Beauty Haven', rating: 4.9, location: 'Banilad, Cebu', image: require('../../../assets/salon.jpg') },
    { id: '3', name: 'Style Studio', rating: 4.7, location: 'Mandaue City, Cebu', image: require('../../../assets/salon.jpg') },
    { id: '4', name: 'Glamour House', rating: 4.8, location: 'Lapu-Lapu City, Cebu', image: require('../../../assets/salon.jpg') },
  ];

  // Mock data for favorite salons
  const favoriteSalons = [
    { id: '1', name: 'Luxury Spa', rating: 4.9, location: 'Cebu City, Cebu', image: require('../../../assets/salon.jpg') },
    { id: '2', name: 'Relaxation Center', rating: 4.8, location: 'Mactan, Cebu', image: require('../../../assets/salon.jpg') },
    { id: '3', name: 'Wellness Studio', rating: 4.7, location: 'IT Park, Cebu', image: require('../../../assets/salon.jpg') },
  ];

  return (
    <View className="flex-1 bg-white dark:bg-[#151718]">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 70 }}
      >
        {/* Profile Header */}
        <RisingItem delay={0} visible={isVisible}>
          <View className="items-center py-6">
            <View
              className="w-[100px] h-[100px] rounded-full justify-center items-center mb-4 overflow-hidden"
              style={{ backgroundColor: colors.primary }}
            >
              {!imageError ? (
                <Image
                  source={profileImage}
                  className="w-full h-full"
                  resizeMode="cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <Text className="text-[40px] font-bold text-white">
                  {userName.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>
            <Text className="text-[28px] font-bold mb-1 dark:text-[#ECEDEE]" style={{ color: colors.text }}>
              {userName}
            </Text>
            <Text className="text-base dark:text-[#9BA1A6]" style={{ color: colors.icon }}>
              {userEmail}
            </Text>
          </View>
        </RisingItem>

        {/* Settings Card */}
        <View className="mx-5 mb-5 rounded-2xl bg-white dark:bg-[#1F1F1F] shadow-sm" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>
          <RisingItem delay={80} offset={10} visible={isVisible}>
            <View>
              <View className="px-4 pt-4 pb-2">
                <Text className="text-lg font-bold" style={{ color: colors.text }}>
                  Settings
                </Text>
              </View>
              <View className="border-t border-gray-200 dark:border-[#2a2a2a]">
                <SettingItem icon="person-outline" label="Profile" colors={colors} />
                <SettingItem icon="lock-closed-outline" label="Password" colors={colors} />
                <SettingItem icon="notifications-outline" label="Notifications" colors={colors} />
              </View>
            </View>
          </RisingItem>
        </View>

        {/* More Card */}
        <View className="mx-5 mb-5 rounded-2xl bg-white dark:bg-[#1F1F1F] shadow-sm" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>
          <RisingItem delay={140} offset={10} visible={isVisible}>
            <View>
              <View className="px-4 pt-4 pb-2">
                <Text className="text-lg font-bold" style={{ color: colors.text }}>
                  More
                </Text>
              </View>
              <View className="border-t border-gray-200 dark:border-[#2a2a2a]">
                <SettingItem icon="help-circle-outline" label="Help" colors={colors} />
                <SettingItem icon="log-out-outline" label="Logout" colors={colors} textColor="#EF4444" iconColor="#EF4444" />
              </View>
            </View>
          </RisingItem>
        </View>

        {/* Your Favorites Section */}
        <RisingItem delay={200} visible={isVisible}>
          <View className="mb-6">
            <View className="flex-row items-center justify-between px-5 mb-4">
              <Text className="text-xl font-bold" style={{ color: colors.text }}>
                Your Favorites
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
              {favoriteSalons.map((salon, index) => {
                const delay = 240 + Math.min(index, maxAnimatedFavorites) * perItemDelay;
                const shouldAnimate = isVisible && index < maxAnimatedFavorites;
                const card = (
                  <View className="w-56">
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
                );

                return shouldAnimate ? (
                  <RisingItem key={salon.id} delay={delay} visible={isVisible} style={{ width: 224, marginRight: 16 }}>
                    {card}
                  </RisingItem>
                ) : (
                  <View key={salon.id} style={{ width: 224, marginRight: 16 }}>
                    {card}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </RisingItem>

        {/* You May Also Like Section */}
        <RisingItem delay={260} visible={isVisible}>
          <View className="mb-6 pb-2">
            <View className="flex-row items-center justify-between px-5 mb-4">
              <Text className="text-xl font-bold" style={{ color: colors.text }}>
                You May Also Like
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
              {recommendedSalons.map((salon, index) => {
                const delay = 300 + Math.min(index, maxAnimatedRecommended) * perItemDelay;
                const shouldAnimate = isVisible && index < maxAnimatedRecommended;
                const card = (
                  <View className="w-56">
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
                );

                return shouldAnimate ? (
                  <RisingItem key={salon.id} delay={delay} visible={isVisible} style={{ width: 224, marginRight: 16 }}>
                    {card}
                  </RisingItem>
                ) : (
                  <View key={salon.id} style={{ width: 224, marginRight: 16 }}>
                    {card}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </RisingItem>

      </ScrollView>
    </View>
  );
}
