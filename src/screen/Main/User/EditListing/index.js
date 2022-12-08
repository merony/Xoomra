import {AccommodationsDB, MyAccommodationsDB} from '../../../../data/firRef';
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import DatePickerComponent from '../../../../components/DatePicker'
import DropDownPicker from 'react-native-dropdown-picker';
import Entype from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import auth from '@react-native-firebase/auth'
import {cUserDB} from '../../../../data/firCuRef';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

const EditListingScreen = ({navigation, props,route}) => {
  
  const {listingID} = route.params;
 
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
 
  const abbreviationsLocations = [
  'NL',
  'PE',
  'NS',
  'NB',
  'QC',
  'ON',
  'MB',
  'SK',
  'AB',
  'BC',
  'NU',
  'NT',
  'YT',
  ]
 
  const [stayTitle,setStayTitle] = useState("")
  const [accommodationDetails,setAccommodationDetails] = useState("")
  const [houseRules,setHouseRules] = useState("")
  const [address,setAddress] = useState("")
  const [city,setCity] = useState("")
  const [wantToGoCountry,setWantToGoCountry] = useState("Canada")
  const [wantToGoCity,setWantToGoCity] = useState("")
  const [wantToGoState,setWantToGoState] = useState("")
  const [availabilityFrom,setavailabilityFrom] = useState(new Date())
  const [availabilityTo,setavailabilityTo] = useState(new Date())
  const [maxGuest,setMaxGuest] = useState(0)
  const [maxAvailableDays,setMaxAvailableDays] = useState(0)
  const [docID, setDocID] = useState("")
  const [lat,setLat] = useState(0)
  const [lng,setLng] = useState(0)
  const [latWantToGo,setLatWantToGo] = useState(0)
  const [lngWantToGo,setLngWantToGo] = useState(0)
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
 
  // setData();
  getData();
  
 
  
 
  
  }, []);
 
  const updateLocation = (locationTemp) =>{
  let temp
  for(let i=0;i<abbreviationsLocations.length;i++){
  if(locationTemp===abbreviationsLocations[i]){
  temp = locations[i].value
  break
  }
  }
  console.log(`state is : ${temp}`)
  return temp
  }
 
  
  const updateWantToGoLocation = (locationTemp) =>{
  let temp
  for(let i=0;i<abbreviationsLocations.length;i++){
  if(locationTemp===abbreviationsLocations[i]){
  temp = locations[i].value
  break
  }
  }
  console.log(`state is : ${temp}`)
  return temp
  }
 
  const getData = async() => {
  
  const currentListing = (await MyAccommodationsDB.doc(listingID).get()).data()
  console.log('listing data',currentListing)
  setStayTitle(currentListing.StayTitle)
  setAccomodationTypeValue(currentListing.AccommodationType)
  setAccommodationDetails(currentListing.AccommodationDetails)
  setHouseRules(currentListing.HouseRules)
  setAddress(currentListing.Address)
  setCity(currentListing.City)
  setAccomodationLocationValue(currentListing.State)
  setWantToGoCity(currentListing.WantToGo.City)
  setWantToGoState(currentListing.WantToGo.State)
  setMaxGuest(currentListing.maxGuest)
  setMaxAvailableDays(currentListing.maxAvailableDays)
  setavailabilityFrom(currentListing.Availability.availabilityStart.toDate())
  setavailabilityTo(currentListing.Availability.availabilityEnd.toDate())
  setDocID(currentListing.docID)
 
  }
 
 
 
 
  
  const EditListingPressed = () => {
 
  if (stayTitle.length === 0 || accomodationTypeValue.length === 0 || accommodationDetails.length === 0 
  || houseRules.length === 0 || address.length === 0 || wantToGoState.length === 0 || wantToGoCity.length === 0
  || maxGuest.length === 0 || maxAvailableDays.length === 0){
 
  Alert.alert("","Please Fill All Information")
  }
  else{
  MyAccommodationsDB.doc(listingID).update({
  StayTitle : stayTitle,
  AccommodationType : accomodationTypeValue,
  AccommodationDetails : accommodationDetails,
  HouseRules : houseRules,
  Address : address,
  City: city ,
  State: accomodationLocationValue,
  Country: 'Canada' ,
  lat:lat,
  lng:lng,
  WantToGo : {
  Country : wantToGoCountry ,
  State: wantToGoState ,
  City: wantToGoCity, 
  lat:latWantToGo,
  lng:lngWantToGo,
  },
  maxGuest : maxGuest,
  maxAvailableDays : maxAvailableDays,
  Availability: {
  availabilityStart : new Date(availabilityFrom),
  availabilityEnd : new Date(availabilityTo),
  },
 
  })
  .then (() =>{
  console.log("UPDATED")
  // navigation.navigate('Add Photos', {listingID: docID})
  
  navigation.navigate('Edit Listing Photos',{listingID:docID })
  // navi.navigate('Edit Listing', {listingID: listing.stay.docID})
 
 
  })
  }
 
  }
 
  
  return (
  <SafeAreaView style={{flex: 1, flexDirection: "column"}}>
  <StatusBar/>
 
  
  <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps={'handled'}>
 
  {/* <Text>{docID}</Text> */}
 
  
  <View style={{ justifyContent: 'center', margin: 20, paddingTop: 0}} > 
 
  <Text style={styles.headerTitle}>Edit Accomodation Details</Text>
  
  <Text style = {{marginBottom : 10,marginHorizontal:5}}>Stay Title</Text>
  <View style = {styles.formField}>
  <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
  <TextInput placeholder='Stay Title' style = {styles.formInput} 
  value={stayTitle} onChangeText={setStayTitle}/>
  </View>
 
  <Text style = {{marginBottom : 10,marginHorizontal:5}}>Accommodation Type</Text>
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
  
  <Text style = {{marginBottom : 10,marginHorizontal:5}}>Accommodation Details</Text>
  <View style = {styles.formField}>
  <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
  <TextInput placeholder='Accommodation Details' style = {[styles.formInput, { paddingVertical:0, minHeight:100,textAlign:'left',textAlignVertical:'top',paddingVertical:4}]}
  value={accommodationDetails} onChangeText={setAccommodationDetails} multiline={true}/>
  </View>
 
  <Text style = {{marginBottom : 10,marginHorizontal:5}}>House Rules</Text>
  <View style = {styles.formField}>
  <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
  <TextInput placeholder='House Rules' style = {[styles.formInput, { paddingVertical:0, minHeight:100,textAlign:'left',textAlignVertical:'top',paddingVertical:4}]}
  value={houseRules} onChangeText={setHouseRules} multiline={true}/>
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
  <Text style={{fontSize: 14}}>{availabilityFrom.toDateString()}</Text>
  <Text onPress={() => setOpenTo(true)} style={{marginHorizontal: 0, fontSize: 14, fontWeight: 'bold'}}>To</Text>
  <Text style={{fontSize: 14}}>{availabilityTo.toDateString()}</Text>
  
 
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
 
  <View style = {styles.subFormField1}>
  <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
  <TextInput placeholder='Address' style = {styles.formInput}
  value={address} onChangeText={setAddress}/>
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
 
  <View style={{ width: '96%', height: 200, position: 'absolute', top: 50, left: 15,zIndex:1}}>
  <GooglePlacesAutocomplete
  placeholder='Search'
  fetchDetails={true}
  onPress={(data, details = null) => {
 
  // updateCoordinates(details);
  console.log(data);
  setAddress(data.structured_formatting.main_text);
  setCity(data.terms[2].value)
  setAccomodationLocationValue(updateLocation(data.terms[3].value))
  setLat(details.geometry.location.lat)
  setLng(details.geometry.location.lng)
 
  }}
  query={{
  key: 'AIzaSyCvKybLVxh-zJhh82UhEu31jITa_BNB2zI',
  language: 'en',
  components: 'country:ca'
  }}
  />
  
  </View>
 
 </View>
 
 
 
  <View>
  <Text style={styles.headerTitle}>Want To Exchange From</Text>
  
  <View style = {styles.subFormField1}>
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
 
  <View style={{ width: '96%', height: 200, position: 'absolute', top: 50, left: 15,zIndex:1}}>
  <GooglePlacesAutocomplete
  placeholder='Search'
  fetchDetails={true}
  onPress={(data, details = null) => {
 
  // updateCoordinates(details);
  setWantToGoCity(data.terms[2].value)
  setWantToGoState(updateWantToGoLocation(data.terms[3].value))
  setLatWantToGo(details.geometry.location.lat)
  setLngWantToGo(details.geometry.location.lng)
 
  }}
  query={{
  key: 'AIzaSyCvKybLVxh-zJhh82UhEu31jITa_BNB2zI',
  language: 'en',
  components: 'country:ca'
  }}
  />
  
 
  </View>
 
  </View>
 
  </View>
  
  </ScrollView>
 
  <View style= {{ flexDirection: "column", padding: 20, justifyContent: 'flex-end', backgroundColor: '#fff'}} >
  <TouchableOpacity onPress={EditListingPressed} style = {styles.customBTN}>
  <Text style={styles.textBTN}>Update & Continue</Text>
  </TouchableOpacity>
 
  </View>
 
  </SafeAreaView>
  );
 };
  
  
  
  export default EditListingScreen;