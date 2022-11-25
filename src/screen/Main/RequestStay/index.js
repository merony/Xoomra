import {AccommodationsDB, ExchangeDB, MessagesDB} from '../../../data/firRef';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {cAccommodationsDB, cUserDB} from '../../../data/firCuRef';
import {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from '../../../components/Divider/index';
import DividerWide from '../../../components/DividerWide';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {GoogleSocialButton} from 'react-native-social-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LongTextComponent from '../../../components/longText/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import places from '../../../data/stayFeed';
import styles from './styles';
import {useRoute} from '@react-navigation/native';

const RequestStayScreen = ({navigation, props, route}) => {
  const [selfIntroduction, setSelfIntroduction] = useState('');
  const [adults, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  const [exchageDocID, getExchageDocID] = useState('');

  const [myAccomodation, setMyAccomodation] = useState([]);


  console.log('Test Log', auth().currentUser.uid);

  const getMyListingID = async () => {
    // const data =
    //  await firestore()
    //   .collection('Accommodations')
    //   // .where( "uid", "==", auth().currentUser.uid)
    //   .get()
    //   // .data()
    // await firestore()
    //   .collection('Accommodations')
    //   .get()

    //   // .then(documentSnapshot => {
    //     console.log('Data exists: ', data);

    //     if (data.exists) {
    //       console.log('Data: ', documentSnapshot.data());
    // }
    // });

    // setAccomodation(data);

    // if (data) {
    //   console.log('Current user listing', data);
    // } else {
    //   console.log('data does not exist');
    // }
    const listings = [];

    await cAccommodationsDB.get()
     .then(querySnapshot => {

      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, 'this is doc id  => ', doc.data());

        listings.push(doc.data());

      });

    });

    const filteredData = listings.filter(elem => {
      return auth().currentUser.uid === elem.uid;
    });


    setMyAccomodation(listings[0].docID)

    console.log(' to see if its work here ', myAccomodation);

    console.log(' to see if its work here ', listings);

    
  };

  getMyListingID();
  //get id, check in and out date

  // const stays = places.find(place => place.id === route.params.id)

  const {stays, checkInDate, checkOutDate, totalNights} = route.params;
  console.log('previos screen data => ', stays);

  const [descriptionFolded, setDescriptionFolded] = useState(true);
  const onDescriptionPressed = () => {
    if (descriptionFolded) {
      setDescriptionFolded(false);
    } else {
      setDescriptionFolded(true);
    }
  };

  const onReservePressed = () => {
    Alert.alert('Your request has been sent to host!');

    setExchange();
  };

  const setExchange = async () => {
    ExchangeDB.add({
      exchangeCompleted: false,
      status: 'Ongoing',
      users: [auth().currentUser.uid, stays.uid],
      listings: [stays.docID, myAccomodation ],
      created_at: new Date() ,
    })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);

        getExchageDocID(docRef.id);

        const addUsers = async (exchageDocID) => {
          console.log('Stays DOC ID: ', stays.docID);

          await ExchangeDB.doc(exchageDocID)
            .collection(auth().currentUser.uid)
            .doc(stays.docID)
            .set({
              listingID: stays.docID,
              uid: stays.uid,
              guestID: auth().currentUser.uid,
              checkInDate:  new Date(checkInDate) ,
              checkOutDate:  new Date(checkOutDate) ,
              status: 'Interested',
            });

          await ExchangeDB.doc(exchageDocID)
            .collection(stays.uid)
            .doc(myAccomodation)
            .set({
              listingID: myAccomodation,
              uid: auth().currentUser.uid,
              guestID: stays.uid,
              checkInDate: null,
              checkOutDate: null,
              status: null,
            });

          await ExchangeDB.doc(exchageDocID).update({
            exchangeID: exchageDocID,
          });


          await MessagesDB.doc(exchageDocID).set({
            users: [auth().currentUser.uid, stays.uid],
            listings: [stays.docID, myAccomodation ],
            created_at: new Date() ,
          }).then (async () =>{

            await MessagesDB.doc(exchageDocID)
            .collection('Message')
            .add({

              created_at: new Date() ,
              exchangeID: exchageDocID,
              fromID: auth().currentUser.uid,
              toID: stays.uid,
              text: selfIntroduction,


            });
          })

            


          
        };

        addUsers(docRef.id);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  };

  return (
    <View>
      <Text style={styles.headerTitle}>Request Exchange</Text>

      <ScrollView style={{flexDirection: 'column', margin: 20}}>
        <View style={{flexDirection: 'row', paddingLeft: 10}}>
          <Image style={styles.hostImage} source={{uri: stays?.images?.[0]}} />

          <View>
            <Text style={styles.title} numberOfLines={5}>
              {stays.StayTitle}
            </Text>
            <Text style={styles.stayDetailsSubTitle}>
              {stays.AccommodationType}
            </Text>
            <Text style={styles.stayDetailsSubTitle}>{stays.City}</Text>
          </View>
        </View>

        {/* <DividerWide/> */}
        <Divider />
        <Text style={styles.stayDetailsTitle}>Your Trip</Text>

        {/* <Text style={styles.requestSubtitle}>Dates</Text> */}
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.stayTtile}>
            {route.params.checkInDate.getFullYear()}-
            {route.params.checkInDate.getMonth() + 1}-
            {route.params.checkInDate.getDate()}
          </Text>
          <Text style={styles.stayTtile}> - </Text>
          <Text style={styles.stayTtile}>
            {route.params.checkOutDate.getFullYear()}-
            {route.params.checkOutDate.getMonth() + 1}-
            {route.params.checkOutDate.getDate()}
          </Text>
        </View>
        {/* <Text style={styles.stayTtile}>Nights: {route.params.totalNights}</Text> */}

        {/* <Text style={styles.requestSubtitle}>Guests</Text> */}

        {/* <DividerWide/> */}
        <Divider />

        {/* <Text style={styles.stayTtile}>{stays.location}</Text> */}

        <View style={{width: '98%', paddingLeft: '2%'}}>
          <TextInput
            placeholder="Tell the host more about yourself and your trip?"
            style={styles.formInput}
            multiline={true}
            value={selfIntroduction}
            onChangeText={setSelfIntroduction}
          />
        </View>
        {/* <DividerWide/> */}
        <Divider />

        <Text style={styles.stayDetailsTitle}>How This Works</Text>

        <Text style={styles.empty}></Text>

        <Text style={styles.stayDetailsSubTitle} numberOfLines={3}>
          You will be able to confirm an exchange when host accepts your
          request.
        </Text>
        {/* <Text style={styles.stayDetailsSubTitle}>2. Host accepts request</Text>
     <Text style={styles.stayDetailsSubTitle}>3. Guest confirms request</Text> */}

        <Divider />

        {/* <Text style={styles.stayTtile}>cancellation policy</Text>
     <Pressable onPress={onDescriptionPressed} style={{margin:10}}>
     <LongTextComponent  data = {[stays,descriptionFolded]} />
     </Pressable> */}

        <TouchableOpacity onPress={() => Alert.alert('policy link')}>
          <Text
            style={{color: '#0999f4', fontWeight: '500', textAlign: 'center'}}>
            {' '}
            Cancellation Policy
          </Text>
        </TouchableOpacity>
        <Text style={styles.empty}></Text>

        <Pressable style={styles.customBTN} onPress={onReservePressed}>
          <Text style={styles.textBTN}>SEND REQUEST</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default RequestStayScreen;
