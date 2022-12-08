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
import ManageListingItem from '../../../../components/ManageListingItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import places from '../../../../data/stayFeed';
import styles from './styles';

const ManageListingScreen = ({navigation, props}) => {
    
const stays = places
 
//if user has a listing returned from database,  listingFromDatabase = it
//if not,  listingFromDatabase = null
 
const listingFromDatabase = {
  AccommodationDetails:'hello',
  AccommodationType:'private',
  Address:'21',
  Availability:{
    availabilityEnd:'2022-12-1',
    availabilityStart:'2099-12-1',
  },
  City:'toronto',
  Country:'Canada',
  HouseRules:'rules!',
  State:'Ontario',
  // Status:'published',
  StayTitle:'Linda Place',
  WantToGo:{
    City:'whatever city',
    Country:'Canada',
    State:'New-Brunswick',
  },
  docID:'23123d1212e',
  images:['image1','image2'],
  maxAvailableDays:2,
  maxGuest:3,
  uid:'dsjhdauihiu12i12'
}
// const listingsFromDatabse = [dummyDataListingFromDatabase]
 
// const listingFromDatabase = null 
let listingToRender
let dummyDatalistingsstatus
if(listingFromDatabase===null){
  listingToRender = null
  dummyDatalistings = null
}else{
  listingToRender = {
    id: listingFromDatabase.uid,
    image: listingFromDatabase.images[0],
    type: listingFromDatabase.AccommodationType,
    title: listingFromDatabase.StayTitle,
    description: listingFromDatabase.AccommodationDetails,
    location: listingFromDatabase.City,
    destination: listingFromDatabase.WantToGo.City,
    maxGuest: listingFromDatabase.maxGuest,
    maxNights: listingFromDatabase.maxAvailableDays,
    rules: listingFromDatabase.HouseRules,
  
    // isPublished:listingFromDatabase.Status
  }
  
  dummyDatalistings = [
    {
      stay:listingToRender,
      // isPublished:listingToRender.isPublished,
    },
 
  ]
}
 
const [selectedSubject, setSelectedSubject] = useState('');
const addNewListingPressed = () =>{
  if(listingToRender===null){
    navigation.navigate("Add Listing")
  }else{
    Alert.alert('ERROR','You already have a listing!')
  }
}
 
    return (
 
      <View style={{flexDirection: "column", margin: 20}}>
 
   <View style={{flexDirection: "row", justifyContent: 'flex-end'}}>
 
<TouchableOpacity title="X"  onPress = { addNewListingPressed} >
                            <Text style = {{fontWeight: '500', fontSize: 14, color: "#030f14", textDecorationLine: 'underline'}}>Add New Listing</Text>
                        </TouchableOpacity>
                        </View>
 
                         {/* flatlistContainer */}
        <View style={styles.flatlistContainer}>
 
<FlatList
  data={dummyDatalistings}
  renderItem={({item}) => <ManageListingItem listing={item} />}
 />
 
</View>
 
        </View>
 
    
  );
   };
  
 
  
  export default ManageListingScreen;