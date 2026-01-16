import React from 'react';
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface ReviewChoiceModalProps {
  visible: boolean;
  onChooseSpa: () => void;
  onChooseTherapist: () => void;
  onCancel: () => void;
}

export default function ReviewChoiceModal({
  visible,
  onChooseSpa,
  onChooseTherapist,
  onCancel,
}: ReviewChoiceModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
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
              {/* Title */}
              <Text
                className="text-xl font-semibold mb-6 text-center"
                style={{ color: colors.text }}
              >
                Choose What to Review
              </Text>

              {/* Spa Option */}
              <TouchableOpacity
                className={`flex-row items-center p-4 rounded-xl mb-3 border ${
                  isDark ? 'border-[#3a3a3a]' : 'border-gray-200'
                }`}
                style={{ backgroundColor: isDark ? '#2a2a2a' : '#F9FAFB' }}
                onPress={onChooseSpa}
                activeOpacity={0.7}
              >
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: `${primaryColor}20` }}
                >
                  <Ionicons name="business-outline" size={24} color={primaryColor} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold mb-1" style={{ color: colors.text }}>
                    Review Spa
                  </Text>
                  <Text className="text-sm" style={{ color: colors.icon }}>
                    Rate your experience with the spa
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.icon} />
              </TouchableOpacity>

              {/* Therapist Option */}
              <TouchableOpacity
                className={`flex-row items-center p-4 rounded-xl mb-6 border ${
                  isDark ? 'border-[#3a3a3a]' : 'border-gray-200'
                }`}
                style={{ backgroundColor: isDark ? '#2a2a2a' : '#F9FAFB' }}
                onPress={onChooseTherapist}
                activeOpacity={0.7}
              >
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: `${primaryColor}20` }}
                >
                  <Ionicons name="person-outline" size={24} color={primaryColor} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold mb-1" style={{ color: colors.text }}>
                    Review Therapist
                  </Text>
                  <Text className="text-sm" style={{ color: colors.icon }}>
                    Rate your experience with the therapist
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.icon} />
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity
                className={`border rounded-xl py-3.5 ${
                  isDark ? 'border-[#3a3a3a]' : 'border-gray-300'
                }`}
                onPress={onCancel}
                activeOpacity={0.7}
              >
                <Text
                  className="font-semibold text-center"
                  style={{ color: colors.text }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
