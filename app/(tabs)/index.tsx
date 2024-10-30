import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import { FIREBASE_DB } from "@/firebaseConfig"; 
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";

interface Produto {
    id: string,
    tipo: string,
    tamanho: string,
    preco: string
}

export default function HomeScreen() {
    const [produtos, setProdutos] = useState<Produto[]>([]); 
    const [tipo, setTipo] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [preco, setPreco] = useState('');


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(FIREBASE_DB, "Produtos"), (snapshot) => {
            const produtoList: Produto[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Produto[];
            setProdutos(produtoList);
        });

        return () => unsubscribe();
    }, []);

    const addProduto = async () => {
        if (tipo === "") {
            Alert.alert("Por favor, insira um nome.");
            return;
        }
        await addDoc(collection(FIREBASE_DB, "Produtos"), { tipo: tipo, tamanho: tamanho, preco: preco });
        setTipo('');
        setTamanho('');
        setPreco('');
    };

    const deleteProduto = async (id: string) => {
        await deleteDoc(doc(FIREBASE_DB, "Produtos", id));
    };

    const updateProduto = async (id: string) => {
      if (tipo === "") {
          Alert.alert("Por favor, insira um novo nome para o usuário.");
          return;
      }
  
      const produtoRef = doc(FIREBASE_DB, "Produtos", id);
  
      await updateDoc(produtoRef, {
          tipo: tipo,
          tamanho: tamanho,
          preco: preco,
      });
  
      setTipo('');
      setTamanho('');
      setPreco('');
  };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Produto"
                value={tipo}
                onChangeText={setTipo}
            />
            <TextInput
                style={styles.input}
                placeholder="Tamanho"
                value={tamanho}
                onChangeText={setTamanho}
            />
            <TextInput
                style={styles.input}
                placeholder="Preço"
                value={preco}
                onChangeText={setPreco}
            />
            <TouchableOpacity style={styles.button} onPress={addProduto}>
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>

            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.produtoItem}>
                      <Text>{item.id}</Text>
                        <Text>{item.tipo}</Text>
                        <Text>{item.tamanho}</Text>
                        <Text>{item.preco}</Text>
                        <TouchableOpacity onPress={() => deleteProduto(item.id)}>
                            <Text style={styles.deleteButton}>Excluir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => updateProduto(item.id)}>
                            <Text style={styles.deleteButton}>Atualizar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        height: 40,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4b6beb',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
    produtoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    deleteButton: {
        color: 'red',
    },
});
