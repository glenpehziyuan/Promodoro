import react, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, TextInput, StyleSheet } from 'react-native';
import { TimeDisplay } from '../components';

const SECS_IN_MIN = 60;

const updateObject = ( obj, key, value ) => {
    const newObj = {...obj};
    newObj[key] = value;
    return newObj;
}    

const TimerScreen = ({ navigation }) => {

    const [isNewSession, setIsNewSession] = useState(true);
    
    // to toggle the timers that the buttons control
    const [isBreak, setIsBreak] = useState(false); 

    // the user's desired work-break split
    const [split, setSplit] = useState({
        work: 0,
        break: 0
    });
    
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
            console.log(`new status: ${isBreak ? "break" : "work"}`);
            startTimer(isBreak ? "break" : "work");
        }
    }, [isBreak]);

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

    const proceedHandler = () => {

    }

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
            <TextInput
                style={styles.textBox} 
                placeholder='Work'
                onChangeText={(mins) => 
                    setSplit((splitObj) => {
                        return updateObject(splitObj, "work", parseInt(mins) * SECS_IN_MIN)
                    })
                }
                keyboardType='numeric'
            />

           <TextInput 
                style={styles.textBox} 
                placeholder='Break'
                onChangeText={(mins) => 
                    setSplit((splitObj) => {
                        return updateObject(splitObj, "break", parseInt(mins) * SECS_IN_MIN)
                    })
                }
                keyboardType='numeric'
            />

            <TouchableHighlight 
                style={styles.buttonContainer}
                onPress={proceedHandler}
            >
                <Text>Proceed to Session</Text>
            </TouchableHighlight>

            <Text>{`Currently ${isBreak ? "on break!" : "working!"}`}</Text>

            <TimeDisplay seconds={isBreak ? secsLeft.break : secsLeft.work}/>

            <TouchableHighlight 
                style={styles.buttonContainer}
                onPress={startHandler}
            >
                <Text>Start</Text>
            </TouchableHighlight>

            <TouchableHighlight 
                style={styles.buttonContainer}
                onPress={pauseHandler}
            >
                <Text>Pause</Text>
            </TouchableHighlight>

            <TouchableHighlight 
                style={styles.buttonContainer}
                onPress={resetHandler}
            >
                <Text>Reset</Text>
            </TouchableHighlight>

            <TouchableHighlight 
                style={styles.buttonContainer}
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
    textBox:{
        marginBottom: 10,
        borderBottomWidth: 1,
        width: 50
    },
    buttonContainer: {
        backgroundColor: '#dcdcdc',
        margin: 10,
        alignItems: 'center',
        padding: 10
    },
});

export default TimerScreen;