import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import MainTabScreen from './MainTabScreen';
import Verify from './Verify';
import ResetPass from './ResetPass';
import Editor from './Editor';
import Result from './Result'
import { DrawerContent } from '@react-navigation/drawer';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator  headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="MainTabScreen" component={MainTabScreen}/>
        <RootStack.Screen name="DrawerContent" component={DrawerContent}/>
        <RootStack.Screen name="Verify" component={Verify}/>
        <RootStack.Screen name="ResetPass" component={ResetPass}/>
        <RootStack.Screen name="Result" component={Result}/>
        <RootStack.Screen name="Editor" component={Editor}/>
    
    </RootStack.Navigator>
);

export default RootStackScreen;