import React, { useRef, useEffect } from 'react';
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface SuccessModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  variant?: 'success' | 'error';
  actionLabel?: string;
  onAction?: () => void;
}

const errorColor = '#EF4444';

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  title = 'Booking Rescheduled!',
  message = 'Your booking has been successfully rescheduled. Please wait for the confirmation email.',
  onClose,
  variant = 'success',
  actionLabel,
  onAction,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  // Pulse animation for the status icon
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [visible, pulseAnim]);

  const isError = variant === 'error';
  const statusColor = isError ? errorColor : primaryColor;
  const statusIcon = isError ? 'close-circle' : 'checkmark-circle';
  const buttonLabel = actionLabel || (isError ? 'Close' : 'OK');
  const handleAction = onAction || onClose;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-center items-center p-5">
          <TouchableWithoutFeedback>
            <View
              className={`rounded-2xl p-6 w-full max-w-sm ${
                isDark ? 'bg-[#1f1f1f]' : 'bg-white'
              }`}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              {/* Status Icon */}
              <View className="items-center mb-4">
                <View className="w-24 h-24 items-center justify-center" style={{ position: 'relative' }}>
                  <Animated.View
                    className="absolute w-24 h-24 rounded-full"
                    style={{
                      backgroundColor: statusColor + '20',
                      transform: [{ scale: pulseAnim }],
                    }}
                  />
                  <View style={{ position: 'absolute' }}>
                    <Ionicons name={statusIcon as any} size={64} color={statusColor} />
                  </View>
                </View>
              </View>

              {/* Title */}
              <Text
                className="text-xl font-bold mb-3 text-center"
                style={{ color: colors.text }}
              >
                {title}
              </Text>

              {/* Message */}
              <Text
                className="text-base text-center mb-6"
                style={{ color: colors.icon }}
              >
                {message}
              </Text>

              {/* Action Button */}
              <TouchableOpacity
                className="rounded-xl py-3.5"
                style={{ backgroundColor: statusColor }}
                onPress={handleAction}
                activeOpacity={0.7}
              >
                <Text className="text-white font-semibold text-center">
                  {buttonLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SuccessModal;
