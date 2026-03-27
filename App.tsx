import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import AppNavigator from './src/navigation';
import { useAppStore } from './src/store';
import { initializeDatabase } from './src/db/database';
import { COLORS } from './src/constants';

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  const themeMode = useAppStore(s => s.themeMode);
  const loadSettings = useAppStore(s => s.loadSettings);

  useEffect(() => {
    async function init() {
      await loadSettings();
      await initializeDatabase();
      setDbReady(true);
    }
    init();
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const theme = themeMode === 'dark' ? {
    ...MD3DarkTheme,
    colors: { ...MD3DarkTheme.colors, primary: COLORS.primaryLight },
  } : {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, primary: COLORS.primary },
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
        <AppNavigator />
        <Toast />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
