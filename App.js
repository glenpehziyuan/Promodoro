import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { Timer } from './src/components';
import { TimerScreen } from './src/screens';


export default function App() {
  return (
    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <AppNavigator />
    // </View>

    <AppNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    backgroundColor: 'coral',
  },
});
