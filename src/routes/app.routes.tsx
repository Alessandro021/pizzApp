import React from 'react'
import { createStackNavigator, CardStyleInterpolators, TransitionPresets  } from '@react-navigation/stack'

import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import FinishOrder from '../pages/FinishOrder';

import cores from '../utils'


export type StackPramsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
    FinishOrder: {
        number: number | string;
        order_id: string;
    };
}

const Stack = createStackNavigator<StackPramsList>();


export default function AppRoutes(){
    return(
        <Stack.Navigator
        screenOptions={{
            // ...TransitionPresets.SlideFromRightIOS,
            // gestureDirection: 'horizontal',
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 150 } },
              close: { animation: 'timing', config: { duration: 350 } },
            },
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerShadowVisible: false, //REMOVE A SOMBRA QUE APARECE DEBAIXO DO CABEÇALHO

        }}
        >
            <Stack.Screen name='Dashboard' component={Dashboard} />
            <Stack.Screen name='Order' component={Order} />
            <Stack.Screen 
            name="FinishOrder" 
            component={FinishOrder} 
            options={{ 
                headerShown: true, 
                title: "Finalizando",
                
                headerStyle: {
                    backgroundColor: cores.CORES.dark_700,
                    // elevation: 0, //TAMBEM REMOVE A SOMBRA QUE APARECE DEBAIXO DO CABEÇALHO
                },
                headerTintColor: cores.CORES.white,
            }}/>
        </Stack.Navigator> 
    )
}