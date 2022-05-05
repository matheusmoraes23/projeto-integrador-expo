import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload  from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from './MainTab';
// import Apiario from '../screens/Apiario';
// import Crias from '../screens/Crias';
// import Alimentacao from '../screens/Alimentacao';
// import Manejo from '../screens/Manejo';
// import CadastrarColmeia from "../screens/CadastrarColmeia";

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn"  component={SignIn} />
        <Stack.Screen name="SignUp"  component={SignUp} />
        <Stack.Screen name="MainTab"  component={MainTab} />
        {/* <Stack.Screen name="CadastrarColmeia"  component={CadastrarColmeia} /> */}
        {/* <Stack.Screen name="Apiario" component={Apiario} />
        <Stack.Screen name="Crias" component={Crias} />
        <Stack.Screen name="Alimentacao" component={Alimentacao} />
        <Stack.Screen name="Manejo" component={Manejo} /> */}
    </Stack.Navigator>
);