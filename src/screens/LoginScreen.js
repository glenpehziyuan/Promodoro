import { View, StyleSheet, Text, TouchableHighlight, Image, Alert } from "react-native";
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';
import { ColouredButton, LoginComponent, SignUpComponent } from '../components';
import { createNewUser } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setUsername("");
        setIsLogin(true);
    };
    
    const logInHandler = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                Alert.alert("Welcome!", `Welcome back, ${user.displayName}`);

                resetForm();
            })
            .catch((err) => {
                const errCode = err.code;
                let errMessage = "Please check login details.";
                
                if (errCode === 'auth/invalid-email') {
                    errMessage = "Please enter a valid email address.";
                } else if (errCode === "auth/user-not-found") {
                    errMessage = "User not found.";
                } else if (errCode === "auth/wrong-password") {
                    errMessage = "Wrong password.";
                };

                Alert.alert("Error", `${errMessage}`);
            });
    };

    const signUpHandler = () => {
        if (username === "") {
            return Alert.alert("Error", "Please enter a username.");
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // updates user's username as well as user details on the database
                updateProfile(user, {
                    displayName: username
                }).then(() => {
                    createNewUser({
                        uid: user.uid,
                        username: user.displayName,
                        email: user.email
                    });
                    Alert.alert("Success!", `Sign up successful for ${user.displayName}`);
                }).catch((err) => {
                    const errCode = err.code;
                    const errMessage = err.message;
                    console.log(`${errCode}, ${errMessage}`);
                })

                resetForm();
            })
            .catch((err) => {
                const errCode = err.code;
                let errMessage = "Please check authentication details.";

                if (errCode === "auth/invalid-email") {
                    errMessage = "Please enter a valid email address.";
                } else if (errCode === "auth/email-already-in-use") {
                    errMessage = "Email already in use. Try another email.";
                } else if (errCode === "auth/weak-password") {
                    errMessage = "Password too weak. Use at least 6 characters.";
                };

                Alert.alert("Error", `${errMessage}`);
            });
    };

    // returns the relevant textboxes depending on whether user wants to login or sign up
    const textBoxes = () => {
        if (isLogin) {
            return (
                <LoginComponent 
                    emailState={email}
                    setEmailState={setEmail}
                    passwordState={password}
                    setPasswordState={setPassword}
                />
            );
        } else {
            return (
                <SignUpComponent
                    emailState={email}
                    setEmailState={setEmail}
                    passwordState={password}
                    setPasswordState={setPassword}
                    nameState={username}
                    setNameState={setUsername}
                />
            );
        };
    };

    return (
        <View style={styles.container}>
            {/* <Image
                style={styles.tinyLogo}
                source={
                    {uri: 'https://www.magpierecruitment.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM1d6RHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--be853a5e1c343a05cd60e57b554b8d68fe7a16c8/Productivity%20blog.png' }
                }
            /> */}

            <View style={styles.centerpieceContainer}>
                <Icon 
                    name="plane"
                    style={styles.icon}
                />

                <Text style={styles.header}>Welcome!</Text>
                
                <Text style={styles.text}>You are currently {isLogin ? "logging in" : "signing up"}</Text>
            </View>
            
            <View style={styles.textboxesContainer}>
                {textBoxes()}
            </View>
            
            <View style={styles.buttonsContainer}>
                <ColouredButton 
                    pressHandler={() => setIsLogin(!isLogin)}
                    title={ `Switch to ${isLogin ? "Sign up" : "Log in"}` }
                    colour="#E3FFFB"
                />

                <ColouredButton 
                    pressHandler={() => isLogin ? logInHandler() : signUpHandler()}
                    title="Proceed"
                    colour="#D6FFD9"
                />
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFFE1',
        paddingBottom: 70,
        paddingTop: 30,
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
    },
    icon: {
        fontSize: 128,
        margin: 20,
    },
    centerpieceContainer: {
        flex: 4,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textboxesContainer: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '90%',
    }
});

export default LoginScreen;
