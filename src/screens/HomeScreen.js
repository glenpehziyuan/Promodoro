import react, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableHighlight, 
    TextInput, 
    StyleSheet, 
    Keyboard, 
    TouchableWithoutFeedback,
    Alert 
} from 'react-native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const HomeScreen = () => {

    const signOutHandler = () => {
        signOut(auth).then(() => {
            Alert.alert("Success!", "Signed out");
        });
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={style.container}>
                <Text>Hi</Text>
                <TextInput 
                    placeholder='hi'
                />
                <TouchableHighlight
                    style={style.buttonContainer}
                    onPress={signOutHandler}
                >
                    <Text>Sign out</Text>
                </TouchableHighlight>
            </View>
        </TouchableWithoutFeedback>

    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        backgroundColor: '#dcdcdc',
        margin: 10,
        alignItems: 'center',
        padding: 10
    },
});

export default HomeScreen;