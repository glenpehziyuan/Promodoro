import { Text, Pressable } from 'react-native';
import { toDoListStyles } from '../utils';

export default function InlineTextButton(props) {
  let style = {};
  if (props.color) {
    style.color = props.color
  };
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <Text 
          style={
            [pressed ? toDoListStyles.pressedInlineTextButton : toDoListStyles.inlineTextButton, style]
          }
        >
            {props.text}
        </Text>
      )}
    </Pressable>
  )
}