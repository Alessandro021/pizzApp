import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

import Dashboard from '../pages/Dashboard';

const Stack = createStackNavigator();

export default function AppRoutes(){
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
        >
            <Stack.Screen name='Dashboard' component={Dashboard} />
        </Stack.Navigator>
    )
}
