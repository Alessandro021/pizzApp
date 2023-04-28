import React from "react";

import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useRoute, useNavigation, RouteProp} from '@react-navigation/native'
import { StackNavigationProp } from "@react-navigation/stack";

import { Feather } from '@expo/vector-icons'

import cores from '../../utils'
import { api } from "../../services/api";
import { StackPramsList } from "../../routes/app.routes";

type RouteDetailParams = {
    FinishOrder: {
        number: string | number;
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, "FinishOrder">

export default function FinishOrder(){
    const route = useRoute<FinishOrderRouteProp>()
    const navigation = useNavigation<StackNavigationProp<StackPramsList>>()

    async function headleFinish(){
       try {
            await api.put("/order/send", {
                order_id: route.params?.order_id
            })

            navigation.popToTop()
       } catch (error) {
            console.log(error)
       }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.title}>Mesa: {route.params?.number}</Text>

            <TouchableOpacity style={styles.button} onPress={headleFinish}>
                <Text style={styles.textButton}>Finalizar pedidos</Text>
                <Feather name="shopping-cart" size={20} color={cores.CORES.dark_700} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: cores.CORES.dark_700,
        paddingVertical: "5%",
        paddingHorizontal: "4%",
        alignItems: "center",
        justifyContent: "center",
    },
    alert:{
        fontSize: 20,
        color: cores.CORES.white_900,
        fontWeight: "bold",
        marginBottom: 12,
    }, 
    
    title:{
        fontSize: 30,
        fontWeight: "bold",
        color: cores.CORES.white_900,
        marginBottom: 12,
    }, 
    
    button: {
        backgroundColor: cores.CORES.green_900,
        flexDirection: "row",
        width: "65%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    
    textButton:{
        fontSize: 18,
        marginRight: 10,
        fontWeight: "bold",
        color: cores.CORES.dark_700
    }
})