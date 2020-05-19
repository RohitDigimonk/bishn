import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

const Input =({ label, value, onChangeText, placeholder, secureTextEntry,autoCapitalize, placeholderTextColor }) => {
    const {inputStyle, labelStyle, containerStyle} = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoCorrect={false}
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    inputStyle: {
        color: '#ffffff',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        // fontFamily: 'futur'
        
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        // flex: 1
        fontFamily:'futur'
    },
    containerStyle: {
        height: 40,
        width:360,
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'orange',
        borderBottomWidth: 2,
        borderColor:'white',
        marginBottom: 25,
        fontFamily: 'futur'
    }
});


export {Input};