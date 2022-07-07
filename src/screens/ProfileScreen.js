import { 
    View, 
    Text, 
    TouchableHighlight, 
    StyleSheet, 
    Image 
} from 'react-native';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState({});

    // retrieves user data from database when the screen is rendered
    useEffect(() => {
        getUserData()
            .then((data) => {
                setUserData(data);
            })
            .catch((err) => {
                console.error("Error getting user data", err);
            })
    }, []);

    // retrieves the user's data from the database, based on the uid
    const getUserData = async () => {
        try {
            let output = {};
            
            const colRef = collection(db, "users");
            const colSnap = await getDocs(colRef)

            colSnap.docs.forEach((doc) => {
                if (doc.data().uid === auth.currentUser.uid) {
                    output = doc.data();
                };
            });

            return output;
        } catch (err) {
            console.error("Error getting user data", err);
        }
    };

    return (
        
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
                    <Text style={styles.text}>{userData["username"]}</Text>
                    <Text style={styles.text}>{userData["email"]}</Text>
                    <Text style={styles.text}>{userData["miles"]}</Text>
                    <Text style={styles.text}>{userData["backgrounds"].length}</Text>
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