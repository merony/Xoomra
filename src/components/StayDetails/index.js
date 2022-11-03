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
import MaxNightsWarning from '../MaxNightsWarning/index.js';
import { ScrollView } from 'react-native-gesture-handler';


const StayDetailsComponent = (props) => {

  // const [totalPrice,setTotalPrice] = useState(0)
  const [checkInDate,setCheckInDate] = useState(new Date())
  const [checkOutDate,setCheckOutDate] = useState(new Date())
  const [totalNights,setTotalNights] = useState(0)
  const [descriptionFolded,setDescriptionFolded] = useState(true)
  const [policyFolded,setPolicyFolded] = useState(true)
  const [ruleFolded,setRuleFolded] = useState(true)

  const dummyDataForWantToGo = 'I would like to exchange with someone in Valencia, Spain.'
  const dummyDataForMaxNights = 6

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

      if(dummyDataForMaxNights>=totalNights){
        navi.navigate('RequestStayScreen',
        {id:stays.id,checkInDate:checkInDate,
          checkOutDate:checkOutDate,totalNights:totalNights})
      }

    }
    else{
      Alert.alert('ERROR','Stay at least for 1 night to continue')
    }
  }
  const onHostPressed = () =>{
    Alert.alert('navigate to host profile')
      // navi.navigate('HostProfileScreen',
      // {hostName:'HostNameFromStayDetails'})
  }


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


  
    return (
        <ScrollView style = {styles.container}>

          {/* image */}
          <Image style={styles.Image}source={{uri: stays.image}}/>

          {/* title */}
          <Text style={styles.stayDetailsTitle}>{stays.title}</Text>

          {/* location */}
          <Text style={styles.stayDetailsSubTitle}>{stays.location}</Text>

          <Divider/>

          {/* host info */}
          {/* hard code data for now */}
          <Pressable onPress={onHostPressed}>

          <View style={{flexDirection:'row',justifyContent:'space-between'}}>

            <View>

          {/* limits, type*/}
          <Text style={styles.stayDetailsHostTitle}>Hosted by John</Text>
          {/* <Text style={styles.stayDetailsSubTitle}>{stays.maxGuest} Guests · {stays.type} · {stays.maxNights} Nights  </Text> */}
              
            </View>

            <View>
            <Image style={styles.hostImage}source={{uri: stays.image}}/>
            </View>

          </View>
          </Pressable>

          <Divider/>

          {/*accommodation type, max guest and nights*/}
          <Pressable >
          <View style={styles.titleContainer}>
            {/* <Fontisto name="list-2" size={18} color={'#030f14'} style={{paddingTop:5}} /> */}
            <Text style={styles.stayDetailsTitle}>Sleeping Arrangements</Text>
          </View>


            {/* type */}
            <View style={{flexDirection:'row',paddingLeft:15,paddingTop:15}}>
            <MaterialIcons name='local-hotel' size={25} color={'#030f14'} style={{paddingLeft:5}}/>
            <Text style={styles.stayDetailsSubTitle}> {stays.type}  </Text>
            
          </View>

          {/* guest */}
          <View style={{flexDirection:'row',paddingLeft:15,paddingTop:15}}>
            <Fontisto name="person" size={20} color={'#030f14'} style={{paddingLeft:8,paddingRight:8}} />
            <Text style={styles.stayDetailsSubTitle}>{stays.maxGuest} guests</Text>
           
          </View>


          {/* nights */}
          <View style={{flexDirection:'row',paddingLeft:15,paddingTop:20}}>
            <Fontisto name="night-clear" size={20} color={'#030f14'} style={{paddingLeft:8,paddingRight:5}}/>
            <Text style={styles.stayDetailsSubTitle}>{stays.maxNights} nights</Text>

          </View>

          </Pressable>
          <Divider/>

          {/* Want to go */}
          <Pressable >
          <View style={styles.titleContainer}>
            {/* <Fontisto name="list-2" size={18} color={'#030f14'} style={{paddingTop:5}} /> */}
            <Text style={styles.stayDetailsTitle}>Want To Go</Text>
          </View>

            <LongTextComponent data = {[{description:dummyDataForWantToGo},false]}/>
          </Pressable>
          <Divider/>

          {/* description */}
          <Pressable onPress={onDescriptionPressed}>
          <View style={styles.titleContainer}>
            {/* <Fontisto name="list-2" size={18} color={'#030f14'} style={{paddingTop:5}} /> */}
            <Text style={styles.stayDetailsTitle}>Accommodation Details</Text>
          </View>

            <LongTextComponent data = {[stays,descriptionFolded]}/>
          </Pressable>
          <Divider/>



          {/* house rules */}
          {/* hard code data for now */}
          <Pressable onPress={onRulePressed}>
          <View style={styles.titleContainer}>
            {/* <Fontisto name="shield" size={25} color={'#030f14'} style={{paddingTop:5}}/> */}
            <Text style={styles.stayDetailsTitle}>House Rules</Text>
          </View>

            <LongTextComponent data = {[stays,ruleFolded]}/>
          </Pressable>
          <Divider/>

          {/* cancellation policy */}
          {/* hard code data for now */}
          {/* <Pressable onPress={onPolicyPressed}> */}
          {/* <View style={styles.titleContainer}> */}
            {/* <Fontisto name="hotel-alt" size={25} color={'#030f14'} /> */}
            {/* <Text style={styles.stayDetailsTitle}>Cancellation Policy</Text>   */}
          {/* </View> */}

          {/* <LongTextComponent data = {[stays,policyFolded]}/>
          </Pressable>
          <Divider/> */}

          {/* availability area with date picker*/}

          <View style={styles.reserveArea}>

            {/* <Text style={styles.totalPrice}>${totalPrice}</Text> */}

            {/* <Text style={styles.totalNights}>Exchange for {totalNights} Nights</Text> */}
            <MaxNightsWarning data={[dummyDataForMaxNights,totalNights]}/>

          </View>
          <View style={{flex:1}}>


          {/* reserve button */}
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',marginLeft:20,}}>
            <View style={styles.datePickerContainer}>
              <DatePickerComponent style = {styles.datePickerComponent} setCDate={setCheckInDate} setCNights={calculateInNights} />
              <Text>-</Text>
              <DatePickerCheckOutComponent style = {styles.datePickerComponent} setCDate={setCheckOutDate} setCNights={calculateOutNights}/>
            </View>

            <Pressable style={styles.customBTN} onPress={onReservePressed}>
              <Text style={styles.textBTN}>Exchange Request</Text>
            </Pressable>

          </View>

          </View>




        </ScrollView>
        
    );
  };
  
 
  
  export default StayDetailsComponent;
