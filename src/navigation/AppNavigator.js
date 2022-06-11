import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    HomeScreen,
    LoginScreen,
    TimerScreen
} from '../screens';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const MainStack = createNativeStackNavigator();

const AppNavigator = () => {
    const [user, setUser] = useState(null); 

    useEffect(() => {
        console.log("used effect");

        const subscriber = onAuthStateChanged(auth, authUser => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return subscriber;
    });

    console.log("render");

    const MainNavigator = () => (
        <MainStack.Navigator initialRouteName="Home">
            <MainStack.Screen 
                name="Home"
                component={HomeScreen}
                options={{ title: "Home" }}
            />
            <MainStack.Screen 
                name="Timer"
                component={TimerScreen}
                options={{ title: "Timer" }}
            />
        </MainStack.Navigator>
    );

    return (
        <NavigationContainer>
            { user ? MainNavigator() : LoginScreen() }
        </NavigationContainer>
    );
};

export default AppNavigator;