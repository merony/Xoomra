import {ExchangeDB, usersDB} from '../../../data/firRef';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const [chat, setChat] = useState([]);
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
      querySnapshot.forEach(async doc => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, 'this Message id  => ', doc.data());

        // const otherUserId = chat[0].users.filter(
        //   elem => elem !== auth().currentUser.uid,
        // );

        // console.log(
        //   ' Message data  =>',
        //   doc.data().users.filter(elem => elem !== auth().currentUser.uid).toString(),
        // );

        users.push(
          doc
            .data()
            .users.filter(elem => elem !== auth().currentUser.uid)
            .toString(),
        );

        messageListing.push(doc.data());
        exchange.push((await ExchangeDB.doc(doc.id).get()).data());

        // await usersDB.get().then(qSnapshot => {
        //   qSnapshot.forEach(async data => {
        //     // console.log("usrs",data.data());
        //     users.push(await data.data());
        //   });
        // });
        // console.log(
        //   ' Exchange data  =>',
        //   (await ExchangeDB.doc(doc.id).get()).data(),
        // );

        // const userID = doc
        //   .data()
        //   .users.filter(elem => elem !== auth().currentUser.uid);

        // usrIds.push(userID[0]);
        // console.log('users data1', userID);

        // users.push(await usersDB.doc(userID).get());
      });

      // usrIds.forEach(async elem => {
      //   users.push(await usersDB.doc(elem).get()).data();
      // });

      // console.log('users', users);
      // console.log('exchange data', exchange);
      // console.log( 'exchange ids', exchange.length);

      // console.log( 'message ids', messageListing);

      try {
        // Block of code to try

        setChat(messageListing);
        setExchangeData(exchange);
        getHostUserData(users);

        // console.log('listing aexc data', exchangeData);

        // const otherUserId = exchangeData[0].users.filter(
        //   elem => elem !== auth().currentUser.uid,
        // );

        // console.log('other user ', otherUserId);

        // console.log('exchange data', exchange);

        // console.log( 'CHATS CHATS', chat[0].users.indexOf(auth().currentUser.uid));

        // console.log('CHATS CHATS', chat[0].users);

        // const filteredData = chat.filter(elem => {
        //   return auth().currentUser.uid === elem.users;
        // });
      } catch (err) {
        console.log('data are not set', err);
      }
    });
  };

  const getHostUserData = async otherUsers => {
    console.log('Other user id', otherUsers);
    const usersData = [];
    // users.push((await usersDB.doc(userID).get()).data());
    // await usersDB.doc(userID).get().data()

    // await usersDB.doc(id).get()

    // const userDocument =  (usersDB.doc(id[0])).data();

    if (otherUsers.length !== 0) {
      console.log('Other user for loop id', otherUsers);

      otherUsers.forEach(async elem => {
        usersDB.doc(elem).onSnapshot(documentSnapshot => {
          console.log('this lopp working');

          // console.log('User data document shop: ', documentSnapshot.data());
          usersData.push(documentSnapshot.data());
        });

        // await usersDB.doc(elem).get().then(querySnapshot => {

        //   usersData.push(querySnapshot.data());
        // })
      });

      console.log('User Data', usersData);
    } else {
      console.log('User Data doesnot exist');
    }

    if (usersData.length !== 0) {
      setHostUserData(usersData);

      console.log('user array data', usersData);
    } else {
      console.log('Host user data not exist');
    }

    try {
      // Block of code to try;;
    } catch (err) {
      console.log(err);
    }

    console.log('All users data', hostUserData);

    console.log('All exchange data', exchangeData);

    console.log('All Chat message data', chat);

    //   setHostUserData(documentSnapshot.data());
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

  return (
    <View>
      <View style={{paddingLeft: 20}}>
        <Text style={styles.title}>Inbox</Text>
      </View>

      <FlatList
        data={chats}
        renderItem={({item}) => <ChatListItem chat={item} />}
      />
    </View>
  );
};

export default MessageScreen;
