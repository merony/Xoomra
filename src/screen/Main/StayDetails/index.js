import {AccommodationsDB, cUserDB, usersDB} from '../../../data/firRef';
import {
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
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import StayDetailsComponent from '../../../components/StayDetails';
import { TextInput } from 'react-native-gesture-handler';
import places from '../../../data/stayFeed'
import styles from './styles';
import { useRoute } from '@react-navigation/native';

const StayDetailsScreen = ({navigation, props, route}) => {
  //get place id from stay screen, find the stay from places and sent it to component
  // const route = useRoute()
  // const stays = places.find(place => place.id === route.params.id)
  const {listingID} = route.params;


  console.log( " ID First=> ", listingID);

  const [accomodation,setAccomodation] = useState([]);


  useEffect(() => {
    //Runs on every render

    // test();
   
     
  });


  useEffect(() => {
    //Runs only on the first render

    const getListingID = listingID;

    console.log( " Lisitng ID First=> ", listingID);

    //  loadData(getListingID);
     
   
  }, []);

  loadData = async(ID) => {

    const listingData =  AccommodationsDB.doc(ID).get().data
    .then((querySnapshot) => {

      setAccomodation(querySnapshot.data())

      // const listings = []
      // querySnapshot.forEach((doc) => {
      //     // doc.data() is never undefined for query doc snapshots
      //     console.log(doc.id, " => ", doc.data());

      //     listings.push(doc.data());
          

      // });
    

    // setAccomodation(listings);

      console.log( " Data Details=> ", accomodation);

      console.log( " Lisitng ID=> ", getListingID);
  });




  console.log( " Data=> ", listingData);

  
  // Alert.alert(accomodations);
  }

  return (
    <View >
     {/* <StayDetailsComponent stays={accomodation}/> */}
    </View>
  );
};



export default StayDetailsScreen;