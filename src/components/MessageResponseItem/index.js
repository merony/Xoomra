import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from 'react-native-paper';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import messages from '../../data/message';
import styles from './styles';

const MessageResponseItem = (props) => {   
  const userName1='Lukas'
  const user1Image="https://gartic.com.br/imgs/mural/na/naruto_uzumakinrt/avatar.png?v=0"
  const userName2='Daniil Top'
  const user2Image="https://gartic.com.br/imgs/mural/ku/kushina_uzumaki426/sasuke-uchiha-4.png"

  const dummyDataHostName = 'Lukas'
  const dummyDataGuestName = 'Daniil Top'


  const messageData = props.message

  // console.log ('All Message data', messageData )



  const UserImage = (propI) => {
    if (propI.fromName !==userName1){
      return <Image source={{uri:user1Image}} style={styles.image}/>
    }else{
      return <Image source={{uri:user2Image}} style={styles.image}/>
    }
  }

  
    return (

        <Pressable style={styles.container}>

          {/* photo */}
          <View > 
            <UserImage name={messageData.fromName}/>
          </View>

          {/* name, time, text */}
          <View >
            <View style={styles.row}>
              <Text style={styles.name}>
                {messageData.fromName}
              </Text>
              <Text style={styles.time}>
                {messageData.created_at.toDate().toDateString().slice(11,19)}
              </Text>
              <Text style={styles.time}>
                {messageData.created_at.toDate().toDateString().slice(0,10)}
              </Text>
            </View>
              <View style={{width:'93%'}}>
                <Text style={styles.text} >
                  {messageData.text}
                </Text>   
              </View>
    
          </View>




        


        </Pressable>     
    );
  };
  
 
  
  export default MessageResponseItem;
