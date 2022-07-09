import { 
    View, 
    Text, 
    TouchableHighlight, 
    StyleSheet, 
    Keyboard, 
    TouchableWithoutFeedback,
    Alert 
} from 'react-native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

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
                
                <TouchableHighlight
                    style={style.button}
                    onPress={() => navigation.navigate("Config")}
                >
                    <Text>Session</Text>
                </TouchableHighlight>
                
                <TouchableHighlight
                    style={style.button}
                    onPress={() => navigation.navigate("ToDoList")}
                >
                    <Text>To-Do List</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={style.button}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Text>Profile</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={style.button}
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
    button: {
        backgroundColor: '#dcdcdc',
        margin: 10,
        alignItems: 'center',
        padding: 10
    },
});

export default HomeScreen;
