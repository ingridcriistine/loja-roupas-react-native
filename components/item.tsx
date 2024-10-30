import { View, StyleSheet, Text } from "react-native"
import { Image } from "expo-image"
import React from "react"


export const Item = ({tipo, tamanho, preco} : {tipo:string, tamanho:string, preco:string}) => {
    return(
        <>
            <View style={styles.itemList}>
                <Text style={styles.fontText}>{tipo}</Text>
                <Text>{tamanho}</Text>
                <Text>{preco}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create ({
    itemList: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#4168a4d4",
        margin: 10,
        height: 80,
        paddingHorizontal: 10
    },
    img: {
        width: 30,
        height: 30
    },
    fontText: {
        fontFamily: "Poppins"
    }
})