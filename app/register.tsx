import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

export default function Register() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
  
    const auth = FIREBASE_AUTH;
    
    // console.log(email, pass);
    // console.log(typeof email, typeof pass);
    
    useEffect (() => {
      console.log(auth.currentUser);
    }, [auth.currentUser]);
  
    useEffect (() => {
      console.log(email, pass, confirmPass);
    }, [email, pass, confirmPass]);
  
    const register = () => {
        if(pass === confirmPass) {
            createUserWithEmailAndPassword(auth, email, pass)
            .then((dadosUsuario) => {
              console.log(dadosUsuario);
              Alert.alert("Cadastrado com sucesso!");
            }) .catch((err) => {
              alert(err.message); 
            });
        } 
        else {
            Alert.alert("ERRO!");
        }
    };
  
    return (
      <LinearGradient
        colors={["#47D4FFFF", "#22A3CAFF", "#7131D6FF", "#771EC0FF"]}
        style={styles.background}
      >
        <Link href={"/"} style={styles.voltar}>VOLTAR AO LOGIN</Link>
        <SafeAreaView style={styles.box}>
          <View style={styles.boxLogin}>
              <Text style={styles.title}>Cadastrar usuário</Text>
              <View>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                  style={styles.input}
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
              />
              <Text style={styles.label}>Senha</Text>
              <TextInput
                  style={styles.input}
                  onChangeText={setPass}
                  value={pass}
                  placeholder="Insira sua senha"
                  keyboardType="default"
                  secureTextEntry={true}
              />
              <Text style={styles.label}>Confirmar senha</Text>
              <TextInput
                  style={styles.input}
                  onChangeText={setConfirmPass}
                  value={confirmPass}
                  placeholder="Confirme sua senha"
                  keyboardType="default"
                  secureTextEntry={true}
              />
              </View>
              <View>
              <TouchableOpacity style={styles.button} onPress={register}>
                  <Text style={styles.btnText}>Cadastrar</Text>
              </TouchableOpacity>
              </View>
          </View>
          <View>
              <Link href={"/register"} style={styles.cadastrar}>Não possui uma conta? Cadastre-se aqui!</Link>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
  
  const styles = StyleSheet.create({
    background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "100%",
    },
    box: {
      display: "flex",
      justifyContent: 'space-between',
      alignItems: "center",
      height: "100%",
    },
    boxLogin: {
      display: "flex",
      justifyContent: 'center',
      alignItems: "center",
      marginTop: 80,
      marginBottom: 20
    },
    title: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 25
    },
    input: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      color: "gray",
      width: 300,
      marginTop: 15,
      marginBottom: 10,
      borderRadius: 5,
      backgroundColor: 'white'
    },
    button: {
      backgroundColor: "#25074DFF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 20,
      borderRadius: 5,
      width: 300,
      paddingVertical: 6
    },
    btnText: {
      fontFamily: "Poppins",
      color: "white",
      fontSize: 13
    },
    label: {
      display: "flex",
      justifyContent: "flex-start",
      color: 'white',
      marginTop: 10
    },
    esqueciSenha: {
      display: 'flex',
      justifyContent: 'flex-end',
      color: 'white',
      fontSize: 11,
      marginBottom: 15
    },
    cadastrar: {
      color: 'white',
      fontSize: 12,
      padding: 30
    },
    img: {
      width: 100,
      height: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30
    },
    voltar: {
        backgroundColor: "#25074DFF",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        borderRadius: 5,
        width: 100,
        paddingVertical: 6,
        fontSize: 10
    }
});