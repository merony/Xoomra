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
import places from '../../../data/stayFeed';
import StayInfoGuestInMessageComponent from '../../../components/StayInfoInMessage/indexGuest';
const MessageResponseScreen = ({navigation, props}) => {

  //get data of host and guest (host is the current user),the listing of current  will be displayed on top
  //send data as chatData to component
  //if both users orders' status do not contain unreceived, received or rejected, show input box

  const stayIDOfHost = '0'
  const stayhost = places.find(place => place.id === stayIDOfHost)
  const stayIDOfGuest = '1'
  const stayGuest = places.find(place => place.id === stayIDOfGuest)
    
  
  const dummyDataHostName = 'Vadim'
  const dummyDataGuestName = 'Lukas'
  const dummyDataUserName = 'Vadim'
  // order status has five status ' unreceived, received, interested, accepted, rejected'
  const dummyDataOrderStatusOfGuestsOrder = 'interested'
  const dummyDataOrderStatusOfHostsOrder = 'accepted'

  const [orderStatusOfGuestsOrder,setOrderStatusOfGuestsOrder] = useState(dummyDataOrderStatusOfGuestsOrder)
  const [orderStatusOfHostsOrder,setOrderStatusOfHostsOrder] = useState(dummyDataOrderStatusOfHostsOrder)



  const setGuestOrderStatus = (orderStatus) =>{
    // dummyDataOrderStatusOfGuestsOrder=orderStatus
    setOrderStatusOfGuestsOrder(orderStatus)
  }
  const setHostOrderStatus = (orderStatus) =>{
    // dummyDataOrderStatusOfHostsOrder=orderStatus
    setOrderStatusOfHostsOrder(orderStatus)
  }
  
  const stayInfoDataHost = () =>{
    

      const chatData = {
        hostName:dummyDataHostName,
        guestName:dummyDataGuestName,
        userName:dummyDataUserName,
        orderStatus:dummyDataOrderStatusOfGuestsOrder,
        stay:stayhost,
        setOrderStatus:setGuestOrderStatus,
      }

      return chatData

    
  }
  const stayInfoDataGuest = () =>{
      const chatData = {
        hostName:dummyDataGuestName,
        guestName:dummyDataHostName,
        userName:dummyDataUserName,
        orderStatus:dummyDataOrderStatusOfHostsOrder,
        stay:stayGuest,
        setOrderStatus:setHostOrderStatus,
    }
      return chatData

    }

  
  const showInput = () =>{
    let temp 
    if (
      orderStatusOfGuestsOrder==='unreceived' || 
      orderStatusOfGuestsOrder==='received' ||
      orderStatusOfGuestsOrder==='rejected' ||
      orderStatusOfHostsOrder==='unreceived' ||
      orderStatusOfHostsOrder==='received' ||
      orderStatusOfHostsOrder==='rejected'){
        temp = false
      }else{
        temp = true
      }
      
      return temp
  }
    
    
    
    return (
      
      <View style={styles.container}>
        {/* stay */}
        <View>
          <StayInfoInMessageComponent cData={stayInfoDataHost()}/>
        </View>
        <View>
          <StayInfoGuestInMessageComponent cData={stayInfoDataGuest()}/>
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
          <InputBoxInMessage  cData={showInput()}/>
        </View>


    </View>
        
       
    );
  };
  
 
  
  export default MessageResponseScreen;
