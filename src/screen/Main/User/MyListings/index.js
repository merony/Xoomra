import {
Text,
TouchableOpacity,
View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

const MyListingsScreen = ({navigation, props}) => {


  useEffect(() => {
    //Runs on every render
     navigation.replace("UserNav");
  });

  useEffect(() => {
    //Runs only on the first render
    navigation.navigate("MyListingNav");
  }, []);
    
    
    return (

      <View style={{flexDirection: "column"}}>

       <Text> My Listings Screen </Text>

    </View>
        
       
    );
  };
  
 
  
  export default MyListingsScreen;