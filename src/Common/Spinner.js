import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Spinner = ({ size }) => {
    return (
        <View style={styles.spinnerStyle}>
                <ActivityIndicator size={size || 'large'} color='#000' />
        </View>
    )
}

const styles = {
    spinnerStyle: {
        width: 360,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        height:55,
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center'
    }
}


export {Spinner};