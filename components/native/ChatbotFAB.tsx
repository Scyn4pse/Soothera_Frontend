import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const FAB_SIZE = 56;
const FAB_BORDER_RADIUS = 14;
const TAB_BAR_HEIGHT = 64;

interface ChatbotFABProps {
  visible?: boolean;
  onOpenChat?: () => void;
  /** Called when user taps the popup close button; use to hide popup until next visit. */
  onPopupDismiss?: () => void;
  /** When false, FAB sits just above safe area (e.g. on Help screen with no tab bar). Default true. */
  floatingAboveTabBar?: boolean;
  /** When true, popup opens automatically on mount. Default false. */
  showPopupInitially?: boolean;
}

export function ChatbotFAB({
  visible = true,
  onOpenChat,
  onPopupDismiss,
  floatingAboveTabBar = true,
  showPopupInitially = false,
}: ChatbotFABProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';
  const [showPopup, setShowPopup] = useState(showPopupInitially);
  const [popupDismissedThisSession, setPopupDismissedThisSession] = useState(false);

  useEffect(() => {
    if (!showPopupInitially) setShowPopup(false);
  }, [showPopupInitially]);
  const popupOpacity = useSharedValue(0);
  const popupTranslateY = useSharedValue(FAB_SIZE + 12);
  const popupTranslateX = useSharedValue(32);
  const popupScale = useSharedValue(0.3);

  const bottomOffset = floatingAboveTabBar
    ? insets.bottom + TAB_BAR_HEIGHT + 16
    : insets.bottom + 16;
  const popupBottom = bottomOffset + FAB_SIZE + 12;

  const POPUP_DELAY_MS = 1000;
  const springConfig = { damping: 35, stiffness: 260 };

  useEffect(() => {
    if (showPopup) {
      popupOpacity.value = 0;
      popupTranslateY.value = FAB_SIZE + 12;
      popupTranslateX.value = 32;
      popupScale.value = 0.3;
      popupOpacity.value = withDelay(POPUP_DELAY_MS, withSpring(1, springConfig));
      popupTranslateY.value = withDelay(POPUP_DELAY_MS, withSpring(0, springConfig));
      popupTranslateX.value = withDelay(POPUP_DELAY_MS, withSpring(0, springConfig));
      popupScale.value = withDelay(POPUP_DELAY_MS, withSpring(1, springConfig));
    }
  }, [showPopup]);

  const handleFABPress = () => {
    if (showPopup) {
      onOpenChat?.();
    } else if (popupDismissedThisSession) {
      onOpenChat?.();
    } else {
      setShowPopup(true);
    }
  };

  const popupAnimatedStyle = useAnimatedStyle(() => ({
    opacity: popupOpacity.value,
    transformOrigin: '100% 100%',
    transform: [
      { translateX: popupTranslateX.value },
      { translateY: popupTranslateY.value },
      { scale: popupScale.value },
    ],
  }));

  if (!visible) return null;

  return (
    <>
      {/* Popup message + close button (above FAB) */}
      {showPopup && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: popupBottom,
              right: Math.max(insets.right, 16),
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: 20,
            },
            popupAnimatedStyle,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setPopupDismissedThisSession(true);
              setShowPopup(false);
              onPopupDismiss?.();
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: isDark ? '#3a3a3a' : '#E5E7EB',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}
          >
            <Ionicons name="close" size={20} color={colors.text} />
          </TouchableOpacity>
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              backgroundColor: isDark ? '#1F1F1F' : '#2a2a2a',
              maxWidth: 240,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 15 }}>
              Hi. Need any help?
            </Text>
          </View>
        </Animated.View>
      )}

      {/* FAB */}
      <TouchableOpacity
        onPress={handleFABPress}
        activeOpacity={0.85}
        style={{
          position: 'absolute',
          bottom: bottomOffset,
          right: Math.max(insets.right, 16),
          width: FAB_SIZE,
          height: FAB_SIZE,
          borderRadius: FAB_BORDER_RADIUS,
          backgroundColor: primaryColor,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 19,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 6,
        }}
      >
        <Ionicons name="chatbubble-ellipses" size={26} color="#fff" />
      </TouchableOpacity>
    </>
  );
}
