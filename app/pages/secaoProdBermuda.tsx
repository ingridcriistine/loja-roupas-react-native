import { Item } from '@/components/item';
import { FIREBASE_DB } from '@/firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Text, SafeAreaView, FlatList, StatusBar, View, TouchableOpacity} from 'react-native';

interface Produto {
  id: string,
  desc: string,
  tipo: string,
  tamanho: string,
  preco: string
}

export default function TabTwoScreen() {
  const [produtos, setProdutos] = useState<Produto[]>([]); 

  useEffect(() => {
      const unsubscribe = onSnapshot(collection(FIREBASE_DB, "Produtos"), (snapshot) => {
          const produtoList: Produto[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Produto[];
          const newFiltered = produtoList?.filter((item) => (item.tipo.toLowerCase() === "bermuda"));
          setProdutos(newFiltered);
    });

    return () => unsubscribe();
}, []);

  
  return (
    <>
      <Text style={styles.text}>Camisetas</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <View style={styles.produtoItem}>
                  <Text style={styles.title}>{item.desc}</Text>
                  <Text>{item.tamanho}</Text>
                  <Text>{item.preco}</Text>
              </View>
          )} 
        />
      </SafeAreaView>
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
    margin: 30
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
    fontSize: 20,
    padding: 25
  },
  background: {
    paddingHorizontal: 20,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 10,
  },
  produtoItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 20
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 18,
    marginTop: 35,
    alignItems: 'center'
  },
  submenu: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
    padding: 5,
  }
});
