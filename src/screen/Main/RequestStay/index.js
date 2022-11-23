import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from '../../../components/Divider/index';
import DividerWide from '../../../components/DividerWide';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LongTextComponent from '../../../components/longText/index'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import places from '../../../data/stayFeed';
import styles from './styles';
import { useRoute } from '@react-navigation/native';

const RequestStayScreen = ({navigation, props, route}) => {

const [selfIntroduction,setSelfIntroduction] = useState('')
const [adults,setAdult] = useState(0)
const [children,setChildren] = useState(0)
const [pets,setPets] = useState(0)



//get id, check in and out date 

// const stays = places.find(place => place.id === route.params.id)

const {stays , checkInDate , checkOutDate , totalNights} = route.params
console.log('previos screen data => ', stays)


const [descriptionFolded,setDescriptionFolded] = useState(true)
const onDescriptionPressed = () =>{
  if(descriptionFolded) {
    setDescriptionFolded(false)
  }else{
    setDescriptionFolded(true)
  }
}

const onReservePressed = () =>{
  Alert.alert('Your request has been sent to host!')
}


  return (

    <View > 


<Text style={styles.headerTitle}>Accomodation Details</Text>
   

    <ScrollView style={{flexDirection: "column",margin:20}}>
    
     

     <View style={{flexDirection:'row',paddingLeft:10}}>
        <Image style={styles.hostImage}source={{uri: stays?.images?.[0]}}/>

        <View>
        <Text style={styles.title} numberOfLines={5}>{stays.StayTitle}</Text>
        <Text style={styles.stayDetailsSubTitle}>{stays.AccommodationType}</Text>
        <Text style={styles.stayDetailsSubTitle}>{stays.City}</Text>
        

        </View>
     </View>

     {/* <DividerWide/> */}
     <Divider/>
     <Text style={styles.stayDetailsTitle}>Your Trip</Text>

     {/* <Text style={styles.requestSubtitle}>Dates</Text> */}
     <View style={{flexDirection:'row'}}>
        <Text style={styles.stayTtile}>{route.params.checkInDate.getFullYear()}-{route.params.checkInDate.getMonth()+1}-{route.params.checkInDate.getDate()}</Text>
        <Text style={styles.stayTtile}> - </Text>
        <Text style={styles.stayTtile}>{route.params.checkOutDate.getFullYear()}-{route.params.checkOutDate.getMonth()+1}-{route.params.checkOutDate.getDate()}</Text>
        
     </View>
     {/* <Text style={styles.stayTtile}>Nights: {route.params.totalNights}</Text> */}

     {/* <Text style={styles.requestSubtitle}>Guests</Text> */}



     {/* <DividerWide/> */}
     <Divider/>
     
     {/* <Text style={styles.stayTtile}>{stays.location}</Text> */}


    


     <View style={{width:'98%',paddingLeft:'2%'}}>
      <TextInput placeholder='Tell the host more about yourself and your trip?' style = {styles.formInput} multiline ={true}
      value={selfIntroduction} onChangeText={setSelfIntroduction}/>
     </View>
     {/* <DividerWide/> */}
     <Divider/>

     <Text style={styles.stayDetailsTitle}>How This Works</Text>

     <Text style={styles.empty}></Text>
     
     <Text style={styles.stayDetailsSubTitle} numberOfLines={3}>You will be able to confirm an exchange when host accepts your request.</Text>
     {/* <Text style={styles.stayDetailsSubTitle}>2. Host accepts request</Text>
     <Text style={styles.stayDetailsSubTitle}>3. Guest confirms request</Text> */}

     <Divider/>
   

     {/* <Text style={styles.stayTtile}>cancellation policy</Text>
     <Pressable onPress={onDescriptionPressed} style={{margin:10}}>
     <LongTextComponent  data = {[stays,descriptionFolded]} />
     </Pressable> */}

     <TouchableOpacity  onPress={() => Alert.alert('policy link')}>
              
              <Text style={{color:'#0999f4', fontWeight: '500',textAlign:'center'}}> Cancellation Policy</Text>
     </TouchableOpacity>
     <Text style={styles.empty}></Text>

     <Pressable style={styles.customBTN} onPress={onReservePressed}>
          <Text  style={styles.textBTN}>SEND REQUEST</Text>
    </Pressable>

   

  </ScrollView>

  </View>
      
     
  );
};



export default RequestStayScreen;