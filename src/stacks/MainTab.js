import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';



import ListarRelatorio from '../screens/ListarRelatorio';
// import SearchScreen from '../screens/Search';
// import AppointmentsScreen from '../screens/Appointments';
// import FavoritesScreen from '../screens/Favorites';
// import ProfileScreen from '../screens/Profile';
// import Manejo from "../screens/Manejo";

import CadastrarManejo from "../screens/CadastrarManejo";

import CadastrarColmeia from "../screens/CadastrarColmeia";
import ListarColmeia from "../screens/ListarColmeia";
import EditarColmeia from '../screens/EditarColmeia';

import CadastrarRelatorio from "../screens/CadastrarRelatorio";
import EditarApiario from '../screens/EditarApiario';

import ListarManejo from "../screens/ListarManejo";
import EditarManejo from '../screens/EditarManejo';


const Tab = createBottomTabNavigator();

export default () => {
  return (
      <Tab.Navigator tabBar={props=><CustomTabBar { ...props } />} >
        <Tab.Screen name="ListarRelatorio" component={ListarRelatorio} />
        <Tab.Screen name="ListarColmeia" component={ListarColmeia} />
        <Tab.Screen name="ListarManejo" component={ListarManejo} />

        <Tab.Screen name="CadastrarRelatorio" component={CadastrarRelatorio} />
        <Tab.Screen name="CadastrarManejo" component={CadastrarManejo} />
        <Tab.Screen name="CadastrarColmeia" component={CadastrarColmeia} />

        <Tab.Screen name="EditarColmeia" component={EditarColmeia} />
        <Tab.Screen name="EditarApiario" component={EditarApiario} />        
        <Tab.Screen name="EditarManejo" component={EditarManejo} />        

        

      </Tab.Navigator>
  );
}