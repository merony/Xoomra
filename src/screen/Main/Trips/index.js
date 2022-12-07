import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import chats from '../../../data/chats';
import {myExchangeDB} from '../../../data/firCuRef';
import places from '../../../data/stayFeed';
import styles from './styles';

const TripsScreen = ({navigation, props}) => {
  const dummyDataGuest = chats[0].user
  const dummyDataHost = chats[1].user
  const dummyDataStay = places[0]
  const dummyDataStay1 = places[1]
  const dummyDataStay2 = places[2]
  const dummyDataStay3 = places[3]

  const [dummyDataDataUsername,setDummyDataDataUsername] = useState(dummyDataGuest.name)
  const tabPressed1 = () =>{
    setDummyDataDataUsername(dummyDataGuest.name)
  }
  const tabPressed2 = () =>{
    setDummyDataDataUsername(dummyDataHost.name)
  }

  const exchangeList = []

  useEffect(() => {
    //Runs on every render
    // test();
  });

  useEffect(() => {
    //Runs only on the first render+


    loadData()



  }, []);


  const loadData =async () =>{

   
    const exchangeAccomodation = []
    const otherExchangegAccomodation = []

    try {

      await myExchangeDB.get().then(querySnapshot => { 


        querySnapshot.forEach(async doc => {

          exchangeList.push(doc.data())

        })

        console.log ('Exchange List', exchangeList[0])




      })


    } catch (exception) {
      console.log(exception);
    }

    
  }

  const dummyDataTrips = [
    {
      stay:dummyDataStay,
      checkInDate:'12-10-2022',
      checkOutDate:'12-15-2022',
      host:dummyDataHost,
      guest:dummyDataGuest,
      // status:upcoming,ongoing,Completed,cancelled
      status:'upcoming'
    },
    {
      stay:dummyDataStay1,
      checkInDate:'12-10-2022',
      checkOutDate:'12-15-2022',
      host:dummyDataHost,
      guest:dummyDataGuest,
      // status:upcoming,ongoing,Completed,cancelled
      status:'ongoing'
    },
    {
      stay:dummyDataStay2,
      checkInDate:'12-10-2022',
      checkOutDate:'12-15-2022',
      host:dummyDataHost,
      guest:dummyDataGuest,
      // status:upcoming,ongoing,Completed,cancelled
      status:'completed'
    },
    {
      stay:dummyDataStay3,
      checkInDate:'12-10-2022',
      checkOutDate:'12-15-2022',
      host:dummyDataHost,
      guest:dummyDataGuest,
      // status:upcoming,ongoing,Completed,cancelled
      status:'cancelled'
    }
  ]

  const tripFilter = (tripStatus) =>{
    let temp
    temp = dummyDataTrips.find(i => i.status === tripStatus) ?? null
    return temp
  }

  const ReturnGuestSegments = () =>{
    let tempRGS = <View></View>

    let UpcomingComponent
    let OngoingComponent
    let CompletedComponent
    let CancelledComponent


    if(tripFilter('upcoming') !== null){
      const tempStay = tripFilter('upcoming')
      UpcomingComponent = 
      <View style={styles.container1}>

        <Text 
          style={styles.segmentTitle}>
          Upcoming
        </Text>

        {/* single trip Container */}
        <View style={styles.singleTripContainer}>
          <Image 
            source={{uri:tempStay.stay.image}}
            style={styles.image}/>
          <View style={styles.rowContainer}>
            <Text style={styles.subTitle2} numberOfLines={2}>{tempStay.stay.title}</Text>
            <Text>Hosted by {tempStay.host.name}</Text>
            <View style={styles.datesContainer}>
              <Text>{tempStay.checkInDate}</Text>
              <Text> - </Text>
              <Text>{tempStay.checkOutDate}</Text>
            </View>
          </View>
        </View>

      </View>
    }else{
      UpcomingComponent = 
      <View>

      </View>
    }

    if(tripFilter('ongoing') !== null){
      const tempStay = tripFilter('ongoing')
      OngoingComponent = 
      <View style={styles.container1}>

        <Text 
          style={styles.segmentTitle}>
          Ongoing
        </Text>

        {/* single trip Container */}
        <View style={styles.singleTripContainer}>
          <Image 
            source={{uri:tempStay.stay.image}}
            style={styles.image}/>
          <View style={styles.rowContainer}>
            <Text style={styles.subTitle2} numberOfLines={2}>{tempStay.stay.title}</Text>
            <Text>Hosted by {tempStay.host.name}</Text>
            <View style={styles.datesContainer}>
              <Text>{tempStay.checkInDate}</Text>
              <Text> - </Text>
              <Text>{tempStay.checkOutDate}</Text>
            </View>
          </View>
        </View>

      </View>
    }else{
      OngoingComponent = 
      <View>

      </View>
    }

    if(tripFilter('completed') !== null){
      const tempStay = tripFilter('completed')
      CompletedComponent = 
      <View style={styles.container1}>

        <Text 
          style={styles.segmentTitle}>
          Completed
        </Text>

        {/* single trip Container */}
        <View style={styles.singleTripContainer}>
          <Image 
            source={{uri:tempStay.stay.image}}
            style={styles.image}/>
          <View style={styles.rowContainer}>
            <Text style={styles.subTitle2} numberOfLines={2}>{tempStay.stay.title}</Text>
            <Text>Hosted by {tempStay.host.name}</Text>
            <View style={styles.datesContainer}>
              <Text>{tempStay.checkInDate}</Text>
              <Text> - </Text>
              <Text>{tempStay.checkOutDate}</Text>
            </View>
          </View>
        </View>

      </View>
    }else{
      CompletedComponent = 
      <View>

      </View>
    }

    if(tripFilter('cancelled') !== null){
      const tempStay = tripFilter('cancelled')
      CancelledComponent = 
      <View style={styles.container1}>

        <Text 
          style={styles.segmentTitle}>
          Cancelled
        </Text>

        {/* single trip Container */}
        <View style={styles.singleTripContainer}>
          <Image 
            source={{uri:tempStay.stay.image}}
            style={styles.image}/>
          <View style={styles.rowContainer}>
            <Text style={styles.subTitle2} numberOfLines={2}>{tempStay.stay.title}</Text>
            <Text>Hosted by {tempStay.host.name}</Text>
            <View style={styles.datesContainer}>
              <Text>{tempStay.checkInDate}</Text>
              <Text> - </Text>
              <Text>{tempStay.checkOutDate}</Text>
            </View>
          </View>
        </View>

      </View>
    }else{
      CancelledComponent = 
      <View>

      </View>
    }

    tempRGS = 
    <View>
      {UpcomingComponent}
      {OngoingComponent}
      {CompletedComponent}
      {CancelledComponent}
    </View> 

    return tempRGS

  }

  const ReturnHostSegments = () =>{
    let tempRGS = <View></View>

    let UpcomingComponent
    let OngoingComponent
    let CompletedComponent
    let CancelledComponent


    if(tripFilter('upcoming') !== null){
      const tempStay = tripFilter('upcoming')
      UpcomingComponent = 
      <View style={styles.container1}>

        <Text 
          style={styles.segmentTitle}>
          Upcoming
        </Text>

        {/* single trip Container */}
        <View style={styles.singleTripContainer}>
          <Image 
            source={{uri:tempStay.guest.image}}
            style={styles.image}/>
          <View style={styles.rowContainer}>
            <Text style={styles.subTitle2} numberOfLines={2}>{tempStay.stay.title}</Text>
            <Text>Guest: {tempStay.guest.name}</Text>
            <View style={styles.datesContainer}>
              <Text>{tempStay.checkInDate}</Text>
              <Text> - </Text>
              <Text>{tempStay.checkOutDate}</Text>
            </View>
          </View>
        </View>

      </View>
    }else{
      UpcomingComponent = 
      <View>

      </View>
    }

    if(tripFilter('ongoing') !== null){
      const tempStay = tripFilter('ongoing')
      OngoingComponent = 
      <View style={styles.container1}>

        <Text 
          style={styles.segmentTitle}>
          Ongoing
        </Text>

        {/* single trip Container */}
        <View style={styles.singleTripContainer}>
          <Image 
            source={{uri:tempStay.guest.image}}
            style={styles.image}/>
          <View style={styles.rowContainer}>
            <Text style={styles.subTitle2} numberOfLines={2}>{tempStay.stay.title}</Text>
            <Text>Guest: {tempStay.guest.name}</Text>
            <View style={styles.datesContainer}>
              <Text>{tempStay.checkInDate}</Text>
              <Text> - </Text>
              <Text>{tempStay.checkOutDate}</Text>
            </View>
          </View>
        </View>

      </View>
    }else{
      OngoingComponent = 
      <View>

      </View>
    }

    if(tripFilter('completed') !== null){
      const tempStay = tripFilter('completed')
      CompletedComponent = 
      <View style={styles.container1}>

        <Text 
          style={styles.segmentTitle}>
          Completed
        </Text>

        {/* single trip Container */}
        <View style={styles.singleTripContainer}>
          <Image 
            source={{uri:tempStay.guest.image}}
            style={styles.image}/>
          <View style={styles.rowContainer}>
            <Text style={styles.subTitle2} numberOfLines={2}>{tempStay.stay.title}</Text>
            <Text>Guest: {tempStay.guest.name}</Text>
            <View style={styles.datesContainer}>
              <Text>{tempStay.checkInDate}</Text>
              <Text> - </Text>
              <Text>{tempStay.checkOutDate}</Text>
            </View>
          </View>
        </View>

      </View>
    }else{
      CompletedComponent = 
      <View>

      </View>
    }

    if(tripFilter('cancelled') !== null){
      const tempStay = tripFilter('cancelled')
      CancelledComponent = 
      <View style={styles.container1}>

        <Text 
          style={styles.segmentTitle}>
          Cancelled
        </Text>

        {/* single trip Container */}
        <View style={styles.singleTripContainer}>
          <Image 
            source={{uri:tempStay.guest.image}}
            style={styles.image}/>
          <View style={styles.rowContainer}>
            <Text style={styles.subTitle2} numberOfLines={2}>{tempStay.stay.title}</Text>
            <Text>Guest: {tempStay.guest.name}</Text>
            <View style={styles.datesContainer}>
              <Text>{tempStay.checkInDate}</Text>
              <Text> - </Text>
              <Text>{tempStay.checkOutDate}</Text>
            </View> 
          </View>
        </View>

      </View>
    }else{
      CancelledComponent = 
      <View>

      </View>
    }

    tempRGS = 
    <View>
      {UpcomingComponent}
      {OngoingComponent}
      {CompletedComponent}
      {CancelledComponent}
    </View> 

    return tempRGS
  }

  const ReturnSegments = () =>{
    let temp
    if(dummyDataDataUsername===dummyDataGuest.name){
      //return guest tab
      temp =
       <View>

        <View style={styles.subTabMenu}>

          <Text 
            style={styles.tabMenuTitleFocused}
            onPress={tabPressed1}>
              My Trip
          </Text>

          <Text 
            style={styles.tabMenuTitle}
            onPress={tabPressed2}>
              Vistors
          </Text>

        </View>

        {/* segments */}
        <View>
          <ReturnGuestSegments />
        </View>
       </View>
    }else{
      // return host tab
      temp = 
      <View>
        <View style={styles.subTabMenu}>
        <Text 
          style={styles.tabMenuTitle}
          onPress={tabPressed1}>
            My Trip
        </Text>
        <Text 
          style={styles.tabMenuTitleFocused}
          onPress={tabPressed2}>
            Vistors
        </Text>
      </View>
        {/* segments */}
        <View>
          <ReturnHostSegments />
        </View>
      </View>
    }

    return temp
  }

    return (

      <ScrollView style={{flexDirection: "column",marginHorizontal:20}}>
        <Text style={styles.title}>Trips</Text>

        <ReturnSegments/>

      </ScrollView>
        
       
    );
  };
  
 
  
  export default TripsScreen;