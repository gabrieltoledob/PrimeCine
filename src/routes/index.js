import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {MaterialCommunityIcons} from '@expo/vector-icons';

import StackRoutes from './stackRoutes';
import Movies from '../pages/Movies';

const Drawer = createDrawerNavigator();

function Routes(){
    return(
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                
                drawerStyle:{
                    backgroundColor: '#090A0E',
                    paddingTop: 20
                },

                drawerActiveBackgroundColor: '#E72F49',
                drawerActiveTintColor: '#FFF',
                drawerInactiveTintColor: '#FFF'
            }}
        >
            <Drawer.Screen
                name="HomeDrawer"
                component={StackRoutes}
                options={{
                    title: 'Home',
                    drawerIcon: ({focused, size, color}) => (
                        <MaterialCommunityIcons
                            name={focused ? 'movie-open' : 'movie-outline'}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Movies"
                component={Movies}
                options={{
                    title: 'My movies',
                    drawerIcon: ({focused, size, color}) => (
                        <MaterialCommunityIcons
                            name={focused ? 'inbox' : 'inbox-outline'}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

export default Routes;