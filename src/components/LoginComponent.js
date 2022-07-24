import { View, StyleSheet, TextInput } from "react-native";

const LoginComponent = ( { emailState, setEmailState, passwordState, setPasswordState } ) => {

    return (
        <View style={styles.container}>       
            <TextInput
                style={styles.textBox}
                value={emailState}
                placeholder="Your email"
                onChangeText={setEmailState}
                keyboardType="email-address"
            />
            
            <TextInput 
                style={styles.textBox}
                value={passwordState}
                placeholder="Your password"
                onChangeText={setPasswordState}
                secureTextEntry
            />
        </View>    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBox:{
        margin: 10,
        borderBottomWidth: 1,
        width: '50%'
    },
})

export default LoginComponent;