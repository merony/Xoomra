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

const StayInfoInMessageComponent = (props) => {
    
  const image = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg'
  const stayTitle = 'NEW lux. apartment in the center of Santa Cruz'
  const exchangeStatus = 'Interested'
  const exchangePeriod = 'Sep.19 - 20'
  const chatData=props.cData

  const [orderStatusForHost,setOrderStatusForHost] = useState(chatData.orderStatusForHost)
  const [orderStatusForGuest,setOrderStatusForGuest] = useState(chatData.orderStatusForGuest)

  let buttonText1 = "a"
  let buttonText2 = "a"
  let title = "a"
  
  const listPressed = () =>{
    Alert.alert('navi to stay detail page of host')
  }

  const button1Pressed = () =>{
    if(orderStatusForGuest==='received'){
      setOrderStatusForGuest('interested')
      chatData.orderStatusForGuest='interested'
    }else if (orderStatusForGuest==='interested'){
      chatData.orderStatusForGuest='accepted'
      setOrderStatusForGuest('accepted')
    }

    
  }

  const button2Pressed = () =>{
    chatData.orderStatusForGuest='rejected'
    setOrderStatusForGuest('rejected')
  }
  
  const RequestStatusForGuest = () =>{
    
    let temp
    let btn1
    let btn2

    if(chatData.guestName!==chatData.userName){
      return null
    }

    if(orderStatusForGuest==='unreceived'){
      return null
    }

    switch (orderStatusForGuest) {
      case "received":
        buttonText1 = 'Interested'
        buttonText2 = 'Reject'

        title = `New request from ${chatData.hostName}`
        temp = 

        <View style={{flexDirection:'column',alignItems:'center'}}>
          <Text style={{marginVertical:2}}>{title}</Text>
    
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
              onPress={button1Pressed}>
              <MaterialIcons  name='check-box' size={18} color='green' />
              <Text style={{color:'green',marginLeft:2}}>{buttonText1}</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
              onPress={button2Pressed}>
              <MaterialIcons  name='cancel' size={18} color='red' />
              <Text style={{color:'red',marginLeft:2}}>{buttonText2}</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        break;

      case 'interested':
        buttonText1 = 'Accept'
        buttonText2 = 'Reject'
        title = `Request from ${chatData.hostName}`
        temp = 

        <View style={{flexDirection:'column',alignItems:'center'}}>
          <Text style={{marginVertical:2}}>{title}</Text>
    
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
              onPress={button1Pressed}>
              <MaterialIcons  name='check-box' size={18} color='green' />
              <Text style={{color:'green',marginLeft:2}}>{buttonText1}</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
              onPress={button2Pressed}>
              <MaterialIcons  name='cancel' size={18} color='red' />
              <Text style={{color:'red',marginLeft:2}}>{buttonText2}</Text>
            </TouchableOpacity>
          </View>
        </View>
      
        break;

      case 'accepted':
        buttonText1 = 'Accepted'
        buttonText2 = null
        title = `Request from ${chatData.hostName}`
        temp = 

        <View style={{flexDirection:'column',alignItems:'center'}}>
          <Text style={{marginVertical:2}}>{title}</Text>
    
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
              onPress={button1Pressed}>
              <MaterialIcons  name='check-box' size={18} color='green' />
              <Text style={{color:'green',marginLeft:2}}>{buttonText1}</Text>
            </TouchableOpacity>
    

          </View>
        </View>
    
        break;

      case 'rejected':
        buttonText1 = null
        buttonText2 = 'Rejected'
        title = `Request from ${chatData.hostName}`
        temp = 

        <View style={{flexDirection:'column',alignItems:'center'}}>
          <Text style={{marginVertical:2}}>{title}</Text>
    
          <View style={{flexDirection:'row'}}>

    
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
              onPress={button2Pressed}>
              <MaterialIcons  name='cancel' size={18} color='red' />
              <Text style={{color:'red',marginLeft:2}}>{buttonText2}</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        break;

      default:
        break;
    }

    return temp

    ;
  }


    return (
      
      <Pressable 
        style={styles.mainContainer}
      >
      {/* mainContainer */}

      <Image source={{uri:image}} style={styles.image}/>

      <View style={styles.column}>
        <Text 
          style={styles.title} 
          numberOfLines={1}
          onPress={listPressed}>
          {stayTitle}
        </Text>

        <View style={{flexDirection:'row'}}>
          <Text>{exchangeStatus}</Text>
          <Text style={{marginHorizontal:5}}>·</Text>
          <Text>{exchangePeriod}</Text>
        </View>


        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <Pressable 
            style={styles.listingContainer}
            onPress={listPressed}>
              <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/>
              <Text style={{marginLeft:5}}>Listing</Text>
          </Pressable>

          {/* if user is a guest, has received a request from the host, 
          there will be an option on the top right corner */}
          <RequestStatusForGuest />
          

        </View>

      </View>




       

    </Pressable>
        
       
    );
  };
  
 
  
  export default StayInfoInMessageComponent;
