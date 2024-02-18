import { View } from "react-native";
import { memo, useRef, useCallback } from "react";
import { TextInput } from "react-native-paper";

const TextField = (props) => {
    const { value, onChange, label, onFocus, mode, stateName, ...inputProps } = props;
    const position = useRef(null);

    const onLayout = useCallback((event) => {
        const { y } = event.nativeEvent.layout;
        !position.current && (position.current = y);
    }, []);

    return (
        <View onLayout={onLayout}>
            <TextInput
                onFocus={() => {
                    onFocus(position.current);
                }}
                label={label}
                value={value}
                onChangeText={(value) => {
                    onChange(value, stateName);
                }}
                mode={mode}
                {...inputProps}
            ></TextInput>
        </View>
    );
};

TextField.defaultProps = {
    text: "NO TEXT",
    onChange: () => {},
    onFocus: () => {},
    mode: "outlined",
    stateName: "noName",
};

export default memo(TextField);
