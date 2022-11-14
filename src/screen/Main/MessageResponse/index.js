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
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import MessageResponseItem from '../../../components/MessageResponseItem';
import messages from '../../../data/message';
import InputBoxInMessage from '../../../components/InputBoxInMessage';
import StayInfoInMessageComponent from '../../../components/StayInfoInMessage';
const MessageResponseScreen = ({navigation, props}) => {
    
  
  const dummyDataHostName = 'Tao'
  const dummyDataGuestName = 'Lukas'
  const dummyDataUserName = 'Lukas'
  // order status has five status ' unreceived, received, interested, accepted, rejected'
  const dummyDataOrderStatusForGuest = 'received'
  const dummyDataOrderStatusForHost = 'interested'
  
  const chatData = {
    hostName:dummyDataHostName,
    guestName:dummyDataGuestName,
    userName:dummyDataUserName,
    orderStatusForHost:dummyDataOrderStatusForHost,
    orderStatusForGuest:dummyDataOrderStatusForGuest
  }

    return (

      <View style={styles.container}>
        {/* stay */}
        <View>
          <StayInfoInMessageComponent cData={chatData}/>
        </View>
        

        {/* message list */}
        <View style={styles.listContainer}>
        <Text> </Text>
          <FlatList 
            data={messages} 
            renderItem={({item}) => <MessageResponseItem message={item}/>}
            // inverted
            style={styles.list}
          />
        </View>

        {/* input box */}
        <View style={styles.inputBox}>
          <InputBoxInMessage  chatData={chatData}/>
        </View>


    </View>
        
       
    );
  };
  
 
  
  export default MessageResponseScreen;
