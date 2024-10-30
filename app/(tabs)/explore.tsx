import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Image, Text} from 'react-native';

export default function TabTwoScreen() {
  return (
    <>
      <Text>Produtos</Text>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
