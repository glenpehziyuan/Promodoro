import react, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ToastAndroid } from 'react-native';
import { Timer } from '../components';

const SECS_IN_MIN = 60;

const updateObject = ( obj, key, value ) => {
    const newObj = {...obj};
    newObj[key] = value;
    return newObj;
}    

const TimerScreen = () => {

    const [isBreak, setIsBreak] = useState(false); // for toggling between work & break timers
    const [split, setSplit] = useState({
        work: 0,
        break: 0
    });
    const [secsLeft, setSecsLeft] = useState({
        work: 0,
        break: 0
    });
    const [timer, setTimer] = useState({
        work: null,
        break: null
    });

    // kills the timer / the interval once time ends
    useEffect(() => {
        for (const id of Object.keys(timer)) {
            if (timer[id] && secsLeft[id] === 0) { 
                clearInterval(timer[id]);
            }
        }

    }, [secsLeft, timer]);

    // const workTimer = () => {
    //     return (
    //         <Timer totalMins={25}/>
    //     );
    // };

    // const breakTimer = () => {
    //     return (
    //         <Timer totalMins={5}/>
    //     );
    // };

    // useEffect(() => {
    //     setSecondsLeft(totalMins * SECS_IN_MIN)
    //     startTimer();
    // }, []);

    // creates a new interval that runs down the specified timer every second
    const startTimer = (id) => {
        clearInterval(timer[id])

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

    const proceedHandler = () => {

    }

    const startHandler = (id) => {

    };

    const pauseHandler = (id) => {
        
    };

    const resetHandler = (id) => {
        
    };

    return (
        <View>
            <TextInput 
                placeholder='Work'
                onChangeText={(mins) => 
                    setSplit((splitObj) => {
                        return updateObject(splitObj, "work", parseInt(mins))
                    })
                }
                keyboardType='numeric'
            />

           <TextInput 
                placeholder='Break'
                onChangeText={(mins) => 
                    setSplit((splitObj) => {
                        return updateObject(splitObj, "break", parseInt(mins))
                    })
                }
                keyboardType='numeric'
            />

            <Pressable 
                style={styles.button}
                onPress={proceedHandler}
            >
                <Text>Proceed to Session</Text>
            </Pressable>

            <Text>Work: {`${split.work}`}</Text>

            <Text>Break: {`${split.break}`}</Text>

            <Pressable 
                style={styles.button}
                onPress={startHandler}
            >
                <Text>Start</Text>
            </Pressable>

            <Pressable 
                style={styles.button}
                onPress={pauseHandler}
            >
                <Text>Pause</Text>
            </Pressable>

            <Pressable 
                style={styles.button}
                onPress={resetHandler}
            >
                <Text>Reset</Text>
            </Pressable>
            
        </View>
    );

};

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        padding: 5,
    }
});

export default TimerScreen;