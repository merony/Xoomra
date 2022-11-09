import {
    Alert,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Entype from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import React from 'react';
import { RotateInUpLeft } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import search from '../../data/search';
import styles from './styles';

const PersonalInformationScreen = ({navigation, props}) => {



  const [firstNameFromUI,setFirstNameFromUI] = useState("")
  const [lastNameFromUI,setLastNameFromUI] = useState("")
  const [genderFromUI,setGenderFromUI] = useState("")
  const [addressFromUI,setAddressFromUI] = useState("")
  const [mobileNumberFromUI,setMobileNumberFromUI] = useState("")
  const [emergencyEmailFromUI,setEmergencyEmailFromUI] = useState("")
  const [emergencyMobileFromUI,setEmergencyMobileFromUI] = useState("")
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isCompleted, setCompleted] = useState(false);




  useEffect(() => {
    //Runs on every render

    // test();
     
  });


  useEffect(() => {
    //Runs only on the first render


   
  }, []);


  const savePressed = async() => {

    
    const profilesCollection = await firestore().collection('users')
                                                .doc("PersonalInformations")
                                                .collection('user')
                                                // .doc(auth().currentUser.uid)
                                                .where(`mobile`,`==`,mobileNumberFromUI).get()
  
    if (firstNameFromUI.length === 0  || lastNameFromUI.length === 0 ||  
        genderFromUI.length === 0 || addressFromUI.length === 0 ||
        mobileNumberFromUI.length === 0){

      Alert.alert('',"Please fill all Information")
    }


    else{

      
        if (profilesCollection.docs.length !== 0){
          Alert.alert('',"number already exists")
          setMobileNumberFromUI("")
          
        }
        else if(profilesCollection.docs.length === 0) {
          firestore().collection('users').doc("PersonalInformations").collection('user').doc(auth().currentUser.uid).update({
             
              firstName : firstNameFromUI,
              lastName : lastNameFromUI,
              gender : genderFromUI,
              DOB : date,
              Address : addressFromUI,
              mobile : mobileNumberFromUI,
              emergencyMobile : emergencyMobileFromUI,
              emergencyEmail : emergencyEmailFromUI,
              isCompleted: true,

              })

              navigation.navigate('Profile Screen')
          
        }

      }


    }

    return (

       
          <View style={{ justifyContent: 'center', marginTop: 15, paddingTop: 0, marginLeft: 15, marginRight: 15}} > 
            <ScrollView>
            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='person' size={18} color='#283239' />
            <TextInput placeholder='First Name' style = {styles.formInput} 
              value={firstNameFromUI} onChangeText={setFirstNameFromUI}/>
            </View>
            
            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='person' size={18} color='#283239' />
            <TextInput placeholder='Last Name' style = {styles.formInput}
              value={lastNameFromUI} onChangeText={setLastNameFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='person' size={18} color='#283239' />
            <TextInput placeholder='Gender' style = {styles.formInput}
              value={genderFromUI} onChangeText={setGenderFromUI}/>
            </View>
            
            <View style={{flexDirection:`row`}}>
              <MaterialIcons style={{ paddingVertical: 2,paddingRight:3}} name='date-range' size={18} color='#283239' />
              <Text onPress={() => setOpen(true)} style={{marginHorizontal:2,marginBottom:20,color:"gray", fontSize: 14}}>Select Date Of Birth</Text>
            </View>

              <DatePicker
              modal
              mode='date'
              open={open}
              date={date}
              onConfirm={(date) => {
              setOpen(false)
              setDate(date)
              }}
              onCancel={() => {
              setOpen(false)
              }}
              />

            
            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='location-outline' size={18} color='#283239' />
            <TextInput placeholder='Address' style = {styles.formInput}
              value={addressFromUI} onChangeText={setAddressFromUI}/>
            </View>

            <View style={{marginBottom:20}}>
              <FlatList
              data={search}
              renderItem={({item}) => (
              
              <View style={styles.row}>
                  <View style ={styles.iconContainer}>
                      <Entype name={"location-pin"} size={30} color='#283239' />
                      
                      </View>

                      <Text style ={styles.locationText}>{item.description}</Text>
              </View>
              )} />
            </View>

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='settings-cell' size={18} color='#283239' />
            <TextInput placeholder='Mobile Number' style = {styles.formInput}
              value={mobileNumberFromUI} onChangeText={setMobileNumberFromUI} keyboardType={'number-pad'}/>
            </View>
            
            <Text style = {{marginBottom:4,paddingBottom:4,marginTop:8}}>Emergency Contact (Optional) </Text>

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
            <TextInput placeholder='Email' style = {styles.formInput}
              value={emergencyEmailFromUI} onChangeText={setEmergencyEmailFromUI}/>
            </View>

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='settings-cell' size={18} color='#283239' />
            <TextInput placeholder='Mobile' style = {styles.formInput}
              value={emergencyMobileFromUI} onChangeText={setEmergencyMobileFromUI}/>
            </View>

            <TouchableOpacity onPress={savePressed} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Save</Text>
            </TouchableOpacity>
            </ScrollView>
          </View>
        
    );
  };
  
 
  
  export default PersonalInformationScreen;