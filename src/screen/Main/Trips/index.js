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
import { MyAccommodationsDB } from '../../../data/firRef';
import React from 'react';
import auth from '@react-native-firebase/auth'
import chats from '../../../data/chats';
import { cos } from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';
import places from '../../../data/stayFeed';
import styles from './styles';

const TripsScreen = ({navigation, props}) => {
  const dummyDataGuest = chats[0].user
  const dummyDataHost = chats[1].user
  const dummyDataStay = places[0]
  const dummyDataStay1 = places[1]
  const dummyDataStay2 = places[2]
  const dummyDataStay3 = places[3]

  let exchangeDoc = null
  let exchangeDocID = null
  let MyTripAccomodation = null
  let guestListingID = null
  let guestLisitng = null
  let visitorAccomodation = null
  let VisitorUserID = null
  let myListingID = null
  let MyAccomodation = null
  let myAccomodationData = null
  let visitorAccomodationData = null
  let array1 = []
  let array2 = []

  const [myTripsData,setMyTripsData] = useState([])
  const [visitorTripsData,setVisitorTripsData] = useState([])
  
  

  const [dummyDataDataUsername,setDummyDataDataUsername] = useState(dummyDataGuest.name)
  const tabPressed1 = () =>{
    setDummyDataDataUsername(dummyDataGuest.name)
  }
  const tabPressed2 = () =>{
    setDummyDataDataUsername(dummyDataHost.name)
  }

  useEffect(() => {
    //Runs only on the first render
    getData()
   
  }, []);

  const getCheckinDate = (input) => {
   
    const date = new Date(input?.checkOutDate?.seconds*1000);
    const options = {   year: 'numeric', month: 'long', day: 'numeric' };
    const today = date.toLocaleDateString('en-US', options);
    // console.log('What day is it', today);

    // console.log ('consol', myExchnageListing?.checkOutDate?.seconds)

    return today;
  }

  const getCheckOutDate = input => {
   
    const date = new Date(input?.checkInDate?.seconds*1000);
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    const today = date.toLocaleDateString('en-US', options);
    // console.log('What day is it', today);

    return today;
  }

  const getData = async()=>{

    try {
    const data =  await firestore()
    .collection('Exchanges')
    .where( 'users', 'array-contains', auth().currentUser.uid).get()
    .then(querySnapshot => {
      console.log('Query lenght',querySnapshot.docs.length)

      

      exchangeDoc = querySnapshot.docs[0].data()
      exchangeDocID = querySnapshot.docs[0].data().exchangeID


      VisitorUserID = exchangeDoc.users.filter(
        eee => eee !== auth().currentUser.uid,
      )[0]
      console.log('filter',VisitorUserID)

    })

    
      
    MyTripAccomodation = (await firestore().collection('Exchanges').doc(exchangeDocID).collection(auth().currentUser.uid).get()).docs[0].data()
    visitorAccomodation = (await firestore().collection('Exchanges').doc(exchangeDocID).collection(VisitorUserID).get()).docs[0].data()

    array1 = MyTripAccomodation
    array2 = visitorAccomodation

    guestListingID = MyTripAccomodation.listingID  
    myListingID = MyTripAccomodation.guestListingID

    guestLisitng = (await MyAccommodationsDB.doc(guestListingID).get()).data()
    MyAccomodation = (await MyAccommodationsDB.doc(myListingID).get()).data()

       myAccomodationData = {
      title: array1.StayTitle,
      hostedBy: array1.hostName,
      checkIn: getCheckinDate(array1),
      checkOut: getCheckOutDate(array1),
      photo: guestLisitng.images[0],
    }

    visitorAccomodationData = {
      title: array2.StayTitle,
      hostedBy: array2.hostName,
      checkIn: getCheckinDate(array2),
      checkOut: getCheckOutDate(array2),
      photo: MyAccomodation.images[0],
    }




    setMyTripsData([...myAccomodationData])
    setVisitorTripsData([...visitorAccomodationData])
    }
    catch(error) {
      console.log(error)

    }

    console.log('exchange doc',exchangeDoc)
    console.log('My Trip Accomodation',MyTripAccomodation)
    console.log('Guest listing id', guestListingID)
    console.log('guest Listing info', guestLisitng)
    console.log('Visitor accomo',visitorAccomodation)
    console.log('My Lisitng',MyAccomodation)
    console.log('data to display',myTripsData)
    console.log('visitor data to display',visitorTripsData)
    console.log(myAccomodationData)
    console.log(visitorAccomodationData)

    


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