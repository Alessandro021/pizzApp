import React, { useState, useContext } from 'react'
import cores  from '../../utils'
import { Text,View, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'

import { AuthContext } from '../../contexts/AuthContext'



export default function SignIn(){
    const {signIn, loadingAuth} = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin(){
       if(email === "" || password === ""){
        return
       }

       await signIn({email, password})
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo}
            source={require("../../assets/logo.png")}
            resizeMode='contain' 
            />

            <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    placeholder='Digite seu email'
                    placeholderTextColor={cores.CORES.white_900}
                    inputMode='email'
                    value={email}
                    onChangeText={ text => setEmail(text)}
                />

                <TextInput style={styles.input}
                    placeholder='Digite seu senha'
                    placeholderTextColor={cores.CORES.white_900}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>

                    {loadingAuth ? (
                        <ActivityIndicator size={24} color={cores.CORES.white_900}/>
                    ): (
                        <Text style={styles.buttonText}>Entrar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: cores.CORES.dark_700
    },
    logo:{
        width: "60%",
        height: "8%",
    },
    inputContainer:{
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    input:{
        width: "95%",
        height: 50,
        backgroundColor: cores.CORES.dark_900,
        marginBottom: 12,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: cores.CORES.white,
        fontSize: 16
   },
   button:{
    width: "95%",
    height: 50,
    backgroundColor: cores.CORES.green_900,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
   },
   buttonText:{
    fontSize: 18,
    fontWeight: "bold",
    color: cores.CORES.dark_900,
   }
})