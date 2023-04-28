import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import Animated, {BounceInDown, BounceOutDown} from 'react-native-reanimated'
import {categoryProps} from '../../pages/Order'
import cores from '../../utils'

interface ModalPickerProps{
    options: categoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: categoryProps) => void;
}

const { width: WIDTH, height: HEIGHT} = Dimensions.get("window")
export function ModalPicker({options, handleCloseModal, selectedItem}: ModalPickerProps){

    function onPressItem(item: categoryProps){
        selectedItem(item)
        handleCloseModal();
    }


    return(
        <TouchableOpacity style={styles.conatiner} onPress={handleCloseModal}>
            <Animated.View 
            style={styles.content}
            entering={BounceInDown.duration(700)}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                    options.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
                            <Text style={styles.item}>
                                {item?.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                    }
                </ScrollView>
            </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    conatiner:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    content:{
        width: WIDTH - 50,
        height: HEIGHT / 2,
        backgroundColor: cores.CORES.white,
        borderWidth: 1,
        borderColor: cores.CORES.gray_100,
        borderRadius: 8,

    },

    option:{
        alignItems:"flex-start",
        borderTopWidth: 0.8,
        borderTopColor: cores.CORES.gray_100,
    },

    item:{
        margin: 18,
        fontSize: 14,
        fontWeight: "bold",
        color: cores.CORES.dark_900,
    }
})