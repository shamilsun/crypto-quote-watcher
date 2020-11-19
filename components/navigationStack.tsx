import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import {colors, styles} from "../styles/styles";
import * as React from 'react';
import {Button, ImageBackground} from "react-native";
import AboutApp from "./AboutApp/AboutApp";
import {SceneTickers} from "./SceneTickers/SceneTickers";
import {ModalProperties} from "./ModalProperties/ModalProperties"

export const RootStack = createStackNavigator({
        Properties:ModalProperties,
        AboutApp:AboutApp,
        SceneTickers: SceneTickers,
    },
    {
        initialRouteName: 'AboutApp',
        /* The header config from HomeScreen is now here */
        navigationOptions: {
            headerBackground: (<ImageBackground
                source={require('../assets/ic_bg.jpg')}
        style={{width: '100%', height: '100%',opacity:.3}}
        />),

            headerStyle: {
                backgroundColor: colors.headerBackground,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
        transparentCard:true,
        cardStyle: {
            backgroundColor: 'transparent',
            opacity: 1,// .99,
            //  flex: 1,
            //backgroundColor: '#fffff',
        },
    }
);
