import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import { FIREBASE_DB } from "@/firebaseConfig"; 
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";

interface Produto {
    id: string,
    desc: string,
    tipo: string,
    tamanho: string,
    preco: string
}

export default function HomeScreen() {
    const [produtos, setProdutos] = useState<Produto[]>([]); 
    const [desc, setDesc] = useState('');
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
            Alert.alert("Por favor, insira um tipo.");
            return;
        }
        await addDoc(collection(FIREBASE_DB, "Produtos"), { desc: desc, tipo: tipo, tamanho: tamanho, preco: preco });
        setDesc('');
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
  
      setDesc('');
      setTipo('');
      setTamanho('');
      setPreco('');
  };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Gerenciar Produtos</Text>
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={desc}
                onChangeText={setDesc}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo"
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
                        <View >
                            <Text>{item.id}</Text>
                            <Text>{item.desc}</Text>
                            <Text>{item.tipo}</Text>
                            <Text>{item.tamanho}</Text>
                            <Text>{item.preco}</Text>
                        </View>
                        <View style={styles.produtoConfig}>
                            <TouchableOpacity onPress={() => deleteProduto(item.id)}>
                                <Text style={styles.deleteButton}>Excluir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateProduto(item.id)}>
                                <Text style={styles.deleteButton}>Atualizar</Text>
                            </TouchableOpacity>
                        </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        marginTop: 20
    },
    produtoConfig: {
        padding: 20,
        gap: 5,
        alignItems: 'center',
    },
    deleteButton: {
        color: 'red',
    },
    text: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 18,
        marginBottom: 25,
        alignItems: 'center'
    }
});
