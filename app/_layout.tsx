import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {StyleSheet, ScrollView, View, Text} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';
import ItemTile from '@/components/item';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      <View style={styles.pad} />
      </ScrollView>
      <View style={styles.add}>
         <Icon name="add" size={40} color="white" style={styles.addIcon} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: 'relative'
  },
  scrollview: {
    flexDirection: 'column',
  },
  add: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: 65,
    borderRadius: 50,
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  addIcon: {
    
  },
  pad: {
    height: 60,
    width: '100%'
  }
});
