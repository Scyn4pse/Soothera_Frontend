import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NativeNavigator from './navigation/NativeNavigator';
import './global.css';

// This is the native entry point with custom state-based navigation
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NativeNavigator />
    </SafeAreaProvider>
  );
}
