import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import WebLayout from './components/web/WebLayout';

import './global.css';

export default function App() {
  const [fontsLoaded] = useFonts({
    'CalSans-Regular': require('./assets/fonts/CalSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <WebLayout />
      <StatusBar style="auto" />
    </>
  );
}
