import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal} from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import cores from '../../utils/'
import { Feather} from "@expo/vector-icons"

import { api } from '../../services/api'

import { ModalPicker } from '../../components/ModalPicker'


type RouteDetailParams = {
    Order:{
        number: number | string;
        order_id: string;
    }
}

export type categoryProps = {
    id: string;
    name: string;
}

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">
export default function Order(){
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation()

    const [category, setCategory] = useState<categoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<categoryProps>();

    const [amout, setAmount] = useState("1")
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    useEffect(() => {
        async function loadInfo(){
            const response = await api.get("/category")

            setCategory(response.data)
            setCategorySelected(response.data[0])
        }

        loadInfo()
    },[])

    async function handleCloseOrder(){
        try {
            await api.delete("/order", {
                params:{
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack() //VOLTAR A TELA ANTERIOR
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeCategory(item: categoryProps){
            setCategorySelected(item)
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params?.number}</Text>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name='trash-2' size={28} color={cores.CORES.red_900} />
                </TouchableOpacity>
            </View>

        {category.length !== 0 && (
            <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                <Text style={{ color: "#FFF" }}>{categorySelected?.name}</Text>
            </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.input}>
            <Text style={{color: "#FFF"}}>Pizza de calabresa</Text>
        </TouchableOpacity>

        <View style={styles.qtdContainer}>
            <Text style={styles.qtdText}>Quantidades</Text>
            <TextInput style={[styles.input, {width: "60%", textAlign: "center"}]}
                placeholder="1"
                placeholderTextColor="#F0F0F0"
                keyboardType='numeric'
                value={amout}
                onChangeText={text => setAmount(text)}
            />
        </View>


        <View style={styles.actions}>
            <TouchableOpacity style={styles.buttonAdd}>
                <Feather  name="plus"  size={18} color={cores.CORES.dark_900} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Avançar</Text>
            </TouchableOpacity>
        </View>

        <Modal
            transparent={true}
            visible={modalCategoryVisible}
            animationType="fade"
        >
            <ModalPicker 
                
                handleCloseModal={() => setModalCategoryVisible(false)}
                options={category}
                selectedItem={ handleChangeCategory}
            />

        </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: cores.CORES.dark_700,
        paddingVertical: "5%",
        paddingEnd: "4%",
        paddingStart: "4%",
    },

    header:{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        marginTop: 24,
    },

    title:{
        fontSize: 30,
        fontWeight: "bold",
        color: cores.CORES.white,
        marginRight: 18
    },

    input:{
        backgroundColor: cores.CORES.dark_900,
        borderRadius: 8,
        width: "100%",
        height: 40,
        marginBottom: 12,
        justifyContent: "center",
        paddingHorizontal: 12,
        color: cores.CORES.white_900,
        fontSize: 20,
    },

    qtdContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    qtdText:{
        fontSize: 20,
        fontWeight: "bold",
        color: cores.CORES.white_900,
    },

    actions:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    buttonAdd:{
        backgroundColor: cores.CORES.green_900,
        borderRadius: 8,
        width: "20%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText:{
        color: cores.CORES.dark_900,
        fontWeight: "bold",
        fontSize: 18,
    },

    button:{
        backgroundColor: cores.CORES.blue,
        borderRadius: 8,
        width: "75%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    }

})
