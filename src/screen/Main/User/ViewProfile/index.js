import {
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import places from '../../../../data/stayFeed';
import chats from '../../../../data/chats';
import ReviewListItem from '../../../../components/ReviewListItem';

const ViewProfileScreen = ({navigation, props}) => {

  const dummyDataUserProfile = 
    {
      name:'John Lukas',
      image:'https://dw9to29mmj727.cloudfront.net/properties/2016/2830-SeriesThumb_NARSHP_400x320.jpg',
      overAllRating:4.92,
      reviews:['2','312','231'],
      phoneNumber:'12345',
      FacebookU:'www.facebook.com',
      Intrests:'If you decide to go this route, you’ll need to submit a letter of interest to the desired company (along with your fine-tuned resume). Read on for a concise definition and find out how to write a letter of interest for a job. We’ve also included some successful letter of interest samples.',
      Languages:['Albanian','Shanghaiese','Southern Quechua'],
      LinkedinURL:'www.linkin.com',
      aboutYourSelf:'Many companies don’t advertise all of their positions externally. It can be worthwhile to submit an application to a company that isn’t in the midst of hiring. There’s a chance they may need your expertise, and you may even be the perfect fit.',
      email:'rafikk@gmail.com',
      isProfileCompleted:true,
      uid:"DVH5oztnIZZIwHOsBg4iulEd3q82"
    }
  const dummyDataReviews = chats
  const dummyDataUserListing = places[0]

  const returnLanguage = (arrOfLanguages) =>{
    let temp

    if(arrOfLanguages.length===0){
      temp=''
    }else if(arrOfLanguages.length===1){
      temp = `Speaks ${arrOfLanguages[0]}`
    }else{
      temp = `Speaks ${arrOfLanguages[0]}`
      for(let i = 1;i<arrOfLanguages.length;i++){
        if(i === (arrOfLanguages.length-1)){
          temp = temp.slice(0,temp.length) + ` and ${arrOfLanguages[i]}.`
        }else{
          temp +=  `, ` 
          temp+= `${arrOfLanguages[i]}`
        }
      }
    }

    return temp
  }
  const ReturnVerifiedUser = (propsV) =>{
    let temp
    if(propsV.isVerified){
      temp = 
        <View style={styles.subContainer1}>
          <MaterialIcons name='verified-user' size={18} color={'blue'} style={{paddingTop:6}}/>
          <Text style={styles.stayDetailsSubTitle}>Verified user </Text>
        </View>
    }else{
      temp = null
    }

    return temp
  }
  const ReturnIdentity = (propsI) =>{
    let temp
    if(propsI.isVerified){
      temp =
      <View style={styles.subContainer1}>
        <Fontisto name="check" size={12} color={'blue'} style={{paddingTop:6,paddingLeft:2}} />
        <Text style={styles.stayDetailsSubTitle}>Identity </Text>
      </View>
    }else{
      temp = null
    }

    return temp
  }
  const ReturnEmail = (propsE) =>{
    let temp
    if(propsE.email!==''){
      temp =
        <View style={styles.subContainer1}>
          <Fontisto name="check" size={12} color={'blue'} style={{paddingTop:6,paddingLeft:2}} />
          <Text style={styles.stayDetailsSubTitle}>Email address </Text>
        </View>
    }else{
      temp = null
    }

    return temp
  }
  const ReturnPhone = (propsP) =>{
    let temp
    if(propsP.phone!==""){
      temp =
      <View style={styles.subContainer1}>
        <Fontisto name="check" size={12} color={'blue'} style={{paddingTop:6,paddingLeft:2}} />
        <Text style={styles.stayDetailsSubTitle}>Phone number </Text>
      </View>
    }else{
      temp = null
    }

    return temp
  }

  return (
    <View style={{flexDirection: "column"}}>
      <ScrollView style={{paddingHorizontal:20}}>
        {/* personal info container */}
        <View style={styles.subContainer2}>

          <Image 
            source={{uri:dummyDataUserProfile.image}}
            style={styles.image}/>

          <Text style={styles.name}>Hi, I'm{dummyDataUserProfile.name}</Text>

          <Text>{returnLanguage(dummyDataUserProfile.Languages)}</Text>

          <View style={styles.subContainer1}>
            <Fontisto name="check" size={12} color={'blue'} style={{paddingTop:6,paddingLeft:2}} />
            <Text style={styles.stayDetailsSubTitle}>Superhost </Text>
          </View>

          <View style={styles.subContainer1}>
            <Fontisto name="star" size={15} color={'blue'} style={{paddingTop:6,paddingLeft:2}} />
            <Text style={styles.stayDetailsSubTitle}>{dummyDataUserProfile.reviews.length} reviews </Text>
          </View>

          <ReturnVerifiedUser isVerified={dummyDataUserProfile.isProfileCompleted} />

        </View>

        {/* verification container */}
        <View style={styles.subContainer2}>

          <Text style={styles.name1}>{dummyDataUserProfile.name} confimed</Text>

          <ReturnIdentity isVerified={dummyDataUserProfile.isProfileCompleted}/>

          <ReturnEmail email={dummyDataUserProfile.email}/>

          <ReturnPhone phone={dummyDataUserProfile.phoneNumber}/>

        </View>

        {/* listing container */}
        <View style={styles.subContainer2}>

          <Text style={styles.name1}>{dummyDataUserProfile.name}'s' listing</Text>

          {/* image */}
          <Image style={styles.image1}source={{uri: dummyDataUserListing.image}}/>

          {/* title */}
          <Text style={styles.stayDetailsSubTitle1}>{dummyDataUserListing.title}</Text>

          {/* location */}
          <Text style={styles.stayDetailsSubTitle1}>{dummyDataUserListing.location}</Text>
        </View>

        {/* reviews container */}
        <View style={styles.subContainer2}>
          <Text style={styles.name1}>{dummyDataReviews.length} reviews</Text>
          {/* review container */}
          <View style={styles.listContainer1}>

            <FlatList
              data={dummyDataReviews}
              renderItem={({item}) => <ReviewListItem review={item} />}
            />
          </View>

        </View>


      </ScrollView>

    </View>
      
      
  );
  };
  
 
  
  export default ViewProfileScreen;