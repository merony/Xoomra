import { AccommodationsDB, cUserDB, usersDB } from '../../../data/firRef';
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
import Loader from '../../../components/Loader/Loader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import StayComponent from '../../../components/Stay';
import { TextInput } from 'react-native-gesture-handler';
import stayFeed from '../../../data/stayFeed';
import styles from './styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const StayListScreen = ({ navigation, props }) => {


  const [accomodations, setAccomodations] = useState([]);
  const [laoding, setLoading] = useState(false);
  const [location,setLocation] = useState('Canada')
  const [maxDays,setMaxDays] = useState(0)
  const [maxGuest,setMaxGuest] = useState(0)
  const [day1,setDay1] =useState((new Date().toString()))
  const [day2,setDay2] =useState((new Date().toString()))
  const destinationKey = 'destinationKey'
  
const getData = async () => {
  try {
    console.log(`reading ok`)
    const jsonValue = await AsyncStorage.getItem(destinationKey)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(`reading error`)
    // error reading value
  }
}

// city
// state
// maxguest
// maxnight
const returnSearchResult = (listsFromDatabase,city,state,maxGuest,maxDays) =>{
  let temp = []
  let result = []
  
  for(let i of listsFromDatabase){
    temp.push({listing:i,relevance:0})
  }
 
  

  for(let ii of temp){
    console.log(`listing.city: ${ii.listing.City}mcity: ${city}`)
    console.log(`listing.State: ${ii.listing.State}mcity: ${state}`)
    console.log(`listing.State: ${ii.listing.maxGuest}mcity: ${maxGuest}`)
    console.log(`listing.State: ${ii.listing.maxAvailableDays}mcity: ${maxDays}`)
    if(ii.listing.City.toUpperCase()===city.toUpperCase()){
      ii.relevance+=1
    }
    if(ii.listing.State.toUpperCase()===state.toUpperCase()){
      ii.relevance+=1
    }
    if(ii.listing.maxGuest<=maxGuest){
      ii.relevance+=1
    }
    if(ii.listing.maxAvailableDays<=maxDays){
      ii.relevance+=1
    }
  }
  console.log(temp[0].relevance)
  
  const temp1=[]
  const temp2=[]
  const temp3 =[]
  const temp4=[]
  const temp0 =[]
  for(let iii of temp){
    if(iii.relevance===4){
      temp4.push(iii)
    }
    if(iii.relevance===3){
      temp3.push(iii)
    }
    if(iii.relevance===2){
      temp2.push(iii)
    }
    if(iii.relevance===1){
      temp1.push(iii)
    }
    if(iii.relevance===0){
      temp0.push(iii)
    }
  }
  console.log(`temp0: ${temp0.length}`)
  console.log(`temp1: ${temp1.length}`)
  console.log(`temp2: ${temp2.length}`)
  console.log(`temp3: ${temp3.length}`)
  console.log(`temp4: ${temp4.length}`)
  let tempWithRelevance = temp4.concat(temp3,temp2,temp1,temp0)
  for (i of tempWithRelevance){
    result.push(i.listing)
  }
  // console.log(result.length)
  return result
}



  useEffect(() => {
    //Runs on every render

    // test();



  });


  useEffect(() => {
    //Runs only on the first render
    loadData();


  }, []);


  loadData = async () => {
    setLoading(true)
    const listingData = await AccommodationsDB.get()
      .then((querySnapshot) => {

        const listings = []
     
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots


          listings.push(doc.data());
          setLoading(false)
        });
        
        
        // setAccomodations(listingToRender)
        
        getData().then((data) =>{    
          console.log(data)
          setLocation(data.address)
          setMaxDays(data.maxStay)
          setMaxGuest(data.maxGuest)
          setDay1(data.date1)
          setDay2(data.date2)
          console.log(data.address)
          const listingToRender = returnSearchResult(listings,data.city,data.state,data.maxGuest,data.maxStay)
          
          
          setAccomodations(listingToRender);
          // console.log(listingToRender.length)
          
        })
          
          
        // console.log( " Data=> ", accomodations);
      });

  }


  const renderItem = ({ item }) => (
    // <Item title={item.title} />
    <StayComponent stay={item} />
  );


  return laoding ? <Loader /> : (

    <View style={{ flexDirection: "column" }}>

      <View>

        <Pressable
          style={styles.searchButton}
          onPress={() => navigation.navigate('Search Screen')}>


          <View>
            <Text style={styles.searchButtonText}>{location} </Text>
            <Text style={{ color: '#8d8d8d', fontSize: 14, paddingLeft: 10, }}>{maxDays} days | {maxGuest} Guests | {day1.slice(5,10)} - {day2.slice(5,10)}</Text>
          </View>

          <Fontisto style={{ justifyContent: 'flex-end', paddingLeft: 80, }} name="player-settings" size={16} color={'#030f14'} />
        </Pressable>

      </View>

      <View style={{ marginTop: 60 }} >

        {/* {accomodations.map(item =>{
              <StayComponent stay={item}/>

            })} */}

        <FlatList style={{ marginTop: 25 }}
          data={accomodations}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

      </View>

    </View>


  );
};



export default StayListScreen;
