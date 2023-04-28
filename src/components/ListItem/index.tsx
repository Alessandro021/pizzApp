import React from "react";

import { View, Text, StyleSheet, TouchableOpacity} from "react-native"
import Animated, {BounceInDown, BounceOutDown} from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import cores from '../../utils'
interface ItemsProps{
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    };
    deleteItem: (item_id: string) => void;
}

export function ListItem({data, deleteItem}: ItemsProps){

    function handleDeleteItem(){
        deleteItem(data.id)
    }

    return(
        <Animated.View 
        style={styles.container}
        entering={BounceInDown.duration(200)}
        exiting={BounceOutDown}
        >
            <View>
                <Text style={styles.item}>{data.name}</Text>
                <Text style={styles.item}>{data.amount} Unidade(s)</Text>
            </View>

           <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name="trash-2" color={cores.CORES.red_900} size={25} />
           </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: cores.CORES.dark_900,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: cores.CORES.gray_100,
    },
    item:{
        color: cores.CORES.white_900,
    }
})