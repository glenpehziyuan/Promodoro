import { View, StyleSheet, Text, TextInput, Pressable, ToastAndroid } from "react-native";
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setIsLogin(true);
    }
    
    const logInHandler = () => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log('Log in successfully completed for ' + user.email);

                resetForm();
            })
            .catch((err) => {
                const errCode = err.code;
                const errMessage = err.message;
                console.log(err.code, err.message);
            })
    }

    const signUpHandler = () => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log('Sign up successfully completed for ' + user.email);

                resetForm();
            })
            .catch((err) => {
                const errCode = err.code;
                const errMessage = err.message;
                console.log(err.code, err.message);
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{"Welcome"}</Text>
            
            <TextInput
                value={email}
                placeholder="Your email"
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            
            <TextInput 
                value={password}
                placeholder="Your password"
                onChangeText={setPassword}
                secureTextEntry
            />
            
            <Pressable 
                onPress={() => setIsLogin(!isLogin)}
            >
                <Text style={styles.text}>{ `Switch to ${isLogin ? "Sign up" : "Log in"}` }</Text>
            </Pressable>

            <Pressable
                onPress={() => isLogin ? logInHandler() : signUpHandler()}
            >
                <Text style={styles.text}{"Proceed"}</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '80%'
    },
    button: {
        marginVertical: 8
    },
    text: {
        marginVertical: 10
    }
});

export default LoginScreen;
