import React from "react"
import { View, Image, Text, ImageSourcePropType, StyleSheet } from "react-native"


export const Header = ({image} : {image: ImageSourcePropType}) => {
    return (
        <>
            <View style={styles.background}>
                <Text style={styles.colorText}>Loja de Roupas</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create ({
    background: {
        backgroundColor: "#090909",
        display: "flex",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 30
    },
    colorText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: "Poppins"
    },
    fontText: {
        fontFamily: "Anton",
        color: "white"
    }

})
