import { View, StyleSheet, TextInput } from "react-native";

const LoginComponent = ( { emailState, setEmailState, passwordState, setPasswordState } ) => {

    return (
        <View>       
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
    textBox:{
        marginBottom: 10,
        borderBottomWidth: 1,
        width: 200
    },
})

export default LoginComponent;