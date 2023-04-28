import React from 'react'
import { createStackNavigator, CardStyleInterpolators, TransitionPresets  } from '@react-navigation/stack'

import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';


export type StackPramsList = {
    Dashboard: undefined;
    Order: {
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
        }}
        >
            <Stack.Screen name='Dashboard' component={Dashboard} />
            <Stack.Screen name='Order' component={Order} />
        </Stack.Navigator>
    )
}
