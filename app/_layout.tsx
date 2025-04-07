import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '@/components/ListItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [items, setItems] = useState([{id: 1, text: 'test1'}, {id: 2, text: 'test2'}, {id: 3, text: 'test3'}, {id: 4, text: 'test4'}, {id: 5, text: 'test5'}])

  const handleDeleteItem = (id: number) => {
    const updatedData = items.filter((item) => item.id !== id)
    setItems(updatedData);
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const renderItem = ({item}: {item: {id: number, text: string}}) => <ListItem item={item} onDelete={handleDeleteItem} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={items} renderItem={renderItem} keyExtractor={(item) => item.id}/>
      <View style={styles.add}>
         <Icon name="add" size={40} color="white" style={styles.addIcon} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: 'relative',
    flex: 1
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
