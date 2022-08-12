import { View, Button, Text, Modal, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import { GreyButton, InlineTextButton, AddToDoModal } from '../components';
import { toDoListStyles } from '../utils';
import LoadingScreen from './LoadingScreen';
import { auth, db } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ToDoListScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toDos, setToDos] = useState([]);

  const loadToDoList = async () => {
    const docQuery = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(docQuery);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });
    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadToDoList();
  }

  const checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, 'todos', item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  };

  const deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "todos", toDoId));
    let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    setToDos(updatedToDos);
  };

  const renderToDoItem = ({item}) => {
    return (
      <View style={
        [toDoListStyles.rowContainer, toDoListStyles.rightMargin, toDoListStyles.leftMargin]
      }>
        <View style={toDoListStyles.fillSpace}>
          <BouncyCheckbox
            isChecked={item.complated}
            size={25}
            fillColor="#258ea6"
            unfillColor="#FFFFFF"
            text={item.text}
            iconStyle={{ borderColor: "#258ea6" }}
            onPress={(isChecked) => { checkToDoItem(item, isChecked)}}
          />
        </View>
        
        <InlineTextButton 
          text="Delete" 
          color="#258ea6" 
          onPress={() => deleteToDo(item.id)} 
        />

      </View>
    );
  }

  const showToDoList = () => {
    return (
      <FlatList
        data={toDos}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadToDoList();
          setIsRefreshing(true);
        }}
        renderItem={renderToDoItem}
        keyExtractor={item => item.id} 
      />
    )
  };

  const showContent = () => {
    return (
      <View style={styles.contentContainer}>
        { showToDoList() }
        <Button 
          title="Add ToDo" 
          onPress={() => setModalVisible(true)} 
          color="#fb4d3d" 
        />
      </View>
    );
  };

  const addToDo = async (todo) => {
    let toDoToSave = {
      text: todo,
      completed: false,
      userId: auth.currentUser.uid
    };
    const docRef = await addDoc(collection(db, "todos"), toDoToSave);

    toDoToSave.id = docRef.id;

    let updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);
  };
  
  if (isLoading) {
    return (
      <LoadingScreen />
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <AddToDoModal 
              onClose={() => setModalVisible(false)}
              addToDo={addToDo} 
            />
          </Modal>
          <Text style={toDoListStyles.header}>To-Do List</Text>
          {showContent()}
        </View>

        <View style={styles.buttonContainer}>
          <GreyButton 
            pressHandler={() => navigation.popToTop()}
            title="Back to Home"
          />
        </View>
        
      </SafeAreaView>
    )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#FEFFE1",
    width: '100%'
  },
  subcontainer: {
    flex: 9,
  },
  contentContainer: {
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});

export default ToDoListScreen;