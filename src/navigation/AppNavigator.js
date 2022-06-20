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

    // may need to add a hook to delay rendering until Firebase loads,
    // as the app always tries to render LoginScreen first when user is null

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
            { user ? <MainNavigator /> : <LoginScreen /> }
        </NavigationContainer>
    );
};

export default AppNavigator;