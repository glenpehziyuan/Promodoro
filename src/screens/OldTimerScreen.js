import react, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ToastAndroid } from 'react-native';

const SECS_IN_MIN = 60;

const TimerScreen = () => {
    const [timer, setTimer] = useState(null); // keeps track of the interval
    const [secondsLeft, setSecondsLeft] = useState(0);

    // kills the timer / the interval once time ends
    useEffect(() => {
        timer && secondsLeft === 0 &&
            clearInterval(timer);
    }, [secondsLeft, timer]);

    // reads input time
    const configureTime = (mins) => {
        const secs = parseInt(mins) * SECS_IN_MIN;
        setSecondsLeft(secs);
    };

    const startTimer = () => {
        const intervalID = setInterval(() => {
            setSecondsLeft((current) => current > 0 ? current - 1 : 0);
        }, 1000); // run every second
        setTimer(intervalID);
    };

    const pauseTimer = () => {
        clearInterval(timer);
        setTimer(null);
    };

    const resetTimer = () => {
        clearInterval(timer);
        setTimer(null);
        setSecondsLeft(0);
    };

    const startHandler = () => {
        // if a timer is already running, or there is no time set, don't do anything
        if (timer || secondsLeft === 0) {
            return;
        } else {
            startTimer();
            ToastAndroid.show("Timer started", ToastAndroid.SHORT);
        }
    };

    const pauseHandler = () => {
        if (timer) {
            pauseTimer();
            ToastAndroid.show("Timer paused", ToastAndroid.SHORT);
        }
    };

    const resetHandler = () => {
        resetTimer();
        ToastAndroid.show("Timer reset. Re-enter minutes", ToastAndroid.SHORT);
    };

    // converts seconds to min : sec
    const timeLeft = (seconds) => {
        const mins = Math.floor(seconds / SECS_IN_MIN);
        const secs = Math.floor(seconds % SECS_IN_MIN);

        const toDoubleDigits = (num) => {
            return num < 10 ? `0${num}` : `${num}`;
        };

        return {
            mins: toDoubleDigits(mins),
            secs: toDoubleDigits(secs),
        };
    };

    return (
        <View>
            <TextInput 
                placeholder='minutes'
                onChangeText={configureTime}
            />

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

            <Text>{timeLeft(secondsLeft).mins} minutes {timeLeft(secondsLeft).secs} seconds</Text>
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