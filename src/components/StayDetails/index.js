import {Image, Pressable, Text, View,Alert,Modal,TouchableOpacity,ScrollView  } from 'react-native';

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
import DateRangePicker from '../DateRangPicker/index.js';


const StayDetailsComponent = (props) => {
  const [checkInDate,setCheckInDate] = useState(new Date())
  const [checkOutDate,setCheckOutDate] = useState(new Date())
  const [totalNights,setTotalNights] = useState(0)
  const [descriptionFolded,setDescriptionFolded] = useState(true)
  const [ruleFolded,setRuleFolded] = useState(true)

  const dummyDataForWantToGo = 'I would like to exchange with someone in Valencia, Spain.'
  const dummyDataForMaxNights = 6
  const dummyDataUserRating = 4.75
  const dummyDataSuperHostBar = 4.5
  const dummyDataHostName = 'John'

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

  const onReservePressed = () =>{
    if(totalNights>=1){
      if(dummyDataForMaxNights>=totalNights){
        navi.navigate('RequestStayScreen',
        {id:stays.id,checkInDate:checkInDate,
          checkOutDate:checkOutDate,totalNights:totalNights})
      }else{
        Alert.alert('max nights exceeded')
      }
    }
    else{
      Alert.alert('ERROR','Stay at least for 1 night to continue')
    }
  }
  const onHostPressed = () =>{
    Alert.alert('navigate to host profile')
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

  //if rating is better than 4.5, he is a super host
  const ReturnHostReviews = (propsR) =>{
    const rating= propsR.rating
    const bar = propsR.bar

    let result
    if(rating>=bar){
      result = 
        <View style={{flexDirection:'row',paddingTop:5}}>
          <MaterialIcons name='star-rate' size={20} color={'#030f14'} style={{paddingLeft:10}}/>
          <Text style={styles.stayDetailsSubTitle}>{dummyDataUserRating.toFixed(2)} </Text>
          <Fontisto name="check" size={12} color={'#030f14'} style={{paddingLeft:20,paddingTop:5}} />
          <Text style={styles.stayDetailsSubTitle}>Superhost </Text>
        </View>
    }else{
      result =  
        <View style={{flexDirection:'row',paddingTop:5}}>
          <MaterialIcons name='star-rate' size={20} color={'#030f14'} style={{paddingLeft:10}}/>
          <Text style={styles.stayDetailsSubTitle}>{dummyDataUserRating.toFixed(2)} </Text>
        </View>
    }
    return result
  }

    return (
      <View style={{flexDirection:'column'}}>
        <ScrollView style = {styles.container}>

          {/* image */}
          <Image style={styles.Image}source={{uri: stays.image}}/>
          {/* title */}
          <Text style={styles.stayDetailsTitle}>{stays.title}</Text>
          {/* location */}
          <Text style={styles.stayDetailsSubTitle}>{stays.location}</Text>
          <Divider/>

          {/* host info area*/}
          <Pressable onPress={onHostPressed}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}> 
              <View>
                {/* limits, type*/}
                <Text style={styles.stayDetailsHostTitle}>Hosted by {dummyDataHostName}</Text>
                <ReturnHostReviews rating={dummyDataUserRating} bar={dummyDataSuperHostBar}/>
              </View>
                <View>
                  <Image style={styles.hostImage}source={{uri: stays.image}}/>
                </View>
            </View>
          </Pressable>
          <Divider/>

          {/*Sleeping Arrangements*/}
          <Pressable >
          <View style={styles.titleContainer}>
            <Text style={styles.stayDetailsTitle}>Sleeping Arrangements</Text>
          </View>
          <View style={styles.sleepContainer}>
            {/* type */}
            <View style={{flexDirection:'row'}}>
            <MaterialIcons name='local-hotel' size={20} color={'#030f14'} style={{paddingLeft:5}}/>
            <Text style={styles.stayDetailsSubTitle}> {stays.type}  </Text>
            
          </View>
          {/* guest */}
          <View style={{flexDirection:'row'}}>
            <Fontisto name="person" size={18} color={'#030f14'} style={{paddingLeft:20}} />
            <Text style={styles.stayDetailsSubTitle}>{stays.maxGuest} guests</Text>
           
          </View>
          {/* nights */}
          <View style={{flexDirection:'row'}}>
            <Fontisto name="night-clear" size={15} color={'#030f14'} style={{paddingLeft:30,paddingTop:4}}/>
            <Text style={styles.stayDetailsSubTitle}>{stays.maxNights} nights</Text>
          </View>      
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

        </ScrollView>

        {/* reserve area*/}
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',alignItems:'center',marginLeft:20,height:70}}>
          {/* date picker area */}
          <View style={styles.datePickerContainer}>
            <DatePickerComponent style = {styles.datePickerComponent} setCDate={setCheckInDate} setCNights={calculateInNights} />
            <Text>-</Text>
            <DatePickerCheckOutComponent style = {styles.datePickerComponent} setCDate={setCheckOutDate} setCNights={calculateOutNights}/>
          </View>

          {/* reserve button area */}
          <Pressable style={styles.customBTN} onPress={onReservePressed}>
            <Text style={styles.textBTN}>Exchange Request</Text>
          </Pressable>
        </View>
      </View>   
    );
  };
  
 
  
  export default StayDetailsComponent;
