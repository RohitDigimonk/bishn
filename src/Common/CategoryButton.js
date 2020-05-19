import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


const CategoryButton = ({ onPress, children }) => {
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
        width: 60,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        height:30,
        alignItems:"center",
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center',
        position:'absolute'
        
    },
    textStyle: {
        textAlign: 'center',
        color: '#000',
        fontSize: 12,
        fontFamily:'Futura'
       
        
    }


});

export { CategoryButton };