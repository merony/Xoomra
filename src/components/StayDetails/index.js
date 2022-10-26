import {Image, Pressable, Text, View} from 'react-native';

import React from 'react';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const StayDetailsComponent = (props) => {

  const [totalPrice,setTotalPrice] = useState(0)
  const [checkInDate,setcheckInDate] = useState(0)
  const [checkOutDate,setcheckOutDate] = useState(0)
  const [totalNights,settotalNights] = useState(0)


  const stays= props.stays;
  console.log("hello", stays);
 
  
    return (
        <View style = {styles.container}>
          {/* image */}
          <Image style={styles.Image}source={{uri: stays.image}}/>

          {/* title */}
          <Text style={styles.stayTtile}>{stays.title}</Text>

          {/* location */}
          <Text style={styles.stayLocations}>{stays.location}</Text>

          {/* limits */}
          <Text style={styles.stayTtile}>{stays.maxGuest} Guests | {stays.type} | {stays.maxNights} Nights  </Text>

          {/* description */}
          <Text style={styles.stayDescription}>{stays.description} </Text>
          <Text style={styles.stayDescription}>{stays.description} </Text>

          {/* map */}

          {/* host info */}

          {/* house rules */}

          {/* cancellation policy */}

          {/* availability area with date picker and total price calculator */}

          {/* total price and reserve button */}
          <View style={styles.reserveArea}>

          <Text>{totalPrice}</Text>

          <Pressable style={styles.customBTN}>
            <Text>RESERVE</Text>
          </Pressable>

          </View>


        </View>
        
    );
  };
  
 
  
  export default StayDetailsComponent;
