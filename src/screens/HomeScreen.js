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
import { ColouredButton } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {

    const username = auth.currentUser.displayName;

    const signOutHandler = () => {
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
            <View style={styles.container}>
                <View style={styles.centerpieceContainer}>
                    <Icon 
                        name="plane"
                        style={styles.icon}
                    />

                    <Text style={styles.text}>Hi, {username}</Text>
                    <Text style={styles.text}>Let's get productive today!</Text>
                </View>

                <View style={styles.topButtonsContainer}>
                    <ColouredButton 
                        pressHandler={() => navigation.navigate("Config")}
                        title="Session"
                        colour="#D6FFD9"
                    />

                    <ColouredButton 
                        pressHandler={() => navigation.navigate("ToDoList")}
                        title="To-Do List"
                        colour="#D2E0F2"
                    />
                </View>

                <View style={styles.bottomButtonsContainer}>
                    <ColouredButton 
                        pressHandler={() => navigation.navigate("Profile")}
                        title="Profile"
                        colour="#FBECE9"
                    />

                    <ColouredButton 
                        pressHandler={signOutHandler}
                        title="Sign out"
                        colour="#DCDCDC"
                    />
                </View>

            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFFE1',
        borderWidth: 1,
    },
    centerpieceContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topButtonsContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    bottomButtonsContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        margin: 10,
    },
    icon: {
        fontSize: 128,
        margin: 20
    },
});

export default HomeScreen;
