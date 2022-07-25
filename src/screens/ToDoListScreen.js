import { View, Button, Text, Modal, SafeAreaView, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import InlineTextButton from '../components/InlineTextButton';
import { AppStyles, GreyButton } from '../components';
import { auth, db } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import React from 'react';
import AddToDoModal from '../components/AddToDoModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function ToDoListScreen({ navigation }) {
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [toDos, setToDos] = React.useState([]);

  let loadToDoList = async () => {
    const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
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

  let checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, 'todos', item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  };

  let deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "todos", toDoId));
    let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    setToDos(updatedToDos);
  };

  let renderToDoItem = ({item}) => {
    return (
      <View style={[AppStyles.rowContainer, AppStyles.rightMargin, AppStyles.leftMargin]}>
        <View style={AppStyles.fillSpace}>
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
        <InlineTextButton text="Delete" color="#258ea6" onPress={() => deleteToDo(item.id)} />
      </View>
    );
  }

  let showToDoList = () => {
    return (
      <FlatList
        data={toDos}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadToDoList();
          setIsRefreshing(true);
        }}
        renderItem={renderToDoItem}
        keyExtractor={item => item.id} />
    )
  };

  let showContent = () => {
    return (
      <View style={styles.contentContainer}>
        {isLoading ? <ActivityIndicator size="large" /> : showToDoList() }
        <Button 
          title="Add ToDo" 
          onPress={() => setModalVisible(true)} 
          color="#fb4d3d" />
      </View>
    );
  };

  // let showSendVerificationEmail = () => {
  //   return (
  //     <View>
  //       <Text>Please verify your email to use ToDo</Text>
  //       <Button title="Send Verification Email" onPress={() => sendEmailVerification(auth.currentUser)} />
  //     </View>
  //   );
  // };

  let addToDo = async (todo) => {
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
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin, AppStyles.topMargin]}>
        <InlineTextButton text="Manage Account" color="#258ea6" onPress={() => navigation.navigate("ManageAccount")}/>
      </View> */}
      <View style={styles.subcontainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <AddToDoModal 
            onClose={() => setModalVisible(false)}
            addToDo={addToDo} />
        </Modal>
        <Text style={AppStyles.header}>ToDo</Text>
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
})