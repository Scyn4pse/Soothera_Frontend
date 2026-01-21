import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleProp, ViewProps, ViewStyle } from 'react-native';

interface RisingItemProps extends ViewProps {
  children: React.ReactNode;
  visible?: boolean;
  duration?: number;
  exitDuration?: number;
  delay?: number;
  offset?: number;
  style?: StyleProp<ViewStyle>;
  fadeIn?: boolean;
}

/**
 * Lightweight rising + fade-in for individual elements.
 * Runs once on mount to avoid repeated re-animations on re-render.
 */
export function RisingItem({
  children,
  visible,
  duration = 450,
  exitDuration = 280,
  delay = 0,
  offset = 18,
  style,
  fadeIn = true,
  ...rest
}: RisingItemProps) {
  const isVisible = visible ?? true;
  const translateY = useRef(new Animated.Value(offset)).current;
  const opacity = useRef(new Animated.Value(fadeIn ? 0 : 1)).current;
  const [rendered, setRendered] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setRendered(true);
      translateY.setValue(offset);
      if (fadeIn) {
        opacity.setValue(0);
      }

      const animations = [
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ];

      if (fadeIn) {
        animations.push(
          Animated.timing(opacity, {
            toValue: 1,
            duration,
            delay,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          })
        );
      }

      Animated.parallel(animations).start();
    } else {
      const animations = [
        Animated.timing(translateY, {
          toValue: offset,
          duration: exitDuration,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ];

      if (fadeIn) {
        animations.push(
          Animated.timing(opacity, {
            toValue: 0,
            duration: exitDuration,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          })
        );
      }

      Animated.parallel(animations).start(({ finished }) => {
        if (finished) {
          setRendered(false);
        }
      });
    }
  }, [delay, duration, exitDuration, isVisible, offset, opacity, translateY, fadeIn]);

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
