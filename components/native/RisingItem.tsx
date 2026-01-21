import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleProp, ViewProps, ViewStyle } from 'react-native';

interface RisingItemProps extends ViewProps {
  children: React.ReactNode;
  visible?: boolean;
  duration?: number;
  delay?: number;
  offset?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Lightweight rising + fade-in for individual elements.
 * Runs once on mount to avoid repeated re-animations on re-render.
 */
export function RisingItem({
  children,
  visible,
  duration = 280,
  delay = 0,
  offset = 18,
  style,
  ...rest
}: RisingItemProps) {
  const isVisible = visible ?? true;
  const translateY = useRef(new Animated.Value(offset)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [rendered, setRendered] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setRendered(true);
      translateY.setValue(offset);
      opacity.setValue(0);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: offset,
          duration,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setRendered(false);
        }
      });
    }
  }, [delay, duration, isVisible, offset, opacity, translateY]);

  if (!rendered) {
    return null;
  }

  return (
    <Animated.View
      pointerEvents={isVisible ? 'auto' : 'none'}
      style={[
        style,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
}
