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

const TermsItem = ( props) => {
    
  const number = props.term.id+1
  const title = props.term.title
  const text = props.term.text
  let backgroundColor

  const ReturnCell = () =>{
    let temp
    if(number%2===0){
      temp = 
        <View style={{backgroundColor:'#edeef0'}}>
          <Text 
            style={styles.title}
            numberOfLines={2}
            >{number}. {title}
          </Text>
  
          <Text 
            style={styles.text}
            >{text}
          </Text>
  
        </View>
    }else{
      temp = 
        <View style={{backgroundColor:'#edeef0'}}>
          <Text 
            style={styles.title}
            numberOfLines={2}
            >{number}. {title}
          </Text>
  
          <Text 
            style={styles.text}
            >{text}
          </Text>
  
        </View>
    }

    return temp

  }

    return (
      <View style={{flexDirection: "column"}}>
        <ReturnCell/>
    </View>
        
       
    );
  };
  
 
  
  export default TermsItem;
