import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

export interface TextProps extends RNTextProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Custom Text component that applies CalSans-Regular font by default.
 * Works on both native and web platforms.
 * 
 * You can override the font by passing fontFamily in the style prop.
 * className prop is supported for NativeWind styling.
 */
export const Text = React.forwardRef<RNText, TextProps>(
  ({ style, className, ...props }, ref) => {
    return (
      <RNText
        ref={ref}
        className={className}
        style={[styles.defaultFont, style]}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: 'CalSans-Regular',
  },
});
