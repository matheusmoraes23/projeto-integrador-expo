import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';



import HomeScreen from '../screens/Home';
// import SearchScreen from '../screens/Search';
// import AppointmentsScreen from '../screens/Appointments';
// import FavoritesScreen from '../screens/Favorites';
// import ProfileScreen from '../screens/Profile';
// import Manejo from "../screens/Manejo";

import CadastrarManejo from "../screens/CadastrarManejo";
import CadastrarColmeia from "../screens/CadastrarColmeia";
import ListarColmeia from "../screens/ListarColmeia";



const Tab = createBottomTabNavigator();

export default () => {
  return (
      <Tab.Navigator tabBar={props=><CustomTabBar { ...props } />} >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={CadastrarManejo} />
        <Tab.Screen name="ListarColmeia" component={ListarColmeia} />
        <Tab.Screen name="CadastrarColmeia" component={CadastrarColmeia} />
        {/*<Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      </Tab.Navigator>
  );
}

// <Icon name="rocket" color={color} size={26} />