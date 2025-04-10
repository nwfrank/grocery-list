import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "@/components/ListItem";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  addOrUpdateItem,
  getShoppingList,
  ShoppingItem,
} from "@/utils/shoppingListStorage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [itemLabel, setItemLabel] = useState("");

  const addItem = () => {
    if (!itemName || !itemAmount) return;

    const newItem: ShoppingItem = {
      item: itemName,
      amount: parseInt(itemAmount, 10),
      id: 0,
      label: itemLabel,
    };

    setItems((prev) => [...prev, newItem]);
    setItemName("");
    setItemAmount("");
    setModalVisible(false);
    addOrUpdateItem(newItem);
  };

  const handleDeleteItem = (id: number) => {
    const updatedData = items.filter((item) => item.id !== id);
    setItems(updatedData);
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    (async () => {
      const list = await getShoppingList();
      setItems(list);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  const renderItem = ({ item }: { item: ShoppingItem }) => (
    <ListItem item={item} onDelete={handleDeleteItem} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.add}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" size={40} color="white" style={styles.addIcon} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item name"
              value={itemName}
              onChangeText={setItemName}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              value={itemAmount}
              onChangeText={setItemAmount}
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <Button title="Add" onPress={addItem} />
              <Button
                title="Cancel"
                color="gray"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: "relative",
    flex: 1,
  },
  scrollview: {
    flexDirection: "column",
  },
  add: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    height: 65,
    width: 65,
    borderRadius: 50,
    position: "absolute",
    bottom: 25,
    right: 25,
  },
  addIcon: {},
  pad: {
    height: 60,
    width: "100%",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
