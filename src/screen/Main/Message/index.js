import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ExchangeDB, usersDB} from '../../../data/firRef';
import {cAccommodationsDB, cMessagesDB, cUserDB} from '../../../data/firCuRef';
import {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatListItem from '../../../components/ChatListItem';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {GoogleSocialButton} from 'react-native-social-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import chats from '../../../data/chats';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';

const MessageScreen = ({navigation, props, route}) => {
  const [messages, setMessages] = useState([]);
  const [exchangeData, setExchangeData] = useState([]);
  const [myUserData, setMyUserData] = useState([]);
  const [hostUserData, setHostUserData] = useState([]);
  const [myAccomodation, setMyAccomodation] = useState([]);
  const [hostAccomodations, setHostAccomodations] = useState([]);

  getMessages = async () => {
    await cMessagesDB.get().then(querySnapshot => {
      // console.log(' Current mesage data 1 ', querySnapshot);
      // console.log('Total Documents: ', querySnapshot.size);

     

      const messageListing = [];
      const exchange = [];
      const users = [];

       // 1. Step 1. get all reciver message id from message database push it to users array 
         //and send the list to function get user data  getHostUserData(users);
      querySnapshot.forEach(async doc => {
        users.push(
          doc
            .data()
            .users.filter(elem => elem !== auth().currentUser.uid)
            .toString(),
        );

        messageListing.push(doc.data());
        exchange.push((await ExchangeDB.doc(doc.id).get()).data());

     
      });

      

      try {
        // Block of code to try
       
        setMessages(messageListing);
        setExchangeData(exchange);
        // 1. Step 2 store it to hostUserData state
        getHostUserData(users);

      } catch (err) {
        console.log('data are not set', err);
      }
    });
  };

  // const usersData = [];

    // 1. Step 3 host ysers data from database annd save it to  hostUserData state

  const getHostUserData = async otherUsers => {
   
    if (otherUsers.length !== 0) {
      // console.log('Other user for loop id', otherUsers);

      otherUsers.forEach(async elem => {
        // console.log('this for loop lopp working');
        usersDB.doc(elem).onSnapshot(documentSnapshot => {
          console.log('User data document shop: ', documentSnapshot.data());

          hostUserData.push(documentSnapshot.data());
          setHostUserData([...hostUserData]);

          // (await ExchangeDB.doc(MESSAGE ID).collection(auth().currentUser.uid).doc('other user listing id').get()).data());
        });

    
      });

    } else {
      console.log('User Data doesnot exist');
    }


    await cAccommodationsDB.get().then(querySnapshot => {
      // console.log('No. of current user listings', querySnapshot.size);

      const otherUsersListingsId = [];

      querySnapshot.forEach(async doc => {


        messages.forEach(elem => {
          elem.listings?.forEach(e => {
            if (e !== doc.data().docID) {
              otherUsersListingsId.push({
                listingId: e,
                exchangeId: elem.exchangeID.trim(),
                uid: elem.users.filter(
                  eee => eee !== auth().currentUser.uid,
                )[0],
              });
            }
          });

        });


      });

      console.log('other listing', otherUsersListingsId )



      otherUsersListingsId.forEach(async Elem => {
        // console.log('this is otherUsersListingsId elem ', Elem);
        const data = (
          await ExchangeDB.doc(Elem.exchangeId)
            .collection(auth().currentUser.uid)
            .doc(Elem.listingId)
            .get()
        ).data();

        const user = hostUserData.find(ele => ele.uid === Elem.uid);

         console.log('data.user find same  id', user)

        // console.log('data.checkInDate', data.checkInDate)

        hostAccomodations.push({
          listingId: Elem.listingId,
          messageId: Elem.exchangeId,
          hostingId: user.uid,
          StayTitle: data.StayTitle,
          checkInDate: data.checkInDate,
          checkOutDate: data.checkOutDate,
          username: user.firstName,
          picture: user?.photo,
        });

      
        setHostAccomodations([...hostAccomodations]);
        console.log('this is accomodatin data', hostAccomodations);

     
      });
    });


  };

  useEffect(() => {
    //Runs on every render
    // test();
  });

  useEffect(() => {
    //Runs only on the first render+

    getMessages().then(() => {
      // getMessages().then(()=>{
      //   // getMessages();
      // });
    });
  }, []);

  const checkData = () => {
    // console.log('All Host users data', hostUserData);

    //   console.log('All exchange data', exchangeData);s

    // console.log('All Chat message data', messages);

    // console.log('All Host Accomodation data', hostAccomodations);
  };

  return (
    <View>
      <View style={{paddingLeft: 20}}>
        <Text style={styles.title}>Inbox</Text>
      </View>


      {checkData()}

      {hostUserData.length ? (
        <FlatList
          data={hostAccomodations}
          renderItem={({item}) => <ChatListItem chat={item} />}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default MessageScreen;
