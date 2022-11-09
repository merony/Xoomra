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
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import { Divider } from 'react-native-paper';
import messages from '../../data/message';

const MessageResponseItem = (props) => {   
  const userName1='Lukas'
  const user1Image="https://gartic.com.br/imgs/mural/na/naruto_uzumakinrt/avatar.png?v=0"
  const userName2='Daniil Top'
  const user2Image="https://gartic.com.br/imgs/mural/ku/kushina_uzumaki426/sasuke-uchiha-4.png"


  const UserImage = (propI) => {
    if (propI.name===userName1){
      return <Image source={{uri:user1Image}} style={styles.image}/>
    }else{
      return <Image source={{uri:user2Image}} style={styles.image}/>
    }
  }
    return (

        <Pressable style={styles.container}>

          {/* photo */}
          <View > 
            <UserImage name={props.message.user.name}/>
          </View>

          {/* name, time, text */}
          <View >
            <View style={styles.row}>
              <Text style={styles.name}>
                {props.message.user.name}
              </Text>
              <Text style={styles.time}>
                {props.message.createdAt.slice(11,19)}
              </Text>
              <Text style={styles.time}>
                {props.message.createdAt.slice(0,10)}
              </Text>
            </View>
              <View style={{width:'93%'}}>
                <Text style={styles.text} >
                  {props.message.text}
                </Text>   
              </View>
    
          </View>




        


        </Pressable>     
    );
  };
  
 
  
  export default MessageResponseItem;
