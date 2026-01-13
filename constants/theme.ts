/**
 * Theme colors for the app. Supports light and dark mode.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
export const primaryColor = '#4C7A6C';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    primary: primaryColor,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    primary: primaryColor,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

/**
 * Typography configuration
 */
export const Typography = {
  fontFamily: 'Poppins',
  default: {
    fontFamily: 'Poppins',
  },
};
