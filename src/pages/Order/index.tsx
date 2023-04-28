import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList} from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import cores from '../../utils/'
import { Feather} from "@expo/vector-icons"

import { api } from '../../services/api'

import { ModalPicker } from '../../components/ModalPicker'
import { ListItem } from '../../components/ListItem'

import { StackNavigationProp } from '@react-navigation/stack'
import { StackPramsList } from '../../routes/app.routes'

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

type ProductProps = {
    id: string;
    name: string;
}

type ItemsProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">
export default function Order(){
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation<StackNavigationProp<StackPramsList>>()

    //CATEGORIA DE PRODUTOS
    const [category, setCategory] = useState<categoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<categoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    //PRODUTOS DA CATEGORIA
    const [products, setProducts] = useState<ProductProps[] | []>([])
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false)

    const [amount, setAmount] = useState("1")
    const [items, setItems] = useState<ItemsProps[]>([])

    useEffect(() => {
        async function loadInfo(){
            const response = await api.get("/category")

            setCategory(response.data)
            setCategorySelected(response.data[0])
        }

        loadInfo()
    },[])

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get("/category/product", {
                params: {
                    category_id: categorySelected?.id
                }
            })

            setProducts(response.data)
            setProductSelected(response.data[0])
        }

        loadProducts()

    },[categorySelected])

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

    function handleChangeProduct(item: ProductProps){
        setProductSelected(item)
    }

    //ADICIONANDO UM PRODUTO A MESA
    async function handleAdd(){
        const response = await api.post("/order/add", {
        order_id: route.params?.order_id,
        product_id: productSelected?.id,
        amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount,
        }

        setItems(oldArray => [...oldArray, data])
        setAmount("1")
    }

    async function handleDeleteItem(item_id: string){
        await api.delete("/order/remove", {
            params:{
                item_id: item_id
            }
        })

        //APOS REMOVER O ITEM DA API, REMOVE O ITEM DA STATE items

        let removeItem = items.filter( item => {
            return(item.id !== item_id)
        })

        setItems(removeItem)
    }

    function handleFinishOrder(){
       navigation.navigate("FinishOrder", {number: route.params?.number, order_id: route.params?.order_id})
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params?.number}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name='trash-2' size={28} color={cores.CORES.red_900} />
                    </TouchableOpacity>
                )}
            </View>

        {category.length !== 0 && (
            <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                <Text style={{ color: "#FFF" }}>{categorySelected?.name}</Text>
            </TouchableOpacity>
        )}

        {products.length !== 0 && (
            <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                <Text style={{ color: "#FFF" }}>{productSelected?.name}</Text>
            </TouchableOpacity>
        )}

        <View style={styles.qtdContainer}>
            <Text style={styles.qtdText}>Quantidades</Text>
            <TextInput style={[styles.input, {width: "60%", textAlign: "center"}]}
                placeholder="1"
                placeholderTextColor="#F0F0F0"
                keyboardType='numeric'
                value={amount}
                onChangeText={text => setAmount(text)}
            />
        </View>


        <View style={styles.actions}>
            <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                <Feather  name="plus"  size={18} color={cores.CORES.dark_900} />
            </TouchableOpacity>

            <TouchableOpacity 
            style={[styles.button, {opacity: items.length === 0 ? 0.4 : 1}]} 
            disabled={items.length === 0}
            onPress={handleFinishOrder}
            >
                <Text style={styles.buttonText}>Avançar</Text>
            </TouchableOpacity>
        </View>

        <FlatList
            style={{flex: 1, marginTop: 24}}
            showsVerticalScrollIndicator={false}
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item}) => <ListItem data={item} deleteItem={handleDeleteItem} />}
        />

        <Modal transparent={true} visible={modalCategoryVisible} animationType="slide">
            <ModalPicker 
            handleCloseModal={() => setModalCategoryVisible(false)}
            options={category}
            selectedItem={ handleChangeCategory}
            />
        </Modal>

        <Modal transparent={true} visible={modalProductVisible} animationType='slide'>
            <ModalPicker 
             handleCloseModal={() => setModalProductVisible(false)}
             options={products}
             selectedItem={handleChangeProduct}             
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
