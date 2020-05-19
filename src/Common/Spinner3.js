import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Spinner3 = ({ size }) => {
    return (
        <View style={styles.spinnerStyle}>
                <ActivityIndicator size={size || 'large'} color='#000' />
        </View>
    )
}

const styles = {
    spinnerStyle: {
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 30,
        alignItems:"center",
        justifyContent: 'center'
    }
}


export {Spinner3};