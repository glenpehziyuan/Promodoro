import { 
    View, 
    Text, 
    StyleSheet, 
    Keyboard, 
    TouchableWithoutFeedback,
    Alert 
} from 'react-native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { GreyButton } from '../components';

const HomeScreen = ({ navigation }) => {

    const signOutHandler = () => {
        const username = auth.currentUser.displayName;
        signOut(auth)
        .then(() => {
            Alert.alert("Success!", `${username} has signed out`);
        })
        .catch((err) => {
            Alert.alert("Error", `${err}`);
        });
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={style.container}>
                <Text>Hi</Text>
                
                <GreyButton 
                    pressHandler={() => navigation.navigate("Config")}
                    title="Session"
                />

                <GreyButton 
                    pressHandler={() => navigation.navigate("ToDoList")}
                    title="To-Do List"
                />

                <GreyButton 
                    pressHandler={() => navigation.navigate("Profile")}
                    title="Profile"
                />

                <GreyButton 
                    pressHandler={signOutHandler}
                    title="Sign out"
                />
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
});

export default HomeScreen;
