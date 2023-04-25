import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

import SignIn from '../pages/SignIn'

const Stack = createStackNavigator();

export default function AuthRoutes(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen name='SignIn' component={SignIn} />
        </Stack.Navigator>
    )
}