import { AccommodationsDB, cUserDB, profilesDB, usersDB } from '../../data/firRef';
import { Alert, Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import DatePicker from 'react-native-date-picker'
import DatePickerCheckOutComponent from '../DatePicker/indexCheckOut.js';
import DatePickerComponent from '../DatePicker/index.js';
import DateRangePicker from '../DateRangPicker/index.js';
import Divider from '../Divider/index.js';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ImageSlider } from "react-native-image-slider-banner";
import LongTextComponent from '../longText/index.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaxNightsWarning from '../MaxNightsWarning/index.js';
import React from 'react';
import RequestStayScreen from '../../screen/Main/RequestStay/index';
import styles from './styles.js';
import { AppOpenAd, InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize, } from 'react-native-google-mobile-ads';

// import ChevronRightIcon from '@mui/icons-material/ChevronRight';





const StayDetailsComponent = (props) => {
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date())
  const [totalNights, setTotalNights] = useState(0)
  const [descriptionFolded, setDescriptionFolded] = useState(true)
  const [ruleFolded, setRuleFolded] = useState(true)


  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2853328535763437~6654218930';

  const dummyDataForWantToGo = 'I would like to exchange with someone in Valencia, Spain.'
  const dummyDataForMaxNights = 6
  const dummyDataUserRating = 4.75
  const dummyDataSuperHostBar = 4.5
  const dummyDataHostName = 'John'

  const stays = props.stays;
  const personalData = props.personalDatas;
  const profileData = props.profileDatas;
  const images = stays.images;
  const myDestination = stays.WantToGo



  const modifiedArray = images?.map((item, index) => {
    return { img: item }
  })


  // console.log ('User Personal Information Data', personalData);

  console.log('User Accodmodation Data', stays.AccommodationDetails);
  console.log('User Personal Data', personalData);
  console.log('User profile Data', profileData.overallRatings);

  console.log('User wantso to go Data', myDestination);

  console.log('User Pictures Data', images);


  const data = [stays, descriptionFolded]
  const navi = useNavigation()
  const onDescriptionPressed = () => {
    if (descriptionFolded) {
      setDescriptionFolded(false)
    } else {
      setDescriptionFolded(true)
    }
  }
  const onRulePressed = () => {
    if (ruleFolded) {
      setRuleFolded(false)
    } else {
      setRuleFolded(true)
    }
  }

  const onReservePressed = () => {
    if (totalNights >= 1) {
      if (dummyDataForMaxNights >= totalNights) {
        navi.navigate('RequestStayScreen',
          {
            id: stays.id, checkInDate: checkInDate,
            checkOutDate: checkOutDate, totalNights: totalNights
          })
      } else {
        Alert.alert('max nights exceeded')
      }
    }
    else {
      Alert.alert('ERROR', 'Stay at least for 1 night to continue')
    }
  }
  const onHostPressed = () => {
    Alert.alert('navigate to host profile')
  }

  const calculateInNights = (inDate) => {
    let diff = checkOutDate.getTime() - inDate.getTime()
    let nights = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (nights <= 0) {
      nights = 0
    }
    setTotalNights(nights)
  }

  const calculateOutNights = (outDate) => {
    let diff = outDate.getTime() - checkInDate.getTime()
    let nights = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (nights < 0) {
      nights = 0
    }

    setTotalNights(nights)

  }





  useEffect(() => {
    //Runs on every render


  });


  useEffect(() => {
    //Runs only on the first render



  }, []);






  //if rating is better than 4.5, he is a super host
  const ReturnHostReviews = (propsR) => {
    const rating = propsR.rating
    const bar = propsR.bar

    let result
    if (rating >= bar) {
      result =
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <MaterialIcons name='star-rate' size={20} color={'#030f14'} style={{ paddingLeft: 10 }} />
          <Text style={styles.stayDetailsSubTitle}>{dummyDataUserRating.toFixed(2)} </Text>
          <Fontisto name="check" size={12} color={'#030f14'} style={{ paddingLeft: 20, paddingTop: 5 }} />
          <Text style={styles.stayDetailsSubTitle}>Superhost </Text>
        </View>
    } else {
      result =
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <MaterialIcons name='star-rate' size={20} color={'#030f14'} style={{ paddingLeft: 10 }} />
          <Text style={styles.stayDetailsSubTitle}>{dummyDataUserRating.toFixed(2)} </Text>
        </View>
    }
    return result
  }



  return (
    <View style={{ flexDirection: 'column' }}>
      <ScrollView style={styles.container}>

        {/* image */}
        {/* <Image style={styles.Image}source={{uri: stays.image}}/> */}



        <ImageSlider
          //   data={() =>{
          //     const arr = []
          //     images.map((image) => {
          //       return arr.push({'img': image} );
          //     }
          //     );
          //   }
          // }

          data={modifiedArray}
          autoPlay={false}
          onItemChanged={(item) => console.log("item", item)}
          closeIconColor="#fff"
          style={styles.Image}
        />
        {/* title */}
        <Text style={styles.stayDetailsTitle}>{stays.StayTitle}</Text>
        {/* location */}
        <Text style={styles.stayDetailsSubTitle}>{stays.City} {stays.State}</Text>
        <Divider />

        {/* host info area*/}
        <Pressable onPress={onHostPressed}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              {/* limits, type*/}
              <Text style={styles.stayDetailsHostTitle}>Hosted by {personalData.firstName} {personalData.lastName}  </Text>
              <ReturnHostReviews rating={profileData.overallRatings} bar={dummyDataSuperHostBar} />
            </View>
            <View>
              <Image style={styles.hostImage} source={{ uri: stays.image }} />
            </View>
          </View>
        </Pressable>
        <Divider />

        {/*Sleeping Arrangements area*/}
        <Pressable >
          <View style={styles.titleContainer}>
            <Text style={styles.stayDetailsTitle}>Sleeping Arrangements</Text>
          </View>
          <View style={styles.sleepContainer}>
            {/* type */}
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons name='local-hotel' size={20} color={'#030f14'} style={{ paddingLeft: 5 }} />
              <Text style={styles.stayDetailsSubTitle}> {stays.AccommodationType}  </Text>

            </View>
            {/* guest */}
            <View style={{ flexDirection: 'row' }}>
              <Fontisto name="person" size={18} color={'#030f14'} style={{ paddingLeft: 20 }} />
              <Text style={styles.stayDetailsSubTitle}>{stays.maxGuest} guests</Text>

            </View>
            {/* nights */}
            <View style={{ flexDirection: 'row' }}>
              <Fontisto name="night-clear" size={15} color={'#030f14'} style={{ paddingLeft: 30, paddingTop: 4 }} />
              <Text style={styles.stayDetailsSubTitle}>{stays.maxAvailableDays} nights</Text>
            </View>
          </View>
        </Pressable>
        <Divider />

        {/* Want to go  area*/}
        <Pressable >
          <View style={styles.titleContainer}>
            {/* <Fontisto name="list-2" size={18} color={'#030f14'} style={{paddingTop:5}} /> */}
            <Text style={styles.stayDetailsTitle}>Want To Go</Text>
          </View>


          {/* {
              myDestination?
              myDestination.map((destination,index)=>{
                // console.log(image);
                if(index=== "City"){
                  return (<Text key={index}> {destination}</Text>)
                }else{{}
                  return null
                }
                
               }):<Text></Text>
            } */}

          <LongTextComponent dataText={myDestination?.City + ' , ' + myDestination?.State + ' , ' + myDestination?.Country} />
          
          <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>

            <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} />
            {/* <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
            requestNonPersonalizedAdsOnly: true,
            }}
            /> */}

          </View>

          <Text
            numberOfLines={5}
            ellipsizeMode='tail'
            style={styles.stayDescription}>

          </Text>


          {/* <LongTextComponent data = {[{description:dummyDataForWantToGo},false]}/> */}
        </Pressable>
        <Divider />

        {/* Accommodation Details area */}
        <Pressable onPress={onDescriptionPressed}>

          <View style={styles.titleContainer}>
            <Text style={styles.stayDetailsTitle}>Accommodation Details</Text>
          </View>

          <LongTextComponent dataText={stays.AccommodationDetails} dataFold={descriptionFolded} />


        </Pressable>
        <Divider />


        {/* house rules */}
        {/* use description for now */}
        <Pressable onPress={onRulePressed}>
          <View style={styles.titleContainer}>
            {/* <Fontisto name="shield" size={25} color={'#030f14'} style={{paddingTop:5}}/> */}
            <Text style={styles.stayDetailsTitle}>House Rules</Text>
          </View>

          <LongTextComponent dataText={stays.HouseRules} dataFold={ruleFolded} />
        </Pressable>
        <Divider />

      </ScrollView>

      {/* reserve area*/}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center', marginLeft: 20, height: 70 }}>
        {/* date picker area */}
        <View style={styles.datePickerContainer}>
          <DatePickerComponent style={styles.datePickerComponent} setCDate={setCheckInDate} setCNights={calculateInNights} />
          <Text>-</Text>
          <DatePickerCheckOutComponent style={styles.datePickerComponent} setCDate={setCheckOutDate} setCNights={calculateOutNights} />
        </View>

        {/* reserve button area */}
        <Pressable style={styles.customBTN} onPress={onReservePressed}>
          <Text style={styles.textBTN}>Exchange Request</Text>
        </Pressable>
      </View>
    </View>
  );
};



export default StayDetailsComponent;
