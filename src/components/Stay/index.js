import {Image, Pressable, Text, View} from 'react-native';

import React from 'react';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';

const StayComponent = (props) => {



  const stays= props.stay;
  console.log("hello", stays);

  const navi = useNavigation()
  const navigateToStayDetails = () =>{
    navi.navigate('StayDetailsScreen',{id:stays.id})
  }

  
  
    return (
        <Pressable 
        onPress={navigateToStayDetails}
        style = {styles.container}>
             {/*Photos*/}
            {/* <Image style={styles.Image}
            source={require('../../Image/post.jpg')}
            /> */}

            <Image style={styles.Image}
            source={{uri: stays.image}}
            />

          
            {/*Title*/}
            <Text style={styles.stayTtile}>{stays.title}</Text>
              {/*Location*/}
              <Text style={styles.stayLocations}>{stays.location}</Text>
            {/*Exchange From : Vacouver BC Canada*/}
           
              {/*Accomodation Type*  <Text style={styles.stayLocations}>Exchange : Vacouver BC Canada</Text>/}
            {/*Max Night*/}
            <Text style={styles.stayTtile}>{stays.maxGuest} Guests | {stays.type} | {stays.maxNights} Nights  </Text>


        



          </Pressable>
        
    );
  };
  
 
  
  export default StayComponent;
