import React, { useRef, useState } from 'react';
import { Animated, PanResponder, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ItemTile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Centered Text</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="edit" size={24} color="black" style={styles.deleteIcon} />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
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
