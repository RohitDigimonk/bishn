import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


const GetStartedButton = ({ onPress, children }) => {
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
        width: 220,
        alignSelf: 'flex-end',
        backgroundColor: '#ffffff',
        borderRadius: 30,
        height:40,
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        marginBottom:10

        
    },
    textStyle: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 22,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        
        // fontFamily: 'Poppins'
        
    }


});

export { GetStartedButton };