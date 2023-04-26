import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../pages/SignIn'

const Stack = createStackNavigator();

export default function AuthRoutes(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='SignIn' component={SignIn} />
        </Stack.Navigator>
    )
}