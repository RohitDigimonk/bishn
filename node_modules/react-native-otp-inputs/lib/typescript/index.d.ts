import React from 'react';
import { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { OtpInputsRef } from './types';
declare const OtpInputs: React.ForwardRefExoticComponent<TextInputProps & {
    keyboardType?: "default" | "email-address" | "phone-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined;
    style?: ViewStyle | undefined;
    focusStyles?: ViewStyle | undefined;
    defaultValue?: string | undefined;
    handleChange: (otpCode: string) => void;
    inputContainerStyles?: ViewStyle | undefined;
    inputStyles?: TextStyle | undefined;
    isRTL?: boolean | undefined;
    numberOfInputs: number;
    testIDPrefix?: string | undefined;
} & React.RefAttributes<OtpInputsRef>>;
export { OtpInputsRef };
export default OtpInputs;
