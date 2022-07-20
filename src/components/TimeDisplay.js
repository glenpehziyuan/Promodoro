import { View, Text, StyleSheet } from 'react-native';

const SECS_IN_MIN = 60;

// converts seconds to min : sec
const TimeDisplay = ({ seconds }) => {
    const mins = Math.floor(seconds / SECS_IN_MIN);
    const secs = Math.floor(seconds % SECS_IN_MIN);

    const toDoubleDigits = (num) => {
        return num < 10 ? `0${num}` : `${num}`;
    };

    return (
        <View>
            <Text style={styles.display}>{toDoubleDigits(mins)} : {toDoubleDigits(secs)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    display: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'coral'
    },
})

export default TimeDisplay;