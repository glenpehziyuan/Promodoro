import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TimeDisplay, GreyButton } from '../components';
import { updateObject } from '../utils';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const SECS_IN_MIN = 60;

const TimerScreen = ({ route, navigation }) => {
    // HOOKS
    // the user's desired work-break split & background
    const [configs, setConfigs] = useState({
        work: 0,
        break: 0,
        background: ""
    });
    
    // to toggle the timers that the buttons control
    const [isBreak, setIsBreak] = useState(false); 
    
    // for live tracking of time left in each timer
    const [secsLeft, setSecsLeft] = useState({
        work: 0,
        break: 0
    });
    
    // countdown intervals for each timer
    const [timer, setTimer] = useState({
        work: null,
        break: null
    });


    // VARIABLES
    // tracks whether it is a new session
    let isNewSession = true;


    // reads user configurations for work-break split & retrieves background link from database,
    // then stores them in an object for easier reference
    useEffect(() => {
        getBackground()
            .then((link) => {
                setConfigs({
                    work: route.params["work"],
                    break: route.params["break"],
                    background: link
                })
            })
            .catch((err) => {
                console.error("Error getting background", err)
            });
    }, []);

    // once time ends, kills the timer then prepares it for the next run
    useEffect(() => {
        for (const id of Object.keys(timer)) {
            if (timer[id] && secsLeft[id] === 0) { 
                clearInterval(timer[id]);
                resetSecsLeft(id);
                setIsBreak((isBreak) => !isBreak);
            }
        }

    }, [secsLeft, timer]);

    // starts the next timer after one ends
    useEffect(() => {
        if (!isNewSession) {
            startTimer(isBreak ? "break" : "work");
        }
    }, [isBreak]);

    
    // HELPER FUNCTIONS USED BY HOOKS & BUTTON HANDLERS
    // retrieves the background from the database
    const getBackground = async () => {
        try {
            const docRef = doc(db, "backgrounds", route.params.background);
            const docSnap = await getDoc(docRef);

            return docSnap.data()["link"];
        } catch (err) {
            console.error("Error getting background", err);
        }
    };

    // creates a new interval that runs down the specified timer every second
    const startTimer = (id) => {
        clearInterval(timer[id]);

        const intervalID = setInterval(() => {
            setSecsLeft((secsLeftObj) => {
                const currValue = secsLeftObj[id];
                return updateObject(secsLeftObj, id, currValue > 0 ? currValue - 1 : 0);
            });
        }, 1000);
        
        setTimer((timerObj) => {
            return updateObject(timerObj, id, intervalID);
        });
    };

    // resets secsLeft according to the split
    const resetSecsLeft = (id) => {
        setSecsLeft((secsLeftObj) => {
            return updateObject(secsLeftObj, id, configs[id] * SECS_IN_MIN);
        })
    };

    
    // BUTTON HANDLERS
    const startHandler = () => {
        // if this is the first time a timer is started this session,
        // secsLeft needs to be updated with the work-break split
        if (isNewSession) {
            for (const id of Object.keys(secsLeft)) {
                resetSecsLeft(id);
            };
            isNewSession = false;
        };

        startTimer(isBreak ? "break" : "work");
    };

    const pauseHandler = () => {
        clearInterval(timer[isBreak ? "break" : "work"]);
    };

    const resetHandler = () => {
        pauseHandler();
        resetSecsLeft(isBreak ? "break" : "work");
    };

    return (
        <View style={styles.container}>
            <View style={styles.instructionsContainer}>
                <Text>How to use:</Text>
                <Text style={styles.instructions}>1. Start the timer. The work timer will run first, and is immediately followed by the break timer.</Text>
                <Text style={styles.instructions}>2. You may pause or reset the timers whenever you like.</Text>
                <Text style={styles.instructions}>3. To change the no. of minutes, simply re-enter the new minutes, press Reset, and continue from Step 2.</Text>
            </View>
            
            <Image
                style={styles.background}
                source={
                    {uri: configs["background"] }
                }
            />
            
            <View style={styles.intervalContainer}>
                <Text>
                    Your Pomodoro interval: {`${configs["work"]}`} - {`${configs["break"]}`}
                </Text>
            </View>
            
            <View style={styles.timerContainer}>
                <Text>{`Time left for ${isBreak ? "Break: " : "Work: "}`}</Text>

                <TimeDisplay seconds={isBreak ? secsLeft.break : secsLeft.work}/>
            </View>

            <View style={styles.buttonContainer}>
                <GreyButton 
                    pressHandler={startHandler}
                    title="Start"
                />

                <GreyButton 
                    pressHandler={pauseHandler}
                    title="Pause"
                />

                <GreyButton 
                    pressHandler={resetHandler}
                    title="Reset"
                />
            </View>

            <GreyButton 
                pressHandler={() => navigation.popToTop()}
                title="Back to Home"
            />
            
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    timerContainer: {
        flexDirection: 'row',
        margin: 20
    },
    intervalContainer: {
        marginTop: 20,
    },
    background: {
        width: 300,
        height: 200,
    },
});

export default TimerScreen;