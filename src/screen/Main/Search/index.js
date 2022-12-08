import {
Image,
Pressable,
Text,
TouchableOpacity,
View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import GooglePlaceAutoCompleteItem from '../../../components/GooglePlaceAutoComplete';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

const SearchScreen = ({ navigation, props }) => {

  const [inpuText, setInputText] = useState('');
  const [maxStay, setMaxStay] = useState(0);
  const [maxGuest, setMaxGuest] = useState(0);

  const [address, setAddress] = useState('');
  const [house, setHouse] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');



  //checkin
  const [date1, setDate1] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  //checkout
  const [date2, setDate2] = useState(new Date());
  const [open2, setOpen2] = useState(false);

  const destinationObject = {
    lat:latitude,
    lng:longitude,
    address:address,
    house:house,
    street:street,
    city:city,
    state:state,
    country:country,
    maxStay:maxStay,
    maxGuest:maxGuest,
    date1:date1,
    date2:date2,
  }

  const [longitude, setLongitude] = useState(-79.3840939)
  const [latitude, setLatitude] = useState(43.6534829)

  const [region, setRegion] = useState(
    {
      latitude: 43.6534829,
      longitude: -79.3840939,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  )
  const destinationKey = 'destinationKey'
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(destinationKey, jsonValue)

    } catch (e) {
      console.log(`save error`)
      // saving error
    }
  }


  const getData = async () => {
    try {
      console.log(`read success`)
      const jsonValue = await AsyncStorage.getItem(destinationKey)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
      
    } catch (e) {
      // error reading value
      console.log(`read error`)
    }
  }



  // let stayAddress
  const updateCoordinates = (details) => {
    setRegion(
      {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    )

    setLatitude(details.geometry.location.lat)
    setLongitude(details.geometry.location.lng)
    setAddress(details.formatted_address)
    setHouse(details.address_components[0].long_name)
    setStreet(details.address_components[1].long_name)
    setCity(details.address_components[4].long_name)
    setState(details.address_components[5].long_name)
    setCountry(details.address_components[6].long_name)

    storeData(destinationObject)

  }

  const findStayPressed = () => {
    storeData(destinationObject).then((i)=>{getData().then((temp) =>{console.log(temp)})})

    // getData().then((temp) =>{console.log(temp)})
    navigation.navigate('Stay List')
  }



  return (

    <View style={styles.container}>


      <View style={{ width: '100%' }}>

        <View style={{ width: '100%', marginTop: 50 }}>
          <MapView
            style={{ width: '100%', height: 250 }}

            region={region}>

            <Marker
              coordinate={{ latitude: latitude, longitude: longitude }}
              description=''>
            </Marker>

          </MapView>

        </View>

        <View style={{ width: '100%', height: 350, position: 'absolute', top: 0, left: 0 }}>
          <GooglePlacesAutocomplete
            style={{ width: '100%', height: 500 }}
            placeholder='Search'
            fetchDetails={true}
            onPress={(data, details = null) => {

              updateCoordinates(details);

            }}
            query={{
              key: 'AIzaSyCvKybLVxh-zJhh82UhEu31jITa_BNB2zI',
              language: 'en',
              components: 'country:ca'
            }}
          />
        </View>





      </View>

      {/* <TextInput style={styles.formInput} 
            placeholder="Type Destination"
            value={inpuText}
            onChangeText={setInputText}
            />

            <FlatList
            data={searchSugg}
            renderItem={({item}) => (
            
            <View style={styles.row}>
                <View style ={styles.iconContainer}>
                    <Entype name={"location-pin"} size={30} color='#283239' />
                    
                    </View>

                    <Text style ={styles.locationText}>{item.description}</Text>
            </View>
            )} /> */}




      <View style={styles.searchRow}>

        <View >
          <Text style={{ fontWeight: 'bold' }} >Stay</Text>
          <Text style={{ color: '#8d8d8d', fontSize: 14 }}>Max days of stay</Text>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable
            onPress={() => { setMaxStay(Math.max(0, maxStay - 1)) ;storeData(destinationObject)}}
            style={styles.button}>
            <Text style={{ fontSize: 20, color: '#474747' }}>-</Text>
          </Pressable>

          <Text style={{ marginHorizontal: 20, fontSize: 16 }}>{maxStay}</Text>

          <Pressable
            onPress={() => { setMaxStay(maxStay + 1) ;storeData(destinationObject)}}
            style={styles.button}>
            <Text style={{ fontSize: 20, color: '#474747' }}>+</Text>
          </Pressable>
        </View>

      </View>


      <View style={styles.searchRow}>


        <View>
          <Text style={{ fontWeight: 'bold' }}>Guest</Text>
          <Text style={{ color: '#8d8d8d', fontSize: 14 }}>Number of Guest</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable
            onPress={() => { setMaxGuest(Math.max(0, maxGuest - 1)) ;storeData(destinationObject)}}
            style={styles.button}>
            <Text style={{ fontSize: 20, color: '#474747' }}>-</Text>
          </Pressable>

          <Text style={{ marginHorizontal: 20, fontSize: 16 }}>{maxGuest}</Text>

          <Pressable
            onPress={() => { setMaxGuest(maxGuest + 1);storeData(destinationObject) }}
            style={styles.button}>
            <Text style={{ fontSize: 20, color: '#474747' }}>+</Text>
          </Pressable>
        </View>

      </View>


      <View style={styles.searchRow}>


        <View>
          <Text style={{ fontWeight: 'bold' }}>Date Range</Text>
          <Text style={{ color: '#8d8d8d', fontSize: 14 }}>When do you want to visit?</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>


          <Text onPress={() => setOpen1(true)} style={{ marginHorizontal: 2, fontSize: 16 }}>{date1.toString().slice(4, 10)}</Text>
          <DatePicker
            modal
            open={open1}
            date={date1}
            onConfirm={(date) => {
              setOpen1(false)
              setDate1(date)
              storeData(destinationObject)
            }}
            onCancel={() => {
              setOpen1(false)
            }}
          />

          <Text> - </Text>
          <Text onPress={() => setOpen2(true)} style={{ marginHorizontal: 2, fontSize: 16 }}>{date2.toString().slice(4, 10)}</Text>
          <DatePicker
            modal
            open={open2}
            date={date1}
            onConfirm={(date) => {
              setOpen2(false)
              setDate2(date)
              storeData(destinationObject)
            }}
            onCancel={() => {
              setOpen2(false)
            }}
          />
        </View>

      </View>

      <TouchableOpacity onPress={() => findStayPressed()} style={styles.customBTN}>
        <Text style={styles.textBTN}>Find stay</Text>
      </TouchableOpacity>










    </View>


  );
};



export default SearchScreen;
