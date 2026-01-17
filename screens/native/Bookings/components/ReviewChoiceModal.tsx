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
              className="rounded-2xl p-8 w-full max-w-sm bg-white"
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
                className="text-base font-medium mb-8 text-center"
                style={{ color: colors.text }}
              >
                How was it? Please rate our service.
              </Text>

              {/* Circular Buttons Container */}
              <View className="flex-row justify-center items-center mb-2" style={{ gap: 32 }}>
                {/* Rate Spa Button */}
                <TouchableOpacity
                  className="items-center"
                  onPress={onChooseSpa}
                  activeOpacity={0.7}
                >
                  <View
                    className="w-20 h-20 rounded-full items-center justify-center border-2"
                    style={{
                      borderColor: '#E5E7EB',
                    }}
                  >
                    <Ionicons name="business-outline" size={32} color={primaryColor} />
                  </View>
                  <Text
                    className="text-sm font-medium mt-3 text-center"
                    style={{ color: colors.text }}
                  >
                    Rate Spa
                  </Text>
                </TouchableOpacity>

                {/* Rate Therapist Button */}
                <TouchableOpacity
                  className="items-center"
                  onPress={onChooseTherapist}
                  activeOpacity={0.7}
                >
                  <View
                    className="w-20 h-20 rounded-full items-center justify-center border-2"
                    style={{
                      borderColor: '#E5E7EB',
                    }}
                  >
                    <Ionicons name="person-outline" size={32} color={primaryColor} />
                  </View>
                  <Text
                    className="text-sm font-medium mt-3 text-center"
                    style={{ color: colors.text }}
                  >
                    Rate Therapist
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
