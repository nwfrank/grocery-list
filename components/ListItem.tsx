import { ShoppingItem } from "@/utils/shoppingListStorage";
import React, { useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ListItem = ({
  item,
  onDelete,
}: {
  item: ShoppingItem;
  onDelete: Function;
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isSwiping, setIsSwiping] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: (_, gestureState) => {
        const isHorizontal =
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        if (isHorizontal) setIsSwiping(true);
        return isHorizontal;
      },

      onPanResponderMove: (_, gestureState) => {
        if (isSwiping && gestureState.dx < 0) {
          translateX.setValue(Math.max(gestureState.dx, -100));
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          Animated.spring(translateX, {
            toValue: -100,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
        setIsSwiping(false); // Reset after release
      },

      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: () => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        setIsSwiping(false);
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{ translateX: translateX }],
      }}
    >
      <View style={styles.container} {...panResponder.panHandlers}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.item}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="edit" size={24} color="black" style={styles.deleteIcon} />
        </View>
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={styles.deleteButton}
        >
          <Icon
            name="delete"
            size={24}
            color="black"
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    flexDirection: "row",
    paddingRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteIcon: {
    marginLeft: 10,
  },
  deleteButton: {
    width: 100,
    height: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -101,
  },
});

export default ListItem;
