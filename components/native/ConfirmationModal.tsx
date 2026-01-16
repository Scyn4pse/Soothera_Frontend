import React from 'react';
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonColor?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonColor,
  icon,
  iconColor,
  onConfirm,
  onCancel,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  const defaultConfirmColor = confirmButtonColor || primaryColor;
  const defaultIconColor = iconColor || defaultConfirmColor;

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
              {/* Icon */}
              {icon && (
                <View className="items-center mb-4">
                  <View
                    className="w-16 h-16 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${defaultIconColor}20` }}
                  >
                    <Ionicons name={icon} size={32} color={defaultIconColor} />
                  </View>
                </View>
              )}

              {/* Title */}
              <Text
                className="text-xl font-semibold mb-3 text-center"
                style={{ color: colors.text }}
              >
                {title}
              </Text>

              {/* Message */}
              <Text
                className="text-base mb-6 text-center leading-6"
                style={{ color: colors.icon }}
              >
                {message}
              </Text>

              {/* Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className={`flex-1 border rounded-xl py-3.5 ${
                    isDark ? 'border-[#3a3a3a]' : 'border-gray-300'
                  }`}
                  onPress={onCancel}
                  activeOpacity={0.7}
                >
                  <Text
                    className="font-semibold text-center"
                    style={{ color: colors.text }}
                  >
                    {cancelText}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 rounded-xl py-3.5"
                  style={{ backgroundColor: defaultConfirmColor }}
                  onPress={onConfirm}
                  activeOpacity={0.7}
                >
                  <Text className="text-white font-semibold text-center">
                    {confirmText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
