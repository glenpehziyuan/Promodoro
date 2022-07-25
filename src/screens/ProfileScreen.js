import { 
    View, 
    Text, 
    StyleSheet, 
    Image 
} from 'react-native';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { GreyButton } from '../components';
import LoadingScreen from './LoadingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            console.log("getting user data");
            
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

    // if userData has not been loaded, render LoadingScreen instead
    if (userData["username"] === undefined) {
        return <LoadingScreen />
    } else {
        return (
            <View style={styles.container}>

                <Icon 
                    name="plane"
                    style={styles.icon}
                />
                
                <View style={styles.textContainer}>
                    <View style={styles.textContainerLeft}>
                        <Text style={styles.label}>Username</Text>
                        <Text style={styles.label}>Email address</Text>
                        {/* <Text style={styles.label}>Tasks</Text> */}
                        {/* <Text style={styles.text}>Backgrounds</Text> */}
                        {/* <Text style={styles.text}>Productive time</Text> */}
                    </View>
                    <View style={styles.textContainerRight}>
                        <Text style={styles.text}>{userData["username"]}</Text>
                        <Text style={styles.text}>{userData["email"]}</Text>
                        {/* <Text style={styles.text}>
                            {userData["tasks"] ? userData["tasks"].length : 0}
                        </Text> */}
                        {/* <Text style={styles.text}>
                            {userData["backgrounds"] ? userData["backgrounds"].length : 0}
                        </Text> */}
                        {/* <Text style={styles.text}>Productive time</Text> */}
                    </View>
                </View>
    
                <GreyButton 
                    pressHandler={() => navigation.popToTop()}
                    title="Back to Home"
                />
            </View>
    
        );
    };    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFFE1'
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
    label: {
        marginBottom: 20,
        fontSize: 16,
        fontStyle: 'italic'
    },
    text: {
        marginBottom: 20,
        fontSize: 16
    },
    icon: {
        fontSize: 128,
    }
});

export default ProfileScreen;