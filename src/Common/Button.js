import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


const Button = ({ onPress, children }) => {
    return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>
            {children}
        </Text>
    </TouchableOpacity>
    );

};

const styles = StyleSheet.create ({
    buttonStyle: {
        width: 360,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 30,
        height:55,
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center'
        
    },
    textStyle: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        // fontFamily: 'Poppins'
        
    }


});

export { Button };