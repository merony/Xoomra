import {
  Alert,
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,
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

const InputBoxInMessage = (props) => {


 const chatData=props.cData
 let temp


 const Target = () =>{

  const [inputText,setInputText] = useState('')
  const [orderStatusForHost,setOrderStatusForHost] = useState(chatData.orderStatusForHost)
 
  const sendMSG = () => {
   Alert.alert("message to send",inputText)
  }

  if(chatData.hostName===chatData.userName){

  }

  temp =        
    <View style={styles.inputContainer}>
      <TextInput 
        placeholder='Write a message' 
        onChangeText={(text) => setInputText(text)}
        style={{flex:1}}
        // onFocus={() => setShouldShowIcon(true)}
        // onBlur={() =>setShouldShowIcon(false)}

      />
      <TouchableOpacity 
        onPress={sendMSG}>
        <MaterialIcons name='arrow-circle-up' size={30} color='#283239' />
      </TouchableOpacity>           
    </View>
    return temp
 }


    return (
      <View>    
        {/* <Target/> */}
        <View>

        </View>
      </View>
  
    );
  };
  
 
  
  export default InputBoxInMessage;
