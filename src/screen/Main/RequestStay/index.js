import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,ScrollView,Alert
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
import places from '../../../data/stayFeed';
import { useRoute } from '@react-navigation/native';
import Divider from '../../../components/Divider/index';
import LongTextComponent from '../../../components/longText/index'

const RequestStayScreen = ({navigation, props}) => {
  const [selfIntroduction,setSelfIntroduction] = useState('')
  

  //get id, check in and out date 
  const route = useRoute()
  const stays = places.find(place => place.id === route.params.id)
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

      <ScrollView style={{flexDirection: "column"}}>
      
       <Divider/>
       <Image style={styles.Image}source={{uri: stays.image}}/>
       <Divider/>
       <Text style={styles.stayTtile}>{stays.title}</Text>
       <Text style={styles.stayTtile}>{stays.type}</Text>
       <Text style={styles.stayTtile}>{stays.location}</Text>

       <Text style={styles.stayTtile}>Check-in: {route.params.checkInDate.getFullYear()}-{route.params.checkInDate.getMonth()+1}-{route.params.checkInDate.getDate()}</Text>
       <Text style={styles.stayTtile}>Check-out: {route.params.checkOutDate.getFullYear()}-{route.params.checkOutDate.getMonth()+1}-{route.params.checkOutDate.getDate()}</Text>
       <Text style={styles.stayTtile}>Nights: {route.params.totalNights}</Text>


       <View style={{width:'98%',paddingLeft:'2%'}}>
        <TextInput placeholder='Tell the host more about yourself and trip' style = {styles.formInput} multiline ={true}
        value={selfIntroduction} onChangeText={setSelfIntroduction}/>
       </View>
     

       <Text style={styles.stayTtile}>cancellation policy</Text>
       <Pressable onPress={onDescriptionPressed} style={{margin:10}}>
       <LongTextComponent  data = {[stays,descriptionFolded]} />
       </Pressable>

       <Pressable style={styles.customBTN} onPress={onReservePressed}>
            <Text>CONFIRM AND SEND REQUEST</Text>
      </Pressable>



    </ScrollView>
        
       
    );
  };
  
 
  
  export default RequestStayScreen;