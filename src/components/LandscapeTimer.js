import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import TimeDisplay from './TimeDisplay';
import ColouredButton from './ColouredButton';

const LandscapeTimer = ({ isBreak, secsLeft, startHandler, pauseHandler, resetHandler, background }) => {


    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.background}
                resizeMode='cover'
                source={
                    {uri: background}
                }
                testID="background-image"
            >    
                <View style={styles.subContainer}>                  
                    <View style={styles.timerContainer}>
                        <Text style={styles.text}>{`${isBreak ? "Break: " : "Work: "}`}</Text>
        
                        <TimeDisplay 
                            seconds={isBreak ? secsLeft["break"] : secsLeft["work"]}
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
                </View>
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        height: "40%",
    },
    timerContainer: {
        flex: 3,
        flexDirection: 'row',
        margin: 20,
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white',
        paddingVertical: 5,
        paddingLeft: 10
    },
    display: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white',
        paddingVertical: 5,
        paddingRight: 10
    },
});

export default LandscapeTimer;