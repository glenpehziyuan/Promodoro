import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    ConfigScreen,
    HomeScreen,
    LoginScreen,
    ProfileScreen,
    TimerScreen,
    ToDoListScreen
} from '../screens';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const MainStack = createNativeStackNavigator();

const AppNavigator = () => {
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, authUser => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return subscriber;
    });

    const MainNavigator = () => (
        <MainStack.Navigator 
            initialRouteName="Home" 
            screenOptions={{headerShown: false}}
        >
            <MainStack.Screen 
                name="Home"
                component={HomeScreen}
                options={{ title: "Home" }}
            />
            <MainStack.Screen 
                name="Timer"
                component={TimerScreen}
                options={{ title: "Timer" }}
                initialParams={{ work: 25, break: 5 }}
            />
            <MainStack.Screen 
                name="ToDoList"
                component={ToDoListScreen}
                options={{ title: "ToDoList" }}
            />
            <MainStack.Screen 
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Profile" }}
            />
            <MainStack.Screen 
                name="Config"
                component={ConfigScreen}
                options={{ title: "Config" }}
            />
        </MainStack.Navigator>
    );

    return (
        <NavigationContainer>
            { user ? <MainNavigator /> : <LoginScreen /> }
        </NavigationContainer>
    );
};

export default AppNavigator;
