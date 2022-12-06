import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {cUserDB, cprofileDB} from '../../../../data/firCuRef';
import { useEffect, useState } from 'react';

import {AccommodationsDB,MyAccommodationsDB} from '../../../../data/firRef';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreviewStayDetailsComponent from '../../../../components/PreviewStayDetails';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

const PreviewListingScreen = ({navigation, props, route}) => {
    
  const {listingID} = route.params;

  const getListingID = listingID;

  console.log( " Doc Id :", listingID);

  

   const [accomodation, setAccomodation] = useState([]);
   const [personalData,setPersonalData] = useState([])

   const [profileData,setProfileData] = useState([])


   useEffect(() => {
    //Runs on every render
    // test();
  });


  useEffect(() => {
    //Runs only on the first render
  
    loadData(getListingID)
    .then(() => {

      console.log( " Accomodation Second=> ", accomodation);

     });


  
    }, []);




loadData = async(getListingID) => {

  const listingData = await MyAccommodationsDB.doc(getListingID).get()
  .then((querySnapshot) => {

    setAccomodation(querySnapshot.data())

    console.log( " Accomodation First=> ", accomodation);
   
});

const userData = await cprofileDB.get()
.then((querySnapshot) => {

  setPersonalData(querySnapshot.data())

});

const userProfileData = await cUserDB.get()
.then((querySnapshot) => {

  setProfileData(querySnapshot.data())
 
});




 }


const savePressed = () => {


  MyAccommodationsDB.doc(getListingID).update({
    Status : 'published',

  })
  .then (() => {


    navigation.navigate("Manage Listing")

    
  })


  
}



    return (

               <View  > 
               
                <PreviewStayDetailsComponent profileDatas={profileData} personalDatas={personalData} stays={accomodation}/>

                <View style= {{ flexDirection: "column", padding: 20, justifyContent: 'flex-end', backgroundColor: '#fff'}} >
              <TouchableOpacity onPress={savePressed} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Published Now</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { navigation.navigate("MyListingNav")}} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Published Later</Text>
            </TouchableOpacity>
            </View>

           

            
          </View>

    
        
       
    );
  };
  
 
  
  export default PreviewListingScreen;