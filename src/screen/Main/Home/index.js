import { AccommodationsDB, cUserDB, usersDB } from '../../../data/firRef';
import {
    FlatList,
    Image,
    ImageBackground,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo'
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

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
   * LTI update could not be added via codemod */

   // <Entype name={"home"} size= {24}/>
   //  <GoogleSocialButton onPress={() => {}}  />
  
  
  
  const HomeScreen = ({navigation, props}) => {

    const [accomodations, setAccomodations] = useState([]);
    const [laoding, setLoading] = useState(false);

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
            console.log(doc.id, " => ", doc.data());
  
            listings.push(doc.data());
            setLoading(false)
  
  
          });
  
  
          setAccomodations(listings);
  
          
        });
  
  
  
  
      console.log(" my Data=> ", accomodations);
  
  
    }
  



    const renderItem = ({ item }) => (
      // <Item title={item.title} />
      <StayComponent stay={item}/>
    );

  
    return (
      
        <View >

            {/* Search Bar*/}
            <Pressable
        style={styles.searchButton}
        onPress={() => navigation.navigate('Search Screen')}>
        <Fontisto name="search" size={20} color={'#0999f4'} />
        <Text style={styles.searchButtonText}>Where are you going?</Text>
      </Pressable>

            <ImageBackground source={require('../../../Image/Welcome-Image.jpg')} style={styles.Image}>
            {/*  Title*/}

           

            <View style = {{flexDirection: 'row', marginTop: 100,}}>
            <Text style = {{ fontWeight: 'bold', color: 'white', marginLeft: 45, fontSize: 16, height: 40, }}>Go Near</Text>
            <TouchableOpacity
          style={{ backgroundColor: '#0999f4',
          width: 200,
          height: 40,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: "black",
          marginTop: -10,
          marginLeft: 10,}}
          onPress={() => console.warn('Explore Btn clicked')}>
          <Text style={styles.buttonText}>Explore Nearby Stays</Text>
        </TouchableOpacity>

            </View>


            </ImageBackground>

            <FlatList
        data={accomodations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
           



          </View>
        
       
   
    );
  };
  
 
  
  export default HomeScreen;