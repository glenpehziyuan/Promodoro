import { Text, TouchableHighlight, StyleSheet } from 'react-native';

const GreyButton = ({ pressHandler, title }) => {
    return (
        <TouchableHighlight 
            style={styles.button}
            onPress={pressHandler}
        >
        <Text>{title}</Text>
      </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#dcdcdc',
        margin: 10,
        alignItems: 'center',
        padding: 10
    },
});

export default GreyButton;