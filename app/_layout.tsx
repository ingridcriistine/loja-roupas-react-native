import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Text } from 'react-native';
import { useEffect } from 'react';
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import React from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    Anton: require('../assets/fonts/Anton-Regular.ttf'),
    Poppins: Poppins_700Bold
  });
  
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="register" options={{headerShown: false}}></Stack.Screen>
      </Stack>
    </>
  );
}
