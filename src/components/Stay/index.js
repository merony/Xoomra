import {Image, Pressable, Text, View} from 'react-native';
import { useEffect, useState } from 'react';

import React from 'react';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';

const StayComponent = (props) => {



  const stays= props.stay;
  

  const images =  props.stay.images ;

  const wantToGo =  props.stay.WantToGo




  //  const images = stays.stays.images

// console.log("Another Image Test", images?images:"no image");

  // images.map((image)=>{
  //   console.log("Single Image",image);
  // });

  // console.log("Our Image Test", stays.images);

  // console.log("Place Wan to Visit", wantToGo);

  // console.log("All Data", stays);

  console.log("Listing Is", stays.docID);



  const navi = useNavigation()
  const navigateToStayDetails = () =>{
    navi.navigate('StayDetailsScreen', {listingID: stays.docID, listingUID: stays.uid})
  }

  
  
    return (
        <Pressable 
        onPress={navigateToStayDetails}
        style = {styles.container}>
             {/*Photos*/}
            {/* <Image style={styles.Image}
            source={require('../../Image/post.jpg')}
            /> */}
            {
              images?
              images.map((image,index)=>{
                // console.log(image);
                if(index===1){
                  return (<Image key={index} style={styles.Image}
                    source={{uri: image}}
                />)
                }else{{}
                  return null
                }
                
               }):<Text></Text>
            }

            {/* <Image style={styles.Image}
            source={{uri: stays.images[0]}}
            // source={require('../../Image/post.jpg')}
            /> */}

          
            {/*Title*/}
            <Text style={styles.stayTtile}>{stays.City} {stays.State}</Text>
              {/*Location*/}
            

            {/* {
              wantToGo?
              wantToGo.map((destinationCity,index)=>{
                console.log('Desnintion city', destinationCity);
                if(index==="City"){
                  return (<Text key={index} style={styles.stayLocations}> Test </Text>)
                }else{
                  return null
                }
                
               }):<Text>loading...</Text>
            } */}
            
              

              {/* <Text style={styles.stayLocations}>{stays.Address}</Text> */}
            {/*Exchange From : Vacouver BC Canada*/}
           
              {/*Accomodation Type*  <Text style={styles.stayLocations}>Exchange : Vacouver BC Canada</Text>/}
            {/*Max Night*/}
            <Text style={styles.stayTtile}>{stays.StayTitle} </Text>
            <Text style={styles.stayTtile}>{stays.maxGuest} Guests | {stays.AccommodationType} | {stays.maxAvailableDays} Nights  </Text>



          </Pressable>
        
    );
  };
  
 
  
  export default StayComponent;
