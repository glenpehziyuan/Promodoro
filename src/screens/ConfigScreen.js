import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { GreyButton } from '../components';
import { updateObject } from '../utils';

const DEFAULT_WORK_MINS = 25;
const DEFAULT_BREAK_MINS = 5;

const ConfigScreen = ({ navigation }) => {

    // the user's desired work-break split
    const [split, setSplit] = useState({
        work: 25,
        break: 5,
    });

    const proceedHandler = () => {
        navigation.navigate("Timer", {...split});
    }

    return (
        <View style={styles.container}>
            <View style={styles.instructionsContainer}>
                <Text>How to use:</Text>
                <Text style={styles.instructions}>1. Enter the no. of minutes you want to work and break respectively.</Text>
                <Text style={styles.instructions}>2. Proceed.</Text>
            </View>

            <View style={styles.textBoxContainer}>
                <TextInput
                    style={styles.textBox} 
                    placeholder='Work'
                    onChangeText={(mins) => 
                        setSplit((splitObj) => {
                            return updateObject(splitObj, "work", parseInt(mins))
                        })
                    }
                    keyboardType='numeric'
                    defaultValue={`${DEFAULT_WORK_MINS}`}
                />
                <TextInput 
                    style={styles.textBox} 
                    placeholder='Break'
                    onChangeText={(mins) => 
                        setSplit((splitObj) => {
                            return updateObject(splitObj, "break", parseInt(mins))
                        })
                    }
                    keyboardType='numeric'
                    defaultValue={`${DEFAULT_BREAK_MINS}`}
                />
            </View>

            <GreyButton 
                pressHandler={() => proceedHandler()}
                title="Proceed"
            />

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
    textBox: {
        margin: 10,
        borderBottomWidth: 1,
        width: 50,
    },
    textBoxContainer: {
        flexDirection: 'row',
        margin: 20
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
});

export default ConfigScreen;