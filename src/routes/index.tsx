import React, { useContext } from 'react'
import cores from '../utils'
import {View, ActivityIndicator} from 'react-native'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

import { AuthContext } from '../contexts/AuthContext'

export default function Routes(){

    const {isAuthenticated, loading} = useContext(AuthContext)

    if(loading){
        return(
            <View 
            style={{
                flex: 1,
                backgroundColor: cores.CORES.dark_700,
                justifyContent: "center",
                alignItems: "center",
            }}
            >
                <ActivityIndicator size={100} color={cores.CORES.white_900}/>
            </View>
        )
    }

    return(
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    )
}