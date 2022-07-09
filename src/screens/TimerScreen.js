import { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { TimeDisplay } from '../components';
import { updateObject } from '../utils';

const SECS_IN_MIN = 60;

const TimerScreen = ({ route, navigation }) => {

    const [isNewSession, setIsNewSession] = useState(true);
    
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

    // the user's desired work-break split
    const split = {
        work: route.params["work"] * SECS_IN_MIN,
        break: route.params["break"] * SECS_IN_MIN
    }

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
            return updateObject(secsLeftObj, id, split[id]);
        })
    };

    const startHandler = () => {
        // if this is the first time a timer is started this session,
        // secsLeft needs to be updated with the work-break split
        if (isNewSession) {
            for (const id of Object.keys(secsLeft)) {
                resetSecsLeft(id);
            };
            setIsNewSession(false);
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
            
            <View style={styles.intervalContainer}>
                <Text>
                    Your Pomodoro interval: {`${route.params["work"]}`} - {`${route.params["break"]}`}
                </Text>
            </View>
            
            <View style={styles.timerContainer}>
                <Text>{`Time left for ${isBreak ? "Break: " : "Work: "}`}</Text>

                <TimeDisplay seconds={isBreak ? secsLeft.break : secsLeft.work}/>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableHighlight 
                    style={styles.button}
                    onPress={startHandler}
                >
                    <Text>Start</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                    style={styles.button}
                    onPress={pauseHandler}
                >
                    <Text>Pause</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                    style={styles.button}
                    onPress={resetHandler}
                >
                    <Text>Reset</Text>
                </TouchableHighlight>
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
        justifyContent: 'center',
        alignItems: 'center'
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
    timerContainer: {
        flexDirection: 'row',
        margin: 20
    },
    intervalContainer: {
        marginTop: 20,
    },
});

export default TimerScreen;