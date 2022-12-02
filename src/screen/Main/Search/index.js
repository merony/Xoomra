import {
    Button,
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Entype from 'react-native-vector-icons/Entypo';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import searchSugg from '../../../data/search';
import styles from './styles';
import GooglePlaceAutoCompleteItem from '../../../components/GooglePlaceAutoComplete';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const SearchScreen = ({navigation, props}) => {

    const [inpuText, setInputText] = useState('');
    const [maxStay, setMaxStay] = useState(0);
    const [maxGuest, setMaxGuest] = useState(0);

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const [longitude,setLongitude] = useState(-79.3840939)
    const [latitude,setLatitude] = useState(43.6534829)

    const [region,setRegion] = useState(
      {latitude: 43.6534829,
      longitude: -79.3840939,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421}
    )

    let stayAddress

    const updateCoordinates = (details) =>{
      setRegion(
        {latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421}
      )

      setLatitude(details.geometry.location.lat)
      setLongitude(details.geometry.location.lng)

      stayAddress={
        lat:details.geometry.location.lat,
        lng:details.geometry.location.lng,
        address:details.formatted_address,
        house:details.address_components[0].long_name,
        street:details.address_components[1].long_name,
        city:details.address_components[4].long_name,
        state:details.address_components[5].long_name,
        country:details.address_components[6].long_name,
      }

      console.log(stayAddress)


    }


      
    return (

           <View style ={styles.container}>


            <View style={{width:'100%'}}>

            <View style={{width:'100%',marginTop:50}}>
                <MapView 
                  style={{width:'100%',height:250}} 
                  
                  region={region}>
                  
                  <Marker 
                    coordinate={{latitude:latitude,longitude:longitude}}
                    description=''>
                    
                  </Marker>
                    
                </MapView>
                  
              </View>

            <View style={{width:'100%',height:350,position:'absolute',top:0,left:0}}>
              <GooglePlacesAutocomplete
                style={{width:'100%',height:500}}
                placeholder='Search'
                fetchDetails={true}
                onPress={(data, details = null) => {
                  // console.log(
                  //   `lat: `,details.geometry.location.lat,`\n`,
                  //   `lng: `,details.geometry.location.lng,`\n`,
                  //   `address: `,details.formatted_address,`\n`,
                  //   `house #: `,details.address_components[0].long_name,`\n`,
                  //   `street: `,details.address_components[1].long_name,`\n`,
                  //   `city: `,details.address_components[4].long_name,`\n`,
                  //   `state: `,details.address_components[5].long_name,`\n`,
                  //   `country: `,details.address_components[6].long_name,);
                    updateCoordinates(details)
                }}
                query={{
                  key: 'AIzaSyCvKybLVxh-zJhh82UhEu31jITa_BNB2zI',
                  language: 'en',
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

       


      <View style ={styles.searchRow}>

          <View >
            <Text style={{fontWeight: 'bold'}} >Stay</Text>
            <Text style={{color: '#8d8d8d', fontSize: 14 }}>Max days of stay</Text>

          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              onPress={() => setMaxStay(Math.max(0, maxStay - 1))}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>-</Text>
            </Pressable>

            <Text style={{marginHorizontal: 20, fontSize: 16}}>{maxStay}</Text>

            <Pressable
              onPress={() => setMaxStay(maxStay + 1)}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>+</Text>
            </Pressable>
          </View>

      </View>


      <View style ={styles.searchRow}>


          <View>
            <Text style={{fontWeight: 'bold'}}>Guest</Text>
            <Text style={{color: '#8d8d8d', fontSize: 14 }}>Number of Guest</Text>
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


      <View style ={styles.searchRow}>


<View>
  <Text style={{fontWeight: 'bold'}}>Date Range</Text>
  <Text style={{color: '#8d8d8d', fontSize: 14 }}>When do you want to visit?</Text>
</View>
<View style={{flexDirection: 'row', alignItems: 'center'}}>


  <Text onPress={() => setOpen(true)} style={{marginHorizontal: 20, fontSize: 16}}>Select Date</Text>


          <DatePicker
        modal
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

</View>

</View>

<TouchableOpacity onPress={() => navigation.navigate('Stay List')} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Find stay</Text>
            </TouchableOpacity>


            




          
       

  </View>
        
       
    );
  };
  
 
  
  export default SearchScreen;
