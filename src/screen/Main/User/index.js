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
import { StackActions } from "@react-navigation/native";
import { TextInput } from 'react-native-gesture-handler';
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
