import { Text, TouchableHighlight, StyleSheet } from 'react-native';

const ColouredButton = ({ pressHandler, title, colour }) => {
    const styles = StyleSheet.create({
        button: {
            flex: 1,
            backgroundColor: colour,
            alignItems: 'center',
            justifyContent: 'center',
            height: '80%',
            width: '40%',
            marginHorizontal: 10,
        },
    });
    
    return (
        <TouchableHighlight 
            style={styles.button}
            onPress={pressHandler}
        >
            <Text>{title}</Text>
        </TouchableHighlight>
    );
};

export default ColouredButton;