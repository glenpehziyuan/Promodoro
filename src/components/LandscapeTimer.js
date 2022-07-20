import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { TimeDisplay } from './TimeDisplay';
import { GreyButton } from './GreyButton';

const LandscapeTimer = ({ isBreak, secsLeft, startHandler, pauseHandler, resetHandler, background }) => {


    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.background}
                resizeMode='cover'
                source={
                    {uri: background }
                }
                testID="background-image"
            >    
                <View style={styles.subContainer}>                  
                    <View style={styles.timerContainer}>
                        <Text style={styles.text}>{`Time left for ${isBreak ? "Break: " : "Work: "}`}</Text>
        
                        <TimeDisplay seconds={isBreak ? secsLeft["break"] : secsLeft["work"]}/>
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
        alignItems: 'center',
    },
    timerContainer: {
        flex: 5,
        flexDirection: 'row',
        margin: 20,
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    background: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        color: 'white',
    }
});

export default LandscapeTimer;