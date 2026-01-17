import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { services } from '../configs/mockData';

interface ServicesProps {
  onSeeAll?: () => void;
}

export function Services({ onSeeAll }: ServicesProps = {}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingEnd = 60; // paddingRight value to accommodate arrow button
    const isEnd = layoutMeasurement.width + contentOffset.x >= contentSize.width - paddingEnd - 10;
    
    if (isEnd && !isAtEnd) {
      setIsAtEnd(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (!isEnd && isAtEnd) {
      setIsAtEnd(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Pulsing animation when arrow is visible
  useEffect(() => {
    if (isAtEnd) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isAtEnd]);

  const handleArrowPress = () => {
    onSeeAll?.();
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center px-5 mb-4">
        <Text className="text-xl font-bold" style={{ color: colors.text }}>
          Massage Services
        </Text>
      </View>

      <View className="relative">
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingRight: 60 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {services.slice(0, 5).map((service) => (
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

        {/* Animated Arrow Button - Centered within image row */}
        <Animated.View
          style={{
            position: 'absolute',
            right: 20,
            top: 28, // (96px image height - 40px button height) / 2 = 28px
            opacity: fadeAnim,
            zIndex: 10,
          }}
          pointerEvents={isAtEnd ? 'auto' : 'none'}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateX: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 3],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              onPress={handleArrowPress}
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: primaryColor }}
              activeOpacity={0.8}
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      scale: pulseAnim,
                    },
                  ],
                }}
              >
                <Ionicons name="arrow-forward" size={20} color="white" />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}
