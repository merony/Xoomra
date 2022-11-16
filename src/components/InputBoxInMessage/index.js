import {
  Alert,
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,
    Button
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
import DatePickerComponent from '../DatePicker/indexCheckOut';
import DatePickerCheckOutComponent from '../DatePicker/indexCheckOut';

const InputBoxInMessage = (props) => {

  // 1.receive data from response message screen
  // 2.if user is a host, receives a request, and has not responded to the request, return option only
  // 3.if user rejects the request, return reject status only
  // 4.if user has responded to request, return option/status above input(when interested or accept), or reject status only
  const chatData=props.cData
  let tempReturn 

  const sendMSG = () => {
    Alert.alert("message to send",inputText)
  }

  //dates
  const [checkInDate,setCheckInDate] = useState(new Date())
  const [checkOutDate,setCheckOutDate] = useState(new Date())
  const [totalNights,setTotalNights] = useState(0)

  const [inputText,setInputText] = useState('')
  const [orderStatusForHost,setOrderStatusForHost] = useState(chatData.orderStatusForHost)

  let buttonText1 = "Interested"
  let buttonText2 = "Reject"
  let title = `Listed by ${chatData.guestName}`
  //when send request to guest, need to check nights
  const calculateInNights = (inDate) =>{
    let diff = checkOutDate.getTime() - inDate.getTime()
    let nights = Math.floor(diff / (1000*60*60*24))
    if(nights <= 0){
      nights = 0
    }
    setTotalNights(nights)
  }
  const calculateOutNights = (outDate) =>{
    let diff = outDate.getTime() - checkInDate.getTime()
    let nights = Math.floor(diff / (1000*60*60*24))
    if(nights < 0){
      nights = 0
    }
    
    setTotalNights(nights)
    
  }
  const checkNightsValidity = () =>{
    if(totalNights>0){
      return true
    }
    return false
  }

  const button1Pressed = () =>{
    if(orderStatusForHost==='received'){
      setOrderStatusForHost('interested')
      chatData.orderStatusForHost='interested'
    }else if (orderStatusForHost==='interested'){
      chatData.orderStatusForHost='accepted'
      setOrderStatusForHost('accepted')
    }
  }
  const button2Pressed = () =>{
    chatData.orderStatusForHost='rejected'
    setOrderStatusForHost('rejected')
  }

  const dummyDataGuestLinkTitle = 'Typical canarian house'
  



  const Target = () =>{
  
    if(chatData.hostName!==chatData.userName){
      tempReturn=<View></View>
      return tempReturn
    }

    switch (orderStatusForHost) {
      case 'received':
        buttonText1='Interested'
        buttonText2='Reject'
        title=`Interested in ${chatData.guestName}'s listing?`
        tempReturn =      
        <View>
          <View>
          {/* option/status:(datepicker,title of guest's listing,two buttons) */}
          <View style={{flexDirection:'row'}}>
            {/* datepicker */}
            <View style={styles.datePickerContainer}>
                <DatePickerComponent style = {styles.datePickerComponent} setCDate={setCheckInDate} setCNights={calculateInNights}/>
                <Text>-</Text>
                <DatePickerCheckOutComponent style = {styles.datePickerComponent} setCDate={setCheckOutDate} setCNights={calculateOutNights}/>
            </View>

            <View style={{flexDirection:'column',width:220,margin:5}}>
              {/* title container */}
              <View style={{alignSelf:'center'}}>
                <Text >{dummyDataGuestLinkTitle}</Text>
                <Text style={{marginVertical:2,fontSize:14,textAlign:'center'}}>{title}</Text>
              </View>

              {/* button container */}
              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
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
          </View> 
          </View>
          { /* //input  */}
          {/* <View style={styles.inputContainer}>
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
          </View> */}
        </View>
        return tempReturn
        break;
      case 'interested':
        buttonText1='Accept'
        buttonText2='Reject'
        title=`Interested in ${chatData.guestName}'s listing?`
        tempReturn =      
        <View>
          <View>
            {/* option */}
            <View style={{flexDirection:'row',justifyContent:'center'}}>

              <TouchableOpacity >
                <Text numberOfLines={1} style={{width:250}}>
                  {dummyDataGuestLinkTitle} by {chatData.guestName}
                </Text>

              </TouchableOpacity>

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

            { /* //input  */}
            <View style={styles.inputContainerBeneathOption}>
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

          </View>
        </View>
        return tempReturn
        break;
      case 'accepted':
        buttonText1='Accepted'
        buttonText2='Reject'
        title=`Interested in ${chatData.guestName}'s listing?`
        tempReturn =      
        <View>
          <View>
            {/* option */}
            <View style={{flexDirection:'row',justifyContent:'center'}}>

              <TouchableOpacity >
                <Text numberOfLines={1} style={{width:250}}>
                  {dummyDataGuestLinkTitle} by {chatData.guestName}
                </Text>

              </TouchableOpacity>

              <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
                onPress={button1Pressed}>
                <MaterialIcons  name='check-box' size={18} color='green' />
                <Text style={{color:'green',marginLeft:2}}>{buttonText1}</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
                onPress={button2Pressed}>
                <MaterialIcons  name='cancel' size={18} color='red' />
                <Text style={{color:'red',marginLeft:2}}>{buttonText2}</Text>
              </TouchableOpacity> */}
              
            </View>

            { /* //input  */}
            <View style={styles.inputContainerBeneathOption}>
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

          </View>
        </View>
        return tempReturn
        break;
      case 'rejected':
        buttonText1='Accepted'
        buttonText2='Rejected'
        title=`Interested in ${chatData.guestName}'s listing?`
        tempReturn =      
        <View>
            {/* option */}
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
              <TouchableOpacity >
                <Text numberOfLines={1} style={{width:250}}>
                  {dummyDataGuestLinkTitle} by {chatData.guestName}
                </Text>

              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
                onPress={button2Pressed}>
                <MaterialIcons  name='cancel' size={18} color='red' />
                <Text style={{color:'red',marginLeft:2}}>{buttonText2}</Text>
              </TouchableOpacity>         
            </View>
        </View>
        return tempReturn
        break;
      default:
        break;
    }

  }

    return <Target/>
  };
  
 
  
  export default InputBoxInMessage;
