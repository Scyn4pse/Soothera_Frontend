import React from 'react';
import { StatusBar } from 'expo-status-bar';
import WebLayout from './components/web/WebLayout';

import './global.css';

export default function App() {
  return (
    <>
      <WebLayout />
      <StatusBar style="auto" />
    </>
  );
}
