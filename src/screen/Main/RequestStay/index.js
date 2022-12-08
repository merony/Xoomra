import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ExchangeDB, MessagesDB,} from '../../../data/firRef';
import {cAccommodationsDB, cMessagesDB, cUserDB} from '../../../data/firCuRef';
import {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from '../../../components/Divider/index';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import {useRoute} from '@react-navigation/native';

const RequestStayScreen = ({navigation, props, route}) => {
  const [selfIntroduction, setSelfIntroduction] = useState('');
  const [adults, setAdult] = useState(0);
  const [children, setChildren] = useState(0);

  const [exchageDocID, getExchageDocID] = useState('');

  const [myAccomodation, setMyAccomodation] = useState([]);




  // console.log('Test Log', auth().currentUser.uid);

  getMyListingID = async () => {

    const listings = [];

    await cAccommodationsDB.get()
     .then(querySnapshot => {


      // console.log('Total Accomodation: ', querySnapshot.size)

      querySnapshot.forEach(doc => {


        listings.push(doc.data());

      });

    });

    const filteredData = listings.filter(elem => {
      return 'published' === elem.Status;
    });


    setMyAccomodation(filteredData[0])


  };

  getMyListingID();


  const {stays, checkInDate, checkOutDate, totalNights, personalData} = route.params;
  console.log('previos screen data => ', personalData.firstName);

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
      listings: [stays.docID, myAccomodation.uid ],
      created_at: new Date() ,
    })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);

        getExchageDocID(docRef.id);

        const addUsers = async (exchageDocID) => {
          console.log('Stays DOC ID: ', stays.docID);

         

          const myName =  (await cUserDB.get()).data()

          console.log('My First Name: ', myName.firstName);

          await ExchangeDB.doc(exchageDocID)
            .collection(auth().currentUser.uid)
            .doc(stays.docID)
            .set({
              guestListingID: myAccomodation.docID,
              listingID: stays.docID,
              StayTitle: stays.StayTitle,
              uid: stays.uid,
              hostName: personalData.firstName,
              guestID: auth().currentUser.uid,
              checkInDate:  new Date(checkInDate) ,
              checkOutDate:  new Date(checkOutDate) ,
              
              status: 'Interested',
            });

          await ExchangeDB.doc(exchageDocID)
            .collection(stays.uid)
            .doc(myAccomodation.docID)
            .set({
              guestListingID: stays.docID,
              listingID: myAccomodation.docID,
              StayTitle: myAccomodation.StayTitle,
              uid: auth().currentUser.uid,
              hostName: myName.firstName,
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
            listings: [stays.docID, myAccomodation.docID ],
            created_at: new Date() ,
            exchangeID: exchageDocID,
          }).then (async () =>{

            await MessagesDB.doc(exchageDocID)
            .collection('Message')
            .add({

              created_at: new Date() ,
              exchangeID: exchageDocID,
              fromID: auth().currentUser.uid,
              fromName: myName.firstName,
              toID: stays.uid,
              text: selfIntroduction,
              seen: false,


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
