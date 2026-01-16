import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NativeNavigator from './navigation/NativeNavigator';
import { ConfirmationModalProvider } from './components/native/ConfirmationModalContext';
import './global.css';

// This is the native entry point with custom state-based navigation
export default function App() {
  const [fontsLoaded] = useFonts({
    'CalSans-Regular': require('./assets/fonts/CalSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ConfirmationModalProvider>
        <StatusBar style="auto" />
        <NativeNavigator />
      </ConfirmationModalProvider>
    </SafeAreaProvider>
  );
}
