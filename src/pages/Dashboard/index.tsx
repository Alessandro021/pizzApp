import React, {useContext} from "react";
import {SafeAreaView ,View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import cores from '../../utils'

import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard(){

    const {signOut} = useContext(AuthContext)
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Novo pedido</Text>
                
                <TextInput style={styles.input}
                    placeholder="Numero da mesa"
                    placeholderTextColor="#F0F0F0"
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        Abrir mesa
                    </Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: cores.CORES.dark_700
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: cores.CORES.white,
        marginBottom: 24,
    },

    input:{
        width: "90%",
        height: 70,
        backgroundColor: cores.CORES.dark_900,
        borderRadius: 8,
        paddingHorizontal: 8,
        textAlign: "center",
        fontSize: 22,
        color: cores.CORES.white_900
    },
    button:{
        width: "90%",
        height: 50,
        backgroundColor: cores.CORES.green_900,
        borderRadius: 8,
        marginVertical: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText:{
        fontSize: 20,
        color: cores.CORES.dark_900,
        fontWeight: "bold",
    }

})