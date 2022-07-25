import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const LoadingScreen = () => {
    
    return (
        <View style={styles.container}>
            <Icon 
                name="loading1"
                style={styles.icon}
            />
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEFFE1',
    },
    icon: {
        fontSize: 96
    },
    text: {
        margin: 20,
    }
});

export default LoadingScreen;