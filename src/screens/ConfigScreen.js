import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { GreyButton, DropdownMenu, ColouredButton, Placeholder } from '../components';
import { db, auth } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import LoadingScreen from './LoadingScreen';
import Slider from '@react-native-community/slider';

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

    // changes between placeholder and selected background image
    const display = () => {
        if (backgroundLink === "") {
            return (
                <Placeholder 
                    width="80%"
                    height="60%"
                    placeholderText="No background selected"
                />
            )
        } else {
            return (
                <Image 
                style={styles.image}    
                source={
                        {uri: backgroundLink}
                    }
                />
            )
        }
    }


    if (dropdownData === []) {
        return (
            <LoadingScreen />
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.instructionsContainer}>
                    <Text style={styles.title}>How to use:</Text>
                    <Text style={styles.instructions}>
                        Choose a background, as well as the no. of minutes you want to work and break respectively.
                    </Text>
                </View>

                <View style={styles.dropdownContainer}>
                    {display()}
                    
                    <DropdownMenu 
                        dataArray={dropdownData}
                        onChange={setBackgroundLink}
                        placeholder="Select background"
                    />
                </View>

                <View style={styles.slidersContainer}>
                    <Text>Work for {workMins} minutes</Text>

                    <Slider 
                        style={styles.slider}
                        minimumValue={25}
                        maximumValue={60}
                        onValueChange={setWorkMins}
                        step={5}
                        testID="slider"
                    />

                    <Text>Break for {breakMins} minutes</Text>

                    <Slider 
                        style={styles.slider}
                        minimumValue={5}
                        maximumValue={30}
                        onValueChange={setBreakMins}
                        step={5}
                    />
                </View>
    
                <View style={styles.buttonContainer}>
                    <ColouredButton 
                        pressHandler={() => proceedHandler()}
                        title="Proceed"
                        colour="#D6FFD9"
                    />
        
                    <ColouredButton 
                        pressHandler={() => navigation.popToTop()}
                        title="Back to Home"
                        colour="#DCDCDC"
                    />
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFFE1',
        paddingTop: 50
    },
    buttonContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        marginBottom: 5,
        alignSelf: 'center',
        fontStyle: 'italic'
    },  
    instructions:{
        fontSize: 12,
        textAlign: 'justify'
    },
    instructionsContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        width: '90%',
        backgroundColor: '#E3FFFB',
        padding: 20,
        marginBottom: 30,
        borderWidth: 2,
        borderColor: '#D2E0F2',
    },
    slider: {
        width: '70%',
        height: 40,
    },
    slidersContainer: {
        flex: 2,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    dropdownContainer: {
        flex: 4,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%'
    },
    image: {
        height: 200,
        width: 300,
    }
});

export default ConfigScreen;