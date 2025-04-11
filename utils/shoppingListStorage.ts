import AsyncStorage from "@react-native-async-storage/async-storage";

export type ShoppingItem = {
  id?: number;
  item: string;
  amount: number;
  label: string;
};

const STORAGE_KEY = "shopping_list";

const setShoppingList = async (list: ShoppingItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Error saving shopping list:", e);
  }
};

export const getShoppingList = async (): Promise<ShoppingItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error loading shopping list:", e);
    return [];
  }
};

export const addOrUpdateItem = async (newItem: ShoppingItem): Promise<void> => {
  const currentList = await getShoppingList();
  const index = currentList.findIndex((i) => i.id === newItem.id);
  if (index !== -1) {
    let maxId = 0;
    for (let i = 0; i < currentList.length; i++) {
      if ((currentList[i].id as number) >= maxId) {
        maxId = currentList[i].id as number;
      }
    }
    newItem.id = maxId;
    currentList[index].amount = newItem.amount;
  } else {
    currentList.push(newItem);
  }
  await setShoppingList(currentList);
};

export const removeItem = async (itemName: string): Promise<void> => {
  const currentList = await getShoppingList();
  const newList = currentList.filter(
    (i) => i.item.toLowerCase() !== itemName.toLowerCase()
  );
  await setShoppingList(newList);
};
