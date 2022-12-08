import {
    Text,
    View
} from 'react-native';
import { useEffect, useState } from 'react';

import React from 'react';
import { StackActions } from "@react-navigation/native";
import styles from './styles';

const UserScreen = ({navigation, props}) => {


  useEffect(() => {
    //Runs on every render
    navigation.replace("TabNavigator");
  });

  useEffect(() => {
    //Runs only on the first render
    navigation.navigate("UserNav");
  }, []);
    


  //navigation.replace("UserNav");

    return (
      

      <View style={{flexDirection: "column"}}>
       <Text>User Screen</Text>

       <Text>User Screen</Text>
    </View>
        
       
    );
  };
  
 
  
  export default UserScreen;
