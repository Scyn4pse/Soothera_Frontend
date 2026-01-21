import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface RisingPageProps {
  visible: boolean;
  children: React.ReactNode;
  duration?: number;
  offset?: number;
  style?: StyleProp<ViewStyle>;
  fillContainer?: boolean;
  fadeIn?: boolean;
  fadeOut?: boolean;
}

/**
 * Simple enter/exit wrapper that moves content up/down.
 * Keeps the child mounted until the exit animation finishes so the
 * transition is visible on screen changes.
 */
export function RisingPage({
  visible,
  children,
  duration = 260,
  offset = 28,
  style,
  fillContainer = true,
  fadeIn = true,
  fadeOut = true,
}: RisingPageProps) {
  const translateY = useRef(new Animated.Value(offset)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [rendered, setRendered] = useState(visible);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      translateY.setValue(offset);
      opacity.setValue(fadeIn ? 0 : 1);

      const animations = [
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ];
      if (fadeIn) {
        animations.push(
          Animated.timing(opacity, {
            toValue: 1,
            duration,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          })
        );
      }

      Animated.parallel(animations).start();
    } else {
      // Exit: fade+drop, keep mounted until finished
      const animations = [
        Animated.timing(translateY, {
          toValue: offset,
          duration,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ];
      if (fadeOut) {
        animations.push(
          Animated.timing(opacity, {
            toValue: 0,
            duration,
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
  }, [fadeIn, fadeOut, visible, duration, offset, opacity, translateY]);

  if (!rendered) return null;

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        fillContainer ? styles.fill : undefined,
        style,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
