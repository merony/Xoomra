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
import { Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { add } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth'
import styles from './styles';
import { usersDB } from '../../../../data/firRef';

const ViewPersonalInformationScreen = ({navigation, props}) => {

const [profilePhoto,setProfilePhoto] = useState(null)
const [firstName,setFirstName] = useState('')
const [lastName,setLastName] = useState('')
const [address,setAddress] = useState('')
const [mobileNumber,setMobileNumber] = useState('')
const [emergencyContactEmail,setEmergencyContactEmail] = useState('')
const [emergencyContactNumber,setEmergencyContactNumber] = useState('')
const [edit,setEdit] = useState(false)

 
  const savePressed = async() => {

    
    const profilesCollection = await usersDB.where(`mobile`,`==`,mobileNumber).get()
                                                // .doc(auth().currentUser.uid)
    
    if (firstName.length === 0  || lastName.length === 0 
      || address.length === 0 ||mobileNumber.length === 0){

      Alert.alert('',"Please fill all Information")
    }


    else{

    
      if (profilesCollection.docs.length === 0 || profilesCollection.docs[0].data().uid === auth().currentUser.uid ){
        console.log("ITS THE SAME USER can save it Or number doesnt exist")
           usersDB.doc(auth().currentUser.uid).update({
             
              firstName : firstName,
              lastName : lastName,
              Address : address,
              mobile : mobileNumber,
              emergencyMobile : emergencyContactEmail,
              emergencyEmail : emergencyContactNumber,
              })
              navigation.replace("UserNav")
      }
      else if (profilesCollection.docs[0].data().uid !== auth().currentUser.uid){
        Alert.alert('',"Mobile Number Already Exists")
      }

      

      }

    }
  


useEffect(() => {

  console.log(auth().currentUser.uid)
  getUserInfo()
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity title="X"  onPress = { () => setEdit(true)} >
          <Text style = {{fontWeight: '500', fontSize: 14, color: "#030f14", textDecorationLine: 'underline'}}>Edit</Text>
      </TouchableOpacity>
    )
  })

}, []);


const getUserInfo = async () =>{

  const userPersonalInformation =  (await usersDB.doc(auth().currentUser.uid).get()).data()
  // console.log(profilesCollection)
  setFirstName(userPersonalInformation.firstName)
  setLastName(userPersonalInformation.lastName)
  setAddress(userPersonalInformation.Address)
  setMobileNumber(userPersonalInformation.mobile)
  setEmergencyContactEmail(userPersonalInformation.emergencyEmail)
  setEmergencyContactNumber(userPersonalInformation.emergencyMobile)

}




  return (

    <View style={{flexDirection: "column", margin: 20}}>
      <ScrollView>
      <Text style={styles.headerTitle}>Personal Information</Text>

    <Text style = {{marginBottom:4,paddingBottom:4,marginTop:8}}>First Name</Text>
    <View style = {styles.formField}>
    <Ionicons style={{ paddingVertical: 4}} name='person' size={18} color='#283239' />
    <TextInput placeholder={firstName} style = {styles.formInput} 
      editable={edit} value={firstName} onChangeText={setFirstName}/>
    </View>

    <Text style = {{marginBottom:4,paddingBottom:4,marginTop:8}}>Last Name</Text>
    <View style = {styles.formField}>
    <Ionicons style={{ paddingVertical: 4}} name='person' size={18} color='#283239' />
    <TextInput placeholder={lastName} style = {styles.formInput}
     editable={edit} value={lastName} onChangeText={setLastName}/>
    </View>

    <Text style = {{marginBottom:4,paddingBottom:4,marginTop:8}}>Address</Text>
    <View style = {styles.formField}>
    <Ionicons style={{ paddingVertical: 4}} name='location-outline' size={18} color='#283239' />
    <TextInput placeholder={address} style = {styles.formInput}
     editable={edit} value={address} onChangeText={setAddress}/>
    </View>

    <Text style = {{marginBottom:4,paddingBottom:4,marginTop:8}}>Mobile Number</Text>
    <View style = {styles.formField}>
    <MaterialIcons style={{ paddingVertical: 4}} name='settings-cell' size={18} color='#283239' />
    <TextInput placeholder={mobileNumber} style = {styles.formInput}
     editable={edit} value={mobileNumber} onChangeText={setMobileNumber} keyboardType={'number-pad'}/>
    </View>
    
    <Text style = {{marginBottom:4,paddingBottom:4,marginTop:8}}>Emergency Contact Email </Text>

    <View style = {styles.formField}>
    <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
    <TextInput placeholder={emergencyContactEmail} style = {styles.formInput}
     editable={edit} value={emergencyContactEmail} onChangeText={setEmergencyContactEmail}/>
    </View>

    <Text style = {{marginBottom:4,paddingBottom:4,marginTop:8}}>Emergency Contact Number </Text>

    <View style = {styles.formField}>
    <MaterialIcons style={{ paddingVertical: 4}} name='settings-cell' size={18} color='#283239' />
    <TextInput placeholder={emergencyContactNumber} style = {styles.formInput}
     editable={edit} value={emergencyContactNumber} onChangeText={setEmergencyContactNumber}/>
    </View>

  
    </ScrollView>

    {(edit) && <TouchableOpacity onPress={savePressed} style = {styles.customBTN}>
        <Text style={styles.textBTN}>Save</Text>
    </TouchableOpacity>}
    
  </View>
      
     
  );
};



export default ViewPersonalInformationScreen;

