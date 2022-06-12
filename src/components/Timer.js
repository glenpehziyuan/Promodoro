import react, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ToastAndroid } from 'react-native';

const SECS_IN_MIN = 60;

const Timer = ({ totalMins, style }) => {
    const [timer, setTimer] = useState(null); // keeps track of the interval
    const [secondsLeft, setSecondsLeft] = useState(0);

    // first render: initializes the timer
    useEffect(() => {
        setSecondsLeft(totalMins * SECS_IN_MIN)
        startTimer();
    }, []);

    // kills the timer / the interval once time ends
    useEffect(() => {
        if (timer && secondsLeft === 0) { 
            clearInterval(timer);
        }
    }, [secondsLeft, timer]);

    // creates a new interval that runs every second (kills any existing timer first)
    const startTimer = () => {
        clearInterval(timer)
        const intervalID = setInterval(() => {
            setSecondsLeft((current) => current > 0 ? current - 1 : 0);
        }, 1000);
        setTimer(intervalID);
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
        <View style={style}>
            <Text>{timeLeft(secondsLeft).mins} : {timeLeft(secondsLeft).secs}</Text>
        </View>
    );
};

export default Timer;