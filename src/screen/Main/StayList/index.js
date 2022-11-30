import { AccommodationsDB, cUserDB, usersDB } from '../../../data/firRef';
import {
  Alert,
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
import Loader from '../../../components/Loader/Loader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import StayComponent from '../../../components/Stay';
import { TextInput } from 'react-native-gesture-handler';
import stayFeed from '../../../data/stayFeed';
import styles from './styles';
import MapView from 'react-native-maps';

const StayListScreen = ({ navigation, props }) => {


  const [accomodations, setAccomodations] = useState([]);
  const [laoding, setLoading] = useState(false);
  const [showList,setShowList] = useState(true)


  useEffect(() => {
    //Runs on every render

    // test();


  });


  useEffect(() => {
    //Runs only on the first render
    loadData();
  }, []);


  loadData = async () => {
    setLoading(true)
    const listingData = await AccommodationsDB.get()
      .then((querySnapshot) => {

        const listings = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log('AccommodationsDB  =>', doc.data());

          listings.push(doc.data());
          setLoading(false)
        });


        setAccomodations(listings);

        // console.log( " Data=> ", accomodations);
      });
  }


  const renderItem = ({ item }) => (
    // <Item title={item.title} />
    <StayComponent stay={item} />
  );

  const tabListPressed = () =>{

    setShowList(true)

  }

  const tabMapPressed = () =>{
    setShowList(false)
  }

  const ReturnTabMenu = () =>{
    let temp
    if(showList){
      temp =           
      <View style={styles.subTabMenu}>
        <Text 
          style={styles.tabMenuTitleFocused}
          onPress={tabListPressed}>List</Text>
        <Text 
          style={styles.tabMenuTitle}
          onPress={tabMapPressed}
          >Map</Text>
      </View>
    }else{
      temp = 
      <View style={styles.subTabMenu}>
      <Text 
        style={styles.tabMenuTitle}
        onPress={tabListPressed}>List</Text>
      <Text 
        style={styles.tabMenuTitleFocused}
        onPress={tabMapPressed}
        >Map</Text>
    </View>
    }
    return temp
  }
  
  const ReturnTab = () =>{
    let temp
    if(showList){
      temp =         
      <FlatList style={{ marginTop: 25 }}
      data={accomodations}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
    }else{
      temp = 
      <View>
        <MapView
          style={{width:'100%',height:'100%'}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    }
    return temp
  }

  return laoding ? <Loader /> : (

    <View style={{ flexDirection: "column" }}>

      <View>

        <Pressable
          style={styles.searchButton}
          onPress={() => navigation.navigate('Search Screen')}>


          <View>
            <Text style={styles.searchButtonText}>Location Name </Text>
            <Text style={{ color: '#8d8d8d', fontSize: 14, paddingLeft: 10, }}>3days | 2 Guest | Oct22 - Dec25</Text>
          </View>

          <Fontisto style={{ justifyContent: 'flex-end', paddingLeft: 80, }} name="player-settings" size={16} color={'#030f14'} />
        </Pressable>

      </View>

      <View style={{ marginTop: 60 }} >

        <ReturnTabMenu/>

        <ReturnTab/>


      </View>

    </View>


  );
};



export default StayListScreen;
