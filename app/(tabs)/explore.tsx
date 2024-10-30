import { Item } from '@/components/item';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Image, Text, SafeAreaView, FlatList, StatusBar} from 'react-native';

export default function TabTwoScreen() {
  return (
    <>
      <Text>Produtos</Text>
      {/* <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.background}
          data={data}
          renderItem={({ item }) => (
            <Item
              tipo={item.tipo}
              tamanho={item.tamanho}
              preco={item.preco}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView> */}
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
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 32,
  },
  background: {
    paddingHorizontal: 20,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
