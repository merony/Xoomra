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

const LongTextComponent = (props) => {


  const longText = props.dataText;
  const ShouldBeFolded = props.dataFold;


    if(ShouldBeFolded){
      return  (    
        <View style={styles.container}>
          <Text
          numberOfLines={5} 
          ellipsizeMode='tail' 
          style={styles.stayDescription}>
            {longText} 
          </Text>

          <Text style={styles.showMore}>
              Show More
          </Text>
        </View>
        
      )
    }

      return (
        <View style={styles.container}>
          <Text
          style={styles.stayDescription}>
            {longText} 
          </Text>
        </View>   
      );
  };
  
 
  
  export default LongTextComponent;
