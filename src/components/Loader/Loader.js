import {
    ActivityIndicator,
    View
} from 'react-native';
import React from 'react';

const Loader = (props) => {



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={'blue'} size={'large'} />
        </View>
    );
};



export default Loader;
