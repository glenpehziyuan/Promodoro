import { View, Text } from 'react-native';

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
            <Text>{toDoubleDigits(mins)} : {toDoubleDigits(secs)}</Text>
        </View>
    );
};

    

export default TimeDisplay;