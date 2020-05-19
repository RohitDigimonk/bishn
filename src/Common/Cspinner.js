import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Cspinner = ({ size }) => {
    return (
        <View style={styles.spinnerStyle}>
                <ActivityIndicator size={size || 'large'} color='#ffffff' />
        </View>
    )
}

const styles = {
    spinnerStyle: {
        // width: 360,
        alignSelf: 'center',
        backgroundColor: 'gba(0,0,0,.5)',
        // borderRadius: 30,
        // height:55,
        alignItems:"center",
        // marginLeft: 5,
        // marginRight: 5,
        justifyContent: 'center'
    }
}


export {Cspinner};