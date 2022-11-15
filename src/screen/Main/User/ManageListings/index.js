import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

const ManageListingScreen = ({navigation, props}) => {
    
  



    return (

      <View style={{flexDirection: "column", margin: 20}}>

<View style={{flexDirection: "row", justifyContent: 'flex-end'}}>

<TouchableOpacity title="X"  onPress = { () => navigation.navigate("Add Listing")} >
                            <Text style = {{fontWeight: '500', fontSize: 14, color: "#030f14", textDecorationLine: 'underline'}}>Add New Listing</Text>
                        </TouchableOpacity>

</View>



    </View>
        
       
    );
  };
  
 
  
  export default ManageListingScreen;