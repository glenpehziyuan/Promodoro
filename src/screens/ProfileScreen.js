import { 
    View, 
    Text, 
    TouchableHighlight, 
    StyleSheet, 
    Keyboard, 
    TouchableWithoutFeedback,
    Image 
} from 'react-native';
import { auth, db } from '../firebase';

const ProfileScreen = ({ navigation }) => {

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Image
                    style={styles.displayPicture}
                    source={
                        {uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
                    }
                />
                
                <View style={styles.textContainer}>
                    <View style={styles.textContainerLeft}>
                        <Text style={styles.text}>Username</Text>
                        <Text style={styles.text}>Email address</Text>
                        <Text style={styles.text}>Miles</Text>
                        <Text style={styles.text}>Backgrounds</Text>
                        <Text style={styles.text}>Productive time</Text>
                    </View>
                    <View style={styles.textContainerRight}>
                        <Text style={styles.text}>{auth.currentUser.displayName}</Text>
                        <Text style={styles.text}>{auth.currentUser.email}</Text>
                        <Text style={styles.text}>Miles</Text>
                        <Text style={styles.text}>Backgrounds</Text>
                        <Text style={styles.text}>Productive time</Text>
                    </View>
                </View>

                <TouchableHighlight 
                style={styles.button}
                onPress={() => navigation.popToTop()}
                >
                    <Text>Back to Home</Text>
                </TouchableHighlight>
            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
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
        padding: 10,
    },
    displayPicture: {
        width: 150,
        height: 150,
    },
    textContainer: {
        flexDirection: 'row',
        alignContent: 'space-around',
        margin: 20,
    },
    textContainerLeft: {
        alignItems: 'flex-end',
        marginHorizontal: 10,
    },
    textContainerRight: {
        alignItems: 'flex-start',
        marginHorizontal: 10,
    },
    text: {
        marginBottom: 20,
    },
});

export default ProfileScreen;