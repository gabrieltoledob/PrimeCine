import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Details from '../pages/Details';
import Search from '../pages/Search';

const Stack = createNativeStackNavigator();

function StackRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen 
                name="Details"
                component={Details}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen 
                name="Search"
                component={Search}
                options={{
                    title: 'Your Search',
                    headerTintColor: '#FFF',
                    headerTitleStyle:{
                        color: '#FFF',
                    },
                    headerStyle:{
                        backgroundColor: '#141A29',
                    }
                }}
            />
        </Stack.Navigator>
    )
}

export default StackRoutes;