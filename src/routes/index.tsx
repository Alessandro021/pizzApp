import React from 'react'

import {View, ActivityIndicator} from 'react-native'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

export default function Routes(){
    const isAuthenticated = false
    const loading = false

    if(loading){
        return(
            <View 
            style={{
                flex: 1,
                backgroundColor: "#1D1D2E",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
                <ActivityIndicator size={100} color="#F5F7Fb"/>
            </View>
        )
    }

    return(
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    )
}