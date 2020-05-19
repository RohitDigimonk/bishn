import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


const CategoryButton2 = ({ onPress, children }) => {
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
        width: 30,
        alignSelf: 'center',
        backgroundColor: '#000000',
        borderRadius: 200,
        height:30,
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        borderWidth:2,
        borderColor:'#ffffff'
        
    },
    textStyle: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 12,
        
        
    }


});

export { CategoryButton2 };