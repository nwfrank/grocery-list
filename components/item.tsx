import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ItemTile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <View style={styles.iconContainer}>
        <Icon name="edit" size={24} color="black" style={styles.deleteIcon} />
        <Icon name="drag-handle" size={24} color="black" style={styles.dragIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    margin: 5,
    flexDirection: 'row', // Align items horizontally
    paddingRight: 10, // Add padding to prevent icons from touching the edge
  },
  text: {
    fontSize: 20,
    color: 'black',
    flex: 1, // This makes the text take available space
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dragIcon: {
    marginLeft: 10,
  },
  deleteIcon: {
    marginLeft: 10,
  }
});

export default ItemTile;
