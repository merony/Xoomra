import {Image, Pressable, Text, View,Alert} from 'react-native';

import React from 'react';
import styles from './styles.js';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LongTextComponent from '../longText/index.js';
import Divider from '../Divider/index.js';
import DatePicker from 'react-native-date-picker'
import DatePickerComponent from '../DatePicker/index.js';
import DatePickerCheckOutComponent from '../DatePicker/indexCheckOut.js';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RequestStayScreen from '../../screen/Main/RequestStay/index';


const StayDetailsComponent = (props) => {

  const [totalPrice,setTotalPrice] = useState(0)
  const [checkInDate,setCheckInDate] = useState(new Date())
  const [checkOutDate,setCheckOutDate] = useState(new Date())
  const [totalNights,setTotalNights] = useState(0)
  const [descriptionFolded,setDescriptionFolded] = useState(true)
  const [policyFolded,setPolicyFolded] = useState(true)
  const [ruleFolded,setRuleFolded] = useState(true)

  const stays= props.stays;
  const data = [stays,descriptionFolded]

  const navi = useNavigation()

  const onDescriptionPressed = () =>{
    if(descriptionFolded) {
      setDescriptionFolded(false)
    }else{
      setDescriptionFolded(true)
    }
  }
  const onRulePressed = () =>{
    if(ruleFolded) {
      setRuleFolded(false)
    }else{
      setRuleFolded(true)
    }
  }
  const onPolicyPressed = () =>{
    if(policyFolded) {
      setPolicyFolded(false)
    }else{
      setPolicyFolded(true)
    }
  }
  const onReservePressed = () =>{
    if(totalNights>=1){
      navi.navigate('RequestStayScreen',
      {id:stays.id,totalPrice:totalPrice,checkInDate:checkInDate,
        checkOutDate:checkOutDate,totalNights:totalNights})
    }
    else{
      Alert.alert('ERROR','Stay at least for 1 night to continue')
    }
  }


  const calculateInNights = (inDate) =>{
    let diff = checkOutDate.getTime() - inDate.getTime()
    let nights = Math.floor(diff / (1000*60*60*24))
    if(nights <= 0){
      nights = 0
    }
    setTotalNights(nights)
    let price = nights*stays.price*1.13
    setTotalPrice(price.toFixed(2))
  }

  const calculateOutNights = (outDate) =>{
    let diff = outDate.getTime() - checkInDate.getTime()
    let nights = Math.floor(diff / (1000*60*60*24))
    if(nights < 0){
      nights = 0
    }
    
    setTotalNights(nights)
    let price = nights*stays.price*1.13
    setTotalPrice(price.toFixed(2))
    
  }


  
    return (
        <View style = {styles.container}>

          {/* image */}
          <Image style={styles.Image}source={{uri: stays.image}}/>
          <Divider/>

          {/* title */}
          <Text style={styles.stayTtile}>{stays.title}</Text>

          {/* location */}
          <Text style={styles.stayLocations}>{stays.location}</Text>

          {/* limits, type*/}
          <Text style={styles.stayTtile}>{stays.maxGuest} Guests | {stays.type} | {stays.maxNights} Nights  </Text>
          <Divider/>

          {/* description */}
          <Pressable onPress={onDescriptionPressed}>
          <View style={styles.titleContainer}>
            <Fontisto name="list-2" size={20} color={'#030f14'} style={{paddingTop:5}} />
            <Text style={styles.stayTtile}>Details of Stay</Text>
          </View>

            <LongTextComponent data = {[stays,descriptionFolded]}/>
          </Pressable>
          <Divider/>


          


          {/* host info */}
          {/* hard code data for now */}
          <View >

          </View>

          {/* house rules */}
          {/* hard code data for now */}
          <Pressable onPress={onRulePressed}>
          <View style={styles.titleContainer}>
            <Fontisto name="shield" size={25} color={'#030f14'} style={{paddingTop:5}}/>
            <Text style={styles.stayTtile}>House Rules</Text>
          </View>

            <LongTextComponent data = {[stays,ruleFolded]}/>
          </Pressable>
          <Divider/>

          {/* cancellation policy */}
          {/* hard code data for now */}
          <Pressable onPress={onPolicyPressed}>
          <View style={styles.titleContainer}>
            <Fontisto name="hotel-alt" size={25} color={'#030f14'} />
            <Text style={styles.stayTtile}>Cancellation Policy</Text>  
          </View>

          <LongTextComponent data = {[stays,policyFolded]}/>
          </Pressable>
          <Divider/>

          {/* availability area with date picker and total price calculator */}
          <View style={styles.datePickerContainer}>

          <DatePickerComponent style = {styles.datePickerComponent} setCDate={setCheckInDate} setCNights={calculateInNights} />
          <DatePickerCheckOutComponent style = {styles.datePickerComponent} setCDate={setCheckOutDate} setCNights={calculateOutNights}/>
          </View>

          {/* total price and reserve button */}
          <View>
          <View style={styles.reserveArea}>

            <Text style={styles.totalPrice}>${totalPrice}</Text>

            <Text style={styles.totalNights}>{totalNights} Nights</Text>

          </View>

          

          <Pressable style={styles.customBTN} onPress={onReservePressed}>
            <Text>RESERVE</Text>
          </Pressable>

          </View>


        </View>
        
    );
  };
  
 
  
  export default StayDetailsComponent;
