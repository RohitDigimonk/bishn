import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

const Input2 =({ label, value, onChangeText, placeholder, secureTextEntry,autoCapitalize, placeholderTextColor }) => {
    const {inputStyle, labelStyle, containerStyle} = styles;
    return (
        <View style={{height:40,width:320}}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoCorrect={false}
            style={inputStyle}
            value={value}
            autoCapitalize={autoCapitalize}
            onChangeText={onChangeText}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    inputStyle: {
        color: '#fff',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        paddingLeft:15,
        paddingBottom:5,
        fontFamily: 'Futura'
        
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        // flex: 1
        // fontFamily:'futur'
    },
  
});


export {Input2};