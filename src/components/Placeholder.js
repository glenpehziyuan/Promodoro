import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Placeholder = ({ width, height, placeholderText }) => {
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#DCDCDC',
            width: width,
            height: height
        },
        icon: {
            fontSize: 64
        },
        text: {
            marginTop: 20,
        }
    });

    return (
        <View style={styles.container}>
            <Icon 
                name="plane"
                style={styles.icon}
            />
            <Text style={styles.text}>{`${placeholderText}`}</Text>
        </View>
    )
};

export default Placeholder;