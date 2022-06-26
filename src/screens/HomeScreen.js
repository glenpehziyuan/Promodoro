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
        const userEmail = auth.currentUser.email;
        signOut(auth)
        .then(() => {
            Alert.alert("Success!", `${userEmail} has signed out`);
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
                    style={style.buttonContainer}
                    onPress={() => navigation.navigate("Timer")}
                >
                    <Text>Timer</Text>
                </TouchableHighlight>
                
                TouchableHighlight
                    style={style.buttonContainer}
                    onPress={() => navigation.navigate("ToDoList")}
                >
                    <Text>To-Do List</Text>
                </TouchableHighlight>


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
