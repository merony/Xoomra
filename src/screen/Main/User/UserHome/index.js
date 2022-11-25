import {
    Button,
    Dimensions,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { profilesDB,usersDB,verificationsDB} from '../../../../data/firRef';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'
import styles from './styles';

const UserHomeScreen = ({navigation, props}) => {

const [firstName,setFirstName] = useState('')
const [lastName,setLastName] = useState('')
const [profilePicURL,setProfilePicURL] = useState('')
const [isVerified,setIsVerified] = useState(null)


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
                    {!isVerified && <Text style ={{fontWeight: '500', fontSize: 12,  paddingLeft : 10, paddingTop: 5}}>Unverified</Text>}
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

        <TouchableOpacity style={{justifyContent: 'flex-start',flexDirection: 'row'}} onPress={() => {auth().signOut() && navigation.replace(`OnBoard`)}}>
        <Text style={{color:'#0999f4', fontWeight: '500', textDecorationLine: 'underline', paddingTop :50,}}>Log out</Text>
        </TouchableOpacity>

        </View>


        </ScrollView>

    
        
      </SafeAreaView>

    
        
       
    );
  };
  
 
  
  export default UserHomeScreen;