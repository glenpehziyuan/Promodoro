import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { toDoListStyles } from '../utils';

const AddToDoModal = (props) => {
  let [todo, setTodo] = useState("");
  
  return (
    <View style={toDoListStyles.container}>
      <Text style={toDoListStyles.header}>Add ToDo</Text>
      <TextInput 
          style={[toDoListStyles.textInput, toDoListStyles.darkTextInput]} 
          placeholder='ToDo'
          value={todo}
          onChangeText={setTodo} />
      <View style={
        [toDoListStyles.rowContainer, toDoListStyles.rightAligned, toDoListStyles.rightMargin]
      }>
        <Button title="Cancel" onPress={props.onClose} />
        <Button title="OK" onPress={() => {
          props.addToDo(todo);
          setTodo("");
          props.onClose();
        }} />
      </View>
    </View>
  );
};

export default AddToDoModal;