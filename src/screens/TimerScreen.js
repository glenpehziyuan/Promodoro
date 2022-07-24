import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { TimeDisplay, GreyButton, LandscapeTimer, ColouredButton } from '../components';
import { updateObject } from '../utils';
import LoadingScreen from './LoadingScreen';

const SECS_IN_MIN = 60;

const TimerScreen = ({ route, navigation }) => {
    // HOOKS    
    // tracks whether it is a new session
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

    // kills timers on unmount
    useEffect(() => {
        const cleanup = () => {
            for (const id of Object.keys(timer)) {
                clearInterval(timer[id]);
            };
        };

        return cleanup;
    }, []);

    
    // VARIABLES
    // the user's desired work-break split & background
    const configs = {
        work: route.params["work"],
        break: route.params["break"],
        background: route.params["background"]
    };

    // tracks screen orientation
    const { width, height } = useWindowDimensions();
    const orientation = width > height ? "landscape" : "portrait";

    
    // HELPER FUNCTIONS USED BY HOOKS & BUTTON HANDLERS
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

    // if background link has not been loaded, render LoadingScreen instead
    if (configs["background"] === "") {
        return (
            <LoadingScreen />
        );
    } else if (orientation === "landscape") {
        return (
            <LandscapeTimer 
                isBreak={isBreak}
                secsLeft={secsLeft}
                startHandler={startHandler}
                pauseHandler={pauseHandler}
                resetHandler={resetHandler}
                background={configs["background"]}
            />
        )
    } else {
        return (
            <View style={styles.container}>

                <View style={styles.instructionsContainer}>
                    <Text style={styles.title}>How to use:</Text>
                    <Text style={styles.instructions}>
                        Control the timer with the buttons below, and rotate your screen for full-screen display.
                    </Text>
                    <Text style={styles.instructions}>
                        Your Pomodoro interval: {`${configs["work"]}`} - {`${configs["break"]}`}
                    </Text>
                </View>
                
                <View style={styles.backgroudContainer}>
                    <Image
                        style={styles.background}
                        source={
                            {uri: configs["background"] }
                        }
                        testID="background-image"
                    />
                </View>
                
                <View style={styles.timerContainer}>

                    <Text>{`Time left for ${isBreak ? "Break: " : "Work: "}`}</Text>
    
                    <TimeDisplay 
                        seconds={isBreak ? secsLeft.break : secsLeft.work}
                        style={styles.display}
                    />
                </View>
    
                <View style={styles.buttonContainer}>
                    <ColouredButton 
                        pressHandler={startHandler}
                        title="Start"
                        colour="#D6FFD9"
                    />
    
                    <ColouredButton 
                        pressHandler={pauseHandler}
                        title="Pause"
                        colour="#FBECE9"
                    />
    
                    <ColouredButton 
                        pressHandler={resetHandler}
                        title="Reset"
                        colour="#E3FFFB"
                    />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FEFFE1',
        paddingTop: 50
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
    backgroudContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    }, 
    buttonContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    timerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    display: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    background: {
        width: '90%',
        height: '80%',
    },
});

export default TimerScreen;