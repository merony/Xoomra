import {
  AppOpenAd,
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import {
Image,
Pressable,
SafeAreaView,
ScrollView,
Text,
TouchableOpacity,
View
} from 'react-native';
import { profilesDB, usersDB, verificationsDB } from '../../../../data/firRef';
import { useEffect, useState } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import auth from '@react-native-firebase/auth'
import styles from './styles';

const UserHomeScreen = ({navigation, props}) => {

const [firstName,setFirstName] = useState('')
const [lastName,setLastName] = useState('')
const [profilePicURL,setProfilePicURL] = useState('')
const [isVerified,setIsVerified] = useState(null)
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2853328535763437~6654218930';


  const getUserInfo = async () =>{

    // Getting Profile Info from Database 
    const userProfileInformation =  (await profilesDB.doc(auth().currentUser.uid).get()).data()
    setProfilePicURL(userProfileInformation.ProfilePic)
    
 
    // Getting Personal Info From Database
    const userPersonalInformation =  (await usersDB.doc(auth().currentUser.uid).get()).data()
    setFirstName(userPersonalInformation.firstName)
    setLastName(userPersonalInformation.lastName)

    const userVerificationInformation = (await verificationsDB.doc(auth().currentUser.uid).get()).data()
    setIsVerified(userVerificationInformation.isVerified)
    console.log('Verification',isVerified)
   
  }

  useEffect(() => {
    //Runs only on the first render
    getUserInfo()
  }, []);


    return (

      <SafeAreaView>

        <ScrollView >

        <View style ={styles.container}>

       
        <View >
                    <Pressable style={styles.row} onPress={() => {navigation.navigate(`View Profile`)}}>
                    <Image 
                      source={{uri:profilePicURL}} 
                      style={{width: 50, height: 50, borderRadius: 400/ 2}} />
                    <View>
                    <Text style ={styles.profileText}>{firstName} {lastName} </Text>

                    {!isVerified && 
                    <Pressable onPress={() => {navigation.navigate(`Verification Screen`)}}>
                    <Text style ={{fontWeight: '500', fontSize: 12,  paddingLeft : 10, paddingTop: 5}}>Unverified</Text>
                    </Pressable>
                    }
                    {isVerified && <Text style ={{color:'#0999f4', fontWeight: '500', fontSize: 12,  paddingLeft : 10, paddingTop: 5}}>Verified</Text>}

                    </View>
                    
                    <Text style={{fontWeight: '400', fontSize: 20,}} > > </Text>
                    </Pressable>

                 

                    <Pressable style={styles.row} onPress={() => {navigation.navigate(`View personal Information`)}}>
                    <Ionicons style ={{ marginLeft: 0, }} name={"person-outline"} size={20} color='#283239' />
                    <Text style ={styles.bodyText}>Personal Information</Text>
                    <Text style={{fontWeight: '400', fontSize: 20,}} > > </Text>
                    </Pressable>
                    
                    <Pressable style={styles.row} onPress={() => {navigation.navigate(`My Listing`)}}>
                    <Ionicons style ={{ marginLeft: 0, }} name={"home-outline"} size={20} color='#283239' />
                    <Text style ={styles.bodyText}>My Listings</Text>
                    <Text style={{fontWeight: '400', fontSize: 20,}} > > </Text>
                    </Pressable>

                    <Pressable style={styles.row} onPress={() => {navigation.navigate(`Help`)}}>
                    <Ionicons style ={{ marginLeft: 0, }} name={"help-circle-outline"} size={20} color='#283239' />
                    <Text style ={styles.bodyText}>Help</Text>
                    <Text style={{fontWeight: '400', fontSize: 20,}} > > </Text>
                    </Pressable>

                    <Pressable style={styles.row} onPress={() => {navigation.navigate(`Support`)}}>
                    <MaterialIcons style ={{ marginLeft: 0, }} name={"support-agent"} size={20} color='#283239' />
                    <Text style ={styles.bodyText}>Support</Text>
                    <Text style={{fontWeight: '400', fontSize: 20,}} > > </Text>
                    </Pressable>

                    <Pressable style={styles.row} onPress={() => {navigation.navigate(`Terms`)}}>
                    <Ionicons style ={{ marginLeft: 0, }} name={"list-circle-outline"} size={20} color='#283239' />
                    <Text style ={styles.bodyText}>Terms</Text>
                    <Text style={{fontWeight: '400', fontSize: 20,}} > > </Text>
                    </Pressable>

                   
            </View>

        <TouchableOpacity style={{justifyContent: 'flex-start',flexDirection: 'row',marginBottom:50}} onPress={() => {auth().signOut() && navigation.replace(`OnBoard`)}}>
        <Text style={{color:'#0999f4', fontWeight: '500', textDecorationLine: 'underline', paddingTop :50,}}>Log out</Text>
        </TouchableOpacity>

        </View>



        </ScrollView>

    
        <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>

            <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} />
    

          </View>
        
      </SafeAreaView>

    
        
       
    );
  };
  
 
  
  export default UserHomeScreen;