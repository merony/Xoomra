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

const MaxNightsWarning = (props) => {


  const maxNightsOfHost = props.data[0]
  const maxNightsOfGuest =props.data[1]


    if(maxNightsOfHost>=maxNightsOfGuest){
      return  (    
        <View>

        </View>
        
      )
    }
      return (
        <View style={styles.container}>
          <Text
          style={styles.warn}>
          Maximum nights of exchange exceeded
          </Text>
        </View>   
      );
  };
  
 
  
  export default MaxNightsWarning;
