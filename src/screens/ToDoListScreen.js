import React, {useEffect, useState} from 'react';
import { 
  KeyboardAvoidingView, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Keyboard, 
  ScrollView, 
  Platform 
} from 'react-native';
import { db, auth } from '../firebase';
import { collection , onSnapshot, updateDo, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { Task, GreyButton } from '../components';
import { async } from '@firebase/util';

const ToDoListScreen = ({ navigation }) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "users"),(snapshot)=>{
      snapshot.docs.forEach((doc) => {
        if (doc.data().uid === auth.currentUser.uid) {
            const usertoDoList = doc.data();
            setTaskItems(usertoDoList["tasks"]);
    }})});
  }, [task]);


  const handleAddTask = async() => {
    // Keyboard.dismiss();
    // const getuserId = collection(db,"users");
    // getuserId.docs.forEach((doc) => {
    //   if (doc.data().uid = auth.currentUser.uid) {
    //     const usertoDoList = doc.data()
    //     await updateDoc(usertoDoList, {
    //       tasks: arrayUnion(task)
    //     });
    //   }
    // })
  }

  const completeTask = async(index) => {
    // const getuserId = collection(db,"users");
    // getuserId.docs.forEach((doc) => {
    //   if (doc.data().uid = auth.currentUser.uid) {
    //     const usertoDoList = doc.data()
    //     task = usertoDoList[index];
    //     await updateDoc(usertoDoList, {
    //       tasks: arrayRemove(task)
    //     });
    //   }
    // })
  }

  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
      </View>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                    <Task text={item} /> 
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
        
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <GreyButton 
          pressHandler={() => navigation.popToTop()}
          title="Back to Home"
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFFE1',
  },
  titleContainer: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center'
  }, 
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#55BCF6',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#E3FFFB',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#55BCF6',
    borderWidth: 1,
  },
  addText: {},
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  }
});

export default ToDoListScreen;
