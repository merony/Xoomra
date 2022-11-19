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
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'
import styles from './styles';
import { usersDB } from '../../../../data/firRef';

const ViewPersonalInformationScreen = ({navigation, props}) => {
  
const [profilePhoto,setProfilePhoto] = useState(null)
const [firstName,setFirstName] = useState('')
const [lastName,setLastName] = useState('')
const [email,setEmail] = useState('')
const [gender,setGender] = useState('')
const [dob,setDob] = useState('')
const [address,setAddress] = useState('')
const [mobileNumber,setMobileNumber] = useState('')
const [emergencyContactEmail,setEmergencyContactEmail] = useState('')
const [emergencyContactNumber,setEmergencyContactNumber] = useState('')



useEffect(() => {
  //Runs on every render
  getUserInfo()
  // test();
  //  console.log(auth().currentUser.uid)
});


const getUserInfo = async () =>{

  const userPersonalInformation =  (await usersDB.doc(auth().currentUser.uid).get()).data()
  // console.log(profilesCollection)
  setFirstName(userPersonalInformation.firstName)
  setLastName(userPersonalInformation.lastName)
  setEmail(userPersonalInformation.email)
  setGender(userPersonalInformation.gender)
  setDob(userPersonalInformation.DOB)
  setAddress(userPersonalInformation.Address)
  setMobileNumber(userPersonalInformation.mobile)
  setEmergencyContactEmail(userPersonalInformation.emergencyEmail)
  setEmergencyContactNumber(userPersonalInformation.emergencyMobile)

}




  return (

    <View style={{flexDirection: "column", margin: 20}}>
      <ScrollView>
      <Text style={styles.headerTitle}>Personal Information</Text>

      {/* Photo */}
      <View style={{flexDirection:"column",margin:10,marginVertical:3}}>
        
        <Image 
                    source={require('../../../../Image/rony-photo.jpg')}  
                    style={{width: 100, height: 100, borderRadius: 400/ 2}} />

      </View>
     
     {/* first name */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoDesc}>First name</Text>
        <Text style={styles.infoValue}> {firstName} </Text>
      </View>

      {/* Last name */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoDesc}>Last name</Text>
        <Text style={styles.infoValue}>{lastName}</Text>
      </View>

      {/* Gender */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoDesc}>Gender</Text>
        <Text style={styles.infoValue}>{gender}</Text>

      </View>

      {/* DOB */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoDesc}>Date Of Birth</Text>
        {/* <Text style={styles.infoValue}>{dob.substring(15,26)}</Text> */}
      </View>

      {/* Address */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoDesc}>Address</Text>
        <Text style={styles.infoValue}>{address}</Text>
      </View>

      {/* Mobile Number */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoDesc}>Mobile Number</Text>
        <Text style={styles.infoValue}>{mobileNumber}</Text>
      </View>

      {/* Emergency contact Name and Number */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoDesc}>Emergency contact Email and Number</Text>
        <Text style={styles.infoValue}>{emergencyContactEmail}</Text>
        <Text style={styles.infoValue}>{emergencyContactNumber}</Text>

      </View>

     

      </ScrollView>
  </View>
      
     
  );
};



export default ViewPersonalInformationScreen;

