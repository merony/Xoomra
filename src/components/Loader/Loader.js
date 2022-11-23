import {
    ActivityIndicator,
    View
} from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
const Loader = (props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={'large'} color={'blue'} />
        </View>
    );
};



export default Loader;
