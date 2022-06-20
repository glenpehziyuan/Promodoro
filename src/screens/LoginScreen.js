import { View, StyleSheet, Text, TextInput, TouchableHighlight, Image, Alert } from "react-native";
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setIsLogin(true);
    }
    
    const logInHandler = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                Alert.alert("Welcome!", `Welcome back, ${user.email}`);

                resetForm();
            })
            .catch((err) => {
                const errCode = err.code;
                const errMessage = err.message;
                Alert.alert("Error", `${errCode}, ${errMessage}`);
            })
    }

    const signUpHandler = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                Alert.alert("Success!", `Sign up successful for ${user.email}`);

                resetForm();
            })
            .catch((err) => {
                const errCode = err.code;
                const errMessage = err.message;
                Alert.alert("Error", `${errCode}, ${errMessage}`);
            })
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={
                    {uri: 'https://www.magpierecruitment.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM1d6RHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--be853a5e1c343a05cd60e57b554b8d68fe7a16c8/Productivity%20blog.png' }
                }
            />

            <Text style={styles.header}>Welcome!</Text>
            
            <Text style={styles.text}>You are currently {isLogin ? "logging in" : "signing up"}</Text>
            
            <TextInput
                style={styles.textBox}
                value={email}
                placeholder="Your email"
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            
            <TextInput 
                style={styles.textBox}
                value={password}
                placeholder="Your password"
                onChangeText={setPassword}
                secureTextEntry
            />
            
            <TouchableHighlight 
                style={styles.buttonContainer}
                onPress={() => setIsLogin(!isLogin)}
            >
                <Text style={styles.text}>{ `Switch to ${isLogin ? "Sign up" : "Log in"}` }</Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.buttonContainer}
                onPress={() => isLogin ? logInHandler() : signUpHandler()}
            >
                <Text style={styles.text}>Proceed</Text>
            </TouchableHighlight>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBox:{
        marginBottom: 10,
        borderBottomWidth: 1,
        width: 200
    },
    buttonContainer: {
        backgroundColor: '#dcdcdc',
        margin: 10,
        alignItems: 'center',
        padding: 10
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20
    },
    text: {
        marginVertical: 10,
        fontWeight: 'bold'
    },
    tinyLogo: {
        width: 150,
        height: 150,
    }
});

export default LoginScreen;
