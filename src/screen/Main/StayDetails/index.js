import {AccommodationsDB, cUserDB, profilesDB, usersDB} from '../../../data/firRef';
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

  const {listingUID} = route.params;


  console.log( " ID First=> ", listingID);

  console.log( " UID First=> ", listingUID);

  const [accomodation,setAccomodation] = useState([]);

  const [personalData,setPersonalData] = useState([])

  const [profileData,setProfileData] = useState([])


  useEffect(() => {
    //Runs on every render

    // test();
   
     
  });


  useEffect(() => {
    //Runs only on the first render

    const getListingID = listingID;

    const getUserID = listingUID;

   
  

     loadData(getListingID, getUserID)
     
     .then(() => {

      console.log( " Profiles in use effect=> ", profileData);
     });

 
     
   
  }, []);

  loadData = async(getListingID, getUserID) => {

    const listingData = await AccommodationsDB.doc(getListingID).get()
    .then((querySnapshot) => {

      setAccomodation(querySnapshot.data())

      // const listings = []
      // querySnapshot.forEach((doc) => {
      //     // doc.data() is never undefined for query doc snapshots
      //     console.log(doc.id, " => ", doc.data());

      //     listings.push(doc.data());
          

      // });
    

    // setAccomodation(listings);



     
  });


  const userData = await usersDB.doc(getUserID).get()
  .then((querySnapshot) => {

    setPersonalData(querySnapshot.data())

});

  const userProfileData = await profilesDB.doc(getUserID).get()
  .then((querySnapshot) => {

    setProfileData(querySnapshot.data())
   
});

console.log( " Accomodation First=> ", accomodation);
console.log( " User ID First=> ", personalData);
console.log( " Profile First=> ", profileData);




   }


  return (
    <View >
     <StayDetailsComponent profileDatas={profileData} personalDatas={personalData} stays={accomodation}/>
    </View>
  );
};



export default StayDetailsScreen;