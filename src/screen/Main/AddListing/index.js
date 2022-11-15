import {
    Alert,
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo'
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

const AddListingScreen = ({navigation}) => {

    const [stayTitleFromUI,setStayTitleFromUI] = useState("")
    const [accommodationTypeFromUI,setAccommodationTypeFromUI] = useState("")
    const [accommodationDetailsFromUI,setAccommodationDetailsFromUI] = useState("")
    const [houseRulesFromUI,setHouseRulesFromUI] = useState("")
    const [addressFromUI,setAddressFromUI] = useState("")
    const [wantToGoCityCountryFromUI,setWantToGoCityCountryFromUI] = useState("")
    const [maxAllowedPersonsFromUI,setMaxAllowedPersonsFromUI] = useState("")
    const [maxAvailableDaysFromUI,setMaxAvailableDaysFromUI] = useState("")

    const addImagesPressed = () => {

    }
    const addListingPressed = () => {

      if (stayTitleFromUI.length === 0 || accommodationTypeFromUI.length === 0 || accommodationDetailsFromUI.length === 0 
        || houseRulesFromUI.length === 0 || addressFromUI.length === 0 || wantToGoCityCountryFromUI.length === 0
        || maxAllowedPersonsFromUI.length === 0 || maxAvailableDaysFromUI.length === 0){

        Alert.alert("","Please Fill All Information")
      }
      else{
        firestore().collection('Accommodations').add({
          StayTitle : stayTitleFromUI,
          AccommodationType : accommodationTypeFromUI,
          AccommodationDetails : accommodationDetailsFromUI,
          HouseRules : houseRulesFromUI,
          Address : addressFromUI,
          WantToGo : wantToGoCityCountryFromUI,
          MaximumAllowedPersons : maxAllowedPersonsFromUI,
          MaximumAvailableDays : maxAvailableDaysFromUI

        })
      }

    }

    
    return (
      <SafeAreaView style={{flex: 1, flexDirection: "column"}}>
        <StatusBar/>
        <ScrollView>
        
          <View style={{ justifyContent: 'center', marginTop: 15, paddingTop: 0, marginLeft: 15, marginRight: 15}} > 

            <Text style={styles.headerTitle}>Add Listing</Text>
          
            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
            <TextInput placeholder='Stay Title' style = {styles.formInput} 
              value={stayTitleFromUI} onChangeText={setStayTitleFromUI}/>
            </View>


            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Accommodation Type' style = {styles.formInput}
              value={accommodationTypeFromUI} onChangeText={setAccommodationTypeFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Accommodation Details' style = {styles.formInput}
              value={accommodationDetailsFromUI} onChangeText={setAccommodationDetailsFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='House Rules' style = {styles.formInput}
              value={houseRulesFromUI} onChangeText={setHouseRulesFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Address' style = {styles.formInput}
              value={addressFromUI} onChangeText={setAddressFromUI}/>
            </View>


            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Maximum Allowed Persons' style = {styles.formInput}
              value={maxAllowedPersonsFromUI} onChangeText={setMaxAllowedPersonsFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Maximum Available Days' style = {styles.formInput}
              value={maxAvailableDaysFromUI} onChangeText={setMaxAvailableDaysFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Want To Go: City/Country' style = {styles.formInput}
              value={wantToGoCityCountryFromUI} onChangeText={setWantToGoCityCountryFromUI}/>
            </View>

            
   

          </View>
        
          </ScrollView>

          <TouchableOpacity onPress={addListingPressed} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Add Listing</Text>
            </TouchableOpacity>

      </SafeAreaView>
    );
  };
  
 
  
  export default AddListingScreen;
