import React from 'react';
import { StyleProp, TextStyle, ViewStyle, TextInputProps, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
declare type Props = TextInputProps & {
    inputContainerStyles?: StyleProp<ViewStyle>;
    firstInput: boolean;
    focusStyles?: StyleProp<ViewStyle>;
    inputStyles?: StyleProp<TextStyle>;
    numberOfInputs: number;
    handleTextChange: (text: string) => void;
    inputValue: string;
    handleKeyPress: (keyPressEvent: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
};
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
