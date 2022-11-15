import {AccommodationsDB, cUserDB, usersDB} from '../../../../data/firRef';
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
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Entype from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

const AddListingScreen = ({navigation, props}) => {

  const [stayTitleFromUI,setStayTitleFromUI] = useState("")
  const [accommodationTypeFromUI,setAccommodationTypeFromUI] = useState("")
  const [accommodationDetailsFromUI,setAccommodationDetailsFromUI] = useState("")
  const [houseRulesFromUI,setHouseRulesFromUI] = useState("")
  const [addressFromUI,setAddressFromUI] = useState("")
  const [wantToGoCountry,setWantToGoCountry] = useState("Canada")
  const [wantToGoCity,setWantToGoCity] = useState("")
  const [wantToGoState,setWantToGoState] = useState("")
  const [availabilityFrom,setavailabilityFrom] = useState("")
  const [availabilityTo,setavailabilityTo] = useState("")
  const [maxAllowedPersonsFromUI,setMaxAllowedPersonsFromUI] = useState("")
  const [maxAvailableDaysFromUI,setMaxAvailableDaysFromUI] = useState("")
  const [docID, getDocID] = useState("")
  const [accomodationTypeOpen, setAccomodationTypeOpen] = useState(false);
  const [accomodationTypeValue, setAccomodationTypeValue] = useState("");
  const [accomodationType, setAccomodationType] = useState([
    {label: ' Private Room', value: 'private'},{label: 'Shared Room', value: 'shared'} ]);




  useEffect(() => {
    //Runs on every render

    // test();
     
  });


  useEffect(() => {
    //Runs only on the first render
    AccommodationsDB.add({
  StayTitle : 'Untitled',
  Status : 'draft'

})

.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);

  getDocID(docRef.id);

  Alert.alert("Document written with ID: ", docID);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});

   
  }, []);



  const addImagesPressed = () => {

  }
  const addListingPressed = () => {

    if (stayTitleFromUI.length === 0 || accommodationTypeFromUI.length === 0 || accommodationDetailsFromUI.length === 0 
      || houseRulesFromUI.length === 0 || addressFromUI.length === 0 || wantToGoState.length === 0 || wantToGoCity.length === 0
      || maxAllowedPersonsFromUI.length === 0 || maxAvailableDaysFromUI.length === 0){

      Alert.alert("","Please Fill All Information")
    }
    else{
      AccommodationsDB.doc(docID).update({
        StayTitle : stayTitleFromUI,
        AccommodationType : accommodationTypeFromUI,
        AccommodationDetails : accommodationDetailsFromUI,
        HouseRules : houseRulesFromUI,
        Address : addressFromUI,
        WantToGo : {
          Country : wantToGoCountry ,
          State: wantToGoState ,
          City: wantToGoCity, 

        },
        MaximumAllowedPersons : maxAllowedPersonsFromUI,
        MaximumAvailableDays : maxAvailableDaysFromUI,
        Availability: {
          availabilityStart : new Date(availabilityFrom),
          availabilityEnd : new Date(availabilityTo),
        },


      })
      .then (() =>{

        navigation.navigate('Add Photos')

      })
    }

  }

  
  return (
    <SafeAreaView style={{flex: 1, flexDirection: "column"}}>
      <StatusBar/>
      <ScrollView>

        {/* <Text>{docID}</Text> */}
      
        <View style={{ justifyContent: 'center', marginTop: 15, paddingTop: 0, marginLeft: 15, marginRight: 15}} > 

          <Text style={styles.headerTitle}>Accomodation Details</Text>
        
          <View style = {styles.formField}>
          <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
          <TextInput placeholder='Stay Title' style = {styles.formInput} 
            value={stayTitleFromUI} onChangeText={setStayTitleFromUI}/>
          </View>


          <View style={styles.dropField}>
              <Fontisto style={{ paddingVertical: 17}} name='genderless' size={16} color='#283239' />
                <DropDownPicker style = {styles.dropInput}

                      open={accomodationTypeOpen}
                      value={accomodationTypeValue}
                      items={accomodationType}
                      setOpen={setAccomodationTypeOpen}
                      setValue={setAccomodationTypeValue}
                      setItems={setAccomodationType}
                      multiple={false}
                      min={1}
                      placeholder={"Select Gender"}
                      // mode="SIMPLE"
                      // zIndex={1000}
                     
                      dropDownDirection="BOTTOM"
                      showBadgeDot={true}
                      textStyle={{
                        fontSize: 14,
                        opacity: 0.5
                      }}

                      dropDownContainerStyle={{
                        backgroundColor: "#fff",
                        width: 340,
                        borderWidth:0,
                        opacity: 1,
                        zIndex: -999
                       
            
                      }}

                      containerStyle={{

                        // height: 10,
                        // margin: 0,
                        // padding: 0

                      }}

                      

                    
                      
                    />
               </View>

          <View style = {styles.formField}>
          <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
          <TextInput placeholder='Accommodation Details' style = {[styles.formInput, { paddingVertical:0, minHeight:100,textAlign:'left',textAlignVertical:'top',paddingVertical:4}]}
            value={accommodationDetailsFromUI} onChangeText={setAccommodationDetailsFromUI} multiline={true}/>
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
            value={wantToGoCity} onChangeText={setWantToGoCity}/>
          </View>


        </View>
      
        </ScrollView>

    <View style= {{ flexDirection: "column", padding: 20, justifyContent: 'flex-end', backgroundColor: '#fff'}} >
        <TouchableOpacity onPress={addListingPressed} style = {styles.customBTN}>
              <Text style={styles.textBTN}>Add & Continue</Text>
          </TouchableOpacity>

          </View>

    </SafeAreaView>
  );
};



export default AddListingScreen;