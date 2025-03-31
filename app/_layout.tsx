import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {StyleSheet, ScrollView} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';
import ItemTile from '@/components/item';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      <ItemTile />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    
  },
  scrollview: {
    flexDirection: 'column',
  }
});
