import {
  Alert,
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

import {AccommodationsDB} from '../../../../data/firRef';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import DatePickerComponent  from '../../../../components/DatePicker'
import DropDownPicker from 'react-native-dropdown-picker';
import Entype from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import auth from '@react-native-firebase/auth'
import {cUserDB} from '../../../../data/firCuRef';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

const AddListingScreen = ({navigation, props}) => {


  const locations = [ {label: 'Newfoundland & Labrador', value: 'Newfoundland-Labrador '},{label: 'Prince Edward Island', value: 'Prince-Edward-Island'}, 
  {label: 'Nova Scotia', value: 'Nova-Scotia'},
  {label: 'New Brunswick', value: 'New-Brunswick'},
  {label: 'Quebec', value: 'Quebec'},
  {label: 'Ontario', value: 'Ontario'},
  {label: 'Manitoba', value: 'Manitoba'},
  {label: 'Saskatchewan', value: 'Saskatchewan'},
  {label: 'Alberta', value: 'Alberta'},
  {label: 'British Columbia', value: 'British Columbia'},
  {label: 'Nunavut', value: 'Nunavut'},
  {label: 'Northwest Territories', value: 'Northwest-Territories'},
  {label: 'Yukon Territory', value: 'Yukon-Territory'}];

  const [stayTitleFromUI,setStayTitleFromUI] = useState("")
  const [accommodationTypeFromUI,setAccommodationTypeFromUI] = useState("")
  const [accommodationDetailsFromUI,setAccommodationDetailsFromUI] = useState("")
  const [houseRulesFromUI,setHouseRulesFromUI] = useState("")
  const [addressFromUI,setAddressFromUI] = useState("")
  const [city,setCity] = useState("")
  const [wantToGoCountry,setWantToGoCountry] = useState("Canada")
  const [wantToGoCity,setWantToGoCity] = useState("")
  const [wantToGoState,setWantToGoState] = useState("")
  const [availabilityFrom,setavailabilityFrom] = useState(new Date())
  const [availabilityTo,setavailabilityTo] = useState(new Date())
  const [maxGuest,setMaxGuest] = useState(0)
  const [maxAvailableDays,setMaxAvailableDays] = useState(0)
  const [docID, getDocID] = useState("")
  const [accomodationTypeOpen, setAccomodationTypeOpen] = useState(false);
  const [accomodationTypeValue, setAccomodationTypeValue] = useState("");
  const [accomodationType, setAccomodationType] = useState([
    {label: ' Private Room', value: 'private'},{label: 'Shared Room', value: 'shared'} ]);

    const [locationOpen, setLocationOpen] = useState(false);
    const [wantLocationOpen, setWantLocationOpen] = useState(false);

    const [accomodationLocationValue, setAccomodationLocationValue] = useState("");

    const [locationState, setLocationState] = useState(locations);

    const [wantLocationState, setWantLocationState] = useState(locations);


      const [date, setDate] = useState(new Date());
      const [open, setOpen] = useState(false);
      const [openTo, setOpenTo] = useState(false);




  useEffect(() => {
    //Runs on every render

    // test();
     
  });


  useEffect(() => {
    //Runs only on the first render+

    setData();
    
    
  

   
  }, []);



  const setData = async () => {

    const userData = (await cUserDB.get()).data();
    console.log ('User Data', userData)
    AccommodationsDB.add({
      StayTitle : 'Untitled',
      Status : 'draft',
      uid: auth().currentUser.uid,
      
    })
    
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    
      getDocID(docRef.id);
    
      Alert.alert("Document written with ID: ", docID);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

  }
  const addListingPressed = () => {

    if (stayTitleFromUI.length === 0 || accomodationTypeValue.length === 0 || accommodationDetailsFromUI.length === 0 
      || houseRulesFromUI.length === 0 || addressFromUI.length === 0 || wantToGoState.length === 0 || wantToGoCity.length === 0
      || maxGuest.length === 0 || maxAvailableDays.length === 0){

      Alert.alert("","Please Fill All Information")
    }
    else{
      AccommodationsDB.doc(docID).update({
        StayTitle : stayTitleFromUI,
        AccommodationType : accomodationTypeValue,
        AccommodationDetails : accommodationDetailsFromUI,
        HouseRules : houseRulesFromUI,
        Address : addressFromUI,
        City: city ,
        State: accomodationLocationValue,
        Country: 'Canada' ,
        WantToGo : {
          Country : wantToGoCountry ,
          State: wantToGoState ,
          City: wantToGoCity, 

        },
        maxGuest : maxGuest,
        maxAvailableDays : maxAvailableDays,
        Availability: {
          availabilityStart : new Date(availabilityFrom),
          availabilityEnd : new Date(availabilityTo),
        },


      })
      .then (() =>{

        navigation.navigate('Add Photos', {listingID: docID})

      })
    }

  }

  
  return (
    <SafeAreaView style={{flex: 1, flexDirection: "column"}}>
      <StatusBar/>

      
      <ScrollView>

        {/* <Text>{docID}</Text> */}

      
        <View style={{ justifyContent: 'center', margin: 20, paddingTop: 0}} > 

         <Text style={styles.headerTitle}>Accomodation Details</Text>
        
          <View style = {styles.formField}>
          <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
          <TextInput placeholder='Stay Title' style = {styles.formInput} 
            value={stayTitleFromUI} onChangeText={setStayTitleFromUI}/>
          </View>


          <View style={styles.dropField}>
              <Fontisto style={{ paddingVertical: 15}} name='genderless' size={16} color='#283239' />
                <DropDownPicker style = {styles.dropInput}

                      open={accomodationTypeOpen}
                      value={accomodationTypeValue}
                      items={accomodationType}
                      setOpen={setAccomodationTypeOpen}
                      setValue={setAccomodationTypeValue}
                      setItems={setAccomodationType}
                      multiple={false}
                      min={1}
                      placeholder={"Select Accomodation Type"}
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
          <TextInput placeholder='House Rules' style = {[styles.formInput, { paddingVertical:0, minHeight:100,textAlign:'left',textAlignVertical:'top',paddingVertical:4}]}
            value={houseRulesFromUI} onChangeText={setHouseRulesFromUI}/>
          </View>


          <View style ={styles.formField}>


<View>
  <Text style={{fontWeight: 'bold'}}>Guest</Text>
  <Text style={{color: '#8d8d8d', fontSize: 14 }}>Max Number of Guest</Text>
</View>
<View style={{flexDirection: 'row', alignItems: 'center'}}>
  <Pressable
    onPress={() => setMaxGuest(Math.max(0, maxGuest - 1))}
    style={styles.button}>
    <Text style={{fontSize: 20, color: '#474747'}}>-</Text>
  </Pressable>

  <Text style={{marginHorizontal: 20, fontSize: 16}}>{maxGuest}</Text>

  <Pressable
    onPress={() => setMaxGuest(maxGuest + 1)}
    style={styles.button}>
    <Text style={{fontSize: 20, color: '#474747'}}>+</Text>
  </Pressable>
</View>

</View>


<View style ={styles.formField}>

<View>
  <Text style={{fontWeight: 'bold'}}>Stay</Text>
  <Text style={{color: '#8d8d8d', fontSize: 14 }}>Max days of stay</Text>

</View>
<View style={{flexDirection: 'row', alignItems: 'center'}}>
  <Pressable
    onPress={() => setMaxAvailableDays(Math.max(0, maxAvailableDays - 1))}
    style={styles.button}>
    <Text style={{fontSize: 20, color: '#474747'}}>-</Text>
  </Pressable>

  <Text style={{marginHorizontal: 20, fontSize: 16}}>{maxAvailableDays}</Text>

  <Pressable
    onPress={() => setMaxAvailableDays(maxAvailableDays + 1)}
    style={styles.button}>
    <Text style={{fontSize: 20, color: '#474747'}}>+</Text>
  </Pressable>
</View>

</View>


<View style ={styles.formField}>


<View>
  <Text style={{fontWeight: 'bold'}}>Set Accomodation Availability</Text>

  <Text onPress={() => setOpen(true)} style={{marginHorizontal: 0, fontSize: 14, fontWeight: 'bold'}}>From</Text>
  <Text  style={{fontSize: 14}}>{availabilityFrom.toDateString()}</Text>
  <Text onPress={() => setOpenTo(true)} style={{marginHorizontal: 0, fontSize: 14, fontWeight: 'bold'}}>To</Text>
  <Text  style={{fontSize: 14}}>{availabilityTo.toDateString()}</Text>
  

  {/* <Text style={{color: '#8d8d8d', fontSize: 14 }}>When do you want to visit?</Text> */}
</View>
<View style={{flexDirection: 'row', alignItems: 'center'}}>



          <DatePicker
        modal
        open={open}
        date={availabilityFrom}
        onConfirm={(date) => {
          setOpen(false)
          setavailabilityFrom(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
          />


<DatePicker
        modal
        open={openTo}
        date={availabilityTo}
        onConfirm={(date) => {
          setOpenTo(false)
          setavailabilityTo(date)
        }}
        onCancel={() => {
          setOpenTo(false)
        }}
          />

</View>

</View>
          
   
<View>
          <Text style={styles.headerTitle}>Accomodation Location</Text>
          <View style = {styles.subFormField}>
          <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Address' style = {styles.formInput}
            value={addressFromUI} onChangeText={setAddressFromUI}/>
          </View>

          <View style = {styles.subFormField}>
          <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#f5f5f5' />
            <TextInput placeholder='City' style = {styles.formInput}
            value={city} onChangeText={setCity}/>
          </View>

           <View style={styles.dropField}>
              <Fontisto style={{ paddingVertical: 15}} name='genderless' size={16} color='#f5f5f5' />
                <DropDownPicker style = {styles.dropInput}

                      open={locationOpen}
                      value={accomodationLocationValue}
                      items={locationState}
                      setOpen={setLocationOpen}
                      setValue={setAccomodationLocationValue}
                      setItems={setLocationState}
                      multiple={false}
                      min={1}
                      // searchable={true}
                      placeholder={"Select State"}
                      listMode="SCROLLVIEW"
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


                      scrollViewProps={{
                        decelerationRate: "fast"
                      }}
  
                      searchTextInputProps={{
                        maxLength: 25
                      }}
                      
                    />
                </View>

          </View>



          <View>
          <Text style={styles.headerTitle}>Want To Exchange From</Text>
         
          <View style = {styles.subFormField}>
          <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='City' style = {styles.formInput}
            value={wantToGoCity} onChangeText={setWantToGoCity}/>
          </View>

           <View style={styles.dropField}>
              <Fontisto style={{ paddingVertical: 15}} name='genderless' size={16} color='#f5f5f5' />
                <DropDownPicker style = {styles.dropInput}

                      open={wantLocationOpen}
                      value={wantToGoState}
                      items={wantLocationState}
                      setOpen={setWantLocationOpen}
                      setValue={setWantToGoState}
                      setItems={setWantLocationState}
                      multiple={false}
                      min={1}
                      // searchable={true}
                      placeholder={"Select State"}
                      listMode="SCROLLVIEW"
                      // mode="SIMPLE"
                      // zIndex={1000}
                     
                      dropDownDirection="TOP"
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


                      scrollViewProps={{
                        decelerationRate: "fast"
                      }}
  
                      searchTextInputProps={{
                        maxLength: 25
                      }}
                      
                    />
                </View>

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