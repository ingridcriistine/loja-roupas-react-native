import { Item } from '@/components/item';
import { FIREBASE_DB } from '@/firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Text, SafeAreaView, FlatList, StatusBar, View, TouchableOpacity} from 'react-native';

interface Produto {
  id: string,
  tipo: string,
  tamanho: string,
  preco: string
}

export default function TabTwoScreen() {
  const [produtos, setProdutos] = useState<Produto[]>([]); 

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, "Produtos"), (snapshot) => {
        const produtoList: Produto[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Produto[];
        setProdutos(produtoList);
    });

    return () => unsubscribe();
}, []);
  
  return (
    <>
      <Text style={styles.text}>Produtos</Text>
      <Link href={'/pages/secaoProdCamiseta'} style={styles.submenu}>Camisetas</Link>
      <Link href={'/pages/secaoProdCamiseta'} style={styles.submenu}>Blusas</Link>
      <Link href={'/pages/secaoProdBermuda'} style={styles.submenu}>Bermudas</Link>
      <Link href={'/pages/secaoProdCamiseta'} style={styles.submenu}>Calças</Link>
      <Link href={'/pages/secaoProdCamiseta'} style={styles.submenu}>Jaquetas de couro</Link>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <View style={styles.produtoItem}>
                  <Text style={styles.title}>{item.tipo}</Text>
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
    margin: 30,
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
    marginBottom: 35,
    marginTop: 35,
    alignItems: 'center',
    fontWeight: 'bold'
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
