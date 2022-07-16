import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { GreyButton, DropdownMenu } from '../components';
import { db, auth } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { LoadingScreen } from './index';

const DEFAULT_WORK_MINS = 25;
const DEFAULT_BREAK_MINS = 5;

const ConfigScreen = ({ navigation }) => {

    // the user's desired work-break split & background
    const [workMins, setWorkMins] = useState(DEFAULT_WORK_MINS);
    const [breakMins, setBreakMins] = useState(DEFAULT_BREAK_MINS);
    const [backgroundLink, setBackgroundLink] = useState("");
    const [dropdownData, setDropdownData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDropdownData();
                setDropdownData(data);
            } catch (err) {
                console.error("Error retrieving data", err);
            };
        };

        fetchData()
            .catch((err) => {
                console.error("Error generating data array", err);
            })
        
    }, []);

    // generates an array of data to be used as input for the dropdown menu
    const getDropdownData = async () => {
        try {
            
            let userBackgrounds = await getUserBackgrounds();

            // returns userBackgrounds as an array of background documents from the database
            userBackgrounds = await Promise.all(userBackgrounds.map((id) => getBackgroundDoc(id)));

            // returns output as an array of objects to be used as input for the dropdown menu
            const output = userBackgrounds.map((obj) => {
                return {
                    value: obj["link"],
                    label: obj["name"],
                    image: {
                        uri: obj["link"]
                    }
                };
            });

            return output;

        } catch {(err) => {
            console.error("Error generating data array", err);
        }}
    };

    // returns an array of the user's unlocked backgrounds
    const getUserBackgrounds = async () => {
        try {

            let output = [];
            
            const colRef = collection(db, "users");
            const colSnap = await getDocs(colRef);

            colSnap.docs.forEach((doc) => {
                if (doc.data().uid === auth.currentUser.uid) {
                    const userData = doc.data();
                    output = userData["backgrounds"];
                };
            });

            return output;

        } catch {(err) => {
            console.error("Error retrieving user backgrounds", err);
        }};
    };

    // retrieves a specific doc from background collection, based on id
    const getBackgroundDoc = async (backgroundID) => {
        try {
            
            const docRef = doc(db, "backgrounds", backgroundID);
            const docSnap = await getDoc(docRef);
            return docSnap.data();

        } catch (err) {
            console.error("Error getting background doc", err);
        }
    };

    // puts all the params (to be sent to TimerScreen) into one object
    const paramsToObj = () => {
        return {
            work: workMins,
            break: breakMins,
            background: backgroundLink
        };
    };
    
    const proceedHandler = () => {
        if (backgroundLink === "") {
            return Alert.alert("Configurations incomplete", "Please select a background");
        } else if (workMins <= 0 || breakMins <= 0) {
            return Alert.alert("Configurations incomplete", "Invalid amount of time chosen");
        }

        const params = paramsToObj();
        navigation.navigate("Timer", {...params});
    };

    if (dropdownData === []) {
        return (
            <LoadingScreen />
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.instructionsContainer}>
                    <Text>How to use:</Text>
                    <Text style={styles.instructions}>1. Enter the no. of minutes you want to work and break respectively.</Text>
                    <Text style={styles.instructions}>2. Proceed.</Text>
                </View>

                <DropdownMenu 
                    dataArray={dropdownData}
                    onChange={setBackgroundLink}
                    placeholder="Select background"
                />
    
                <View style={styles.textBoxContainer}>
                    <TextInput
                        style={styles.textBox} 
                        placeholder='Work'
                        onChangeText={(mins) => setWorkMins(mins)}
                        keyboardType='numeric'
                        defaultValue={`${DEFAULT_WORK_MINS}`}
                    />
                    <TextInput 
                        style={styles.textBox} 
                        placeholder='Break'
                        onChangeText={(mins) => setBreakMins(mins)}
                        keyboardType='numeric'
                        defaultValue={`${DEFAULT_BREAK_MINS}`}
                    />
                </View>
    
                <GreyButton 
                    pressHandler={() => proceedHandler()}
                    title="Proceed"
                />
    
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBox: {
        margin: 10,
        borderBottomWidth: 1,
        width: 50,
    },
    textBoxContainer: {
        flexDirection: 'row',
        margin: 20
    },
    button: {
        backgroundColor: '#dcdcdc',
        margin: 10,
        alignItems: 'center',
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    instructions:{
        fontSize: 12,
        padding: 5,
    },
    instructionsContainer: {
        alignItems: 'center',
        width: 300
    },
});

export default ConfigScreen;