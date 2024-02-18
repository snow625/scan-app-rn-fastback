import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const MyButton = (props) => {
  const { onPress, text, mode, ...buttonProps } = props;

  return (
    <Button mode={mode} onPress={onPress} {...buttonProps}>
      {text}
    </Button>
  );
};
MyButton.defaultProps = {
  text: "NO TEXT",
  onPress: () => {},
  mode: "contained",
};


export default MyButton;

const styles = StyleSheet.create({});
