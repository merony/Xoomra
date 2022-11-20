import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    ScrollView,
    View,
    Alert
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {cUserDB, profilesDB, usersDB, verificationsDB} from '../../data/firRef';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import styles from './styles';

const VerificationScreen = ({navigation, props}) => {
    

    const [photoID,setPhotoID] = useState(null)
    const [proofOfAddress,setProofOfAddress] = useState(null)
    const [userWithID,setUserWithID] = useState(null)


      const capturePhotoID = () =>{
    
        ImagePicker.openCamera({
          cropping: true,
        }).then(image => {
          setPhotoID(image)
        });
        }

      const captureProofOfAddress = () =>{
    
        ImagePicker.openCamera({
          cropping: true,
        }).then(image => {
          setProofOfAddress(image)
        });
        }

      const captureUserWithID = () =>{
    
          ImagePicker.openCamera({
            cropping: true,
          }).then(image => {
            setUserWithID(image)
          });
          }
    
    
      

      const submit = async () => {

        const photoIDUri = photoID.path
        const proofOfAddressUri = proofOfAddress.path
        const userWithIDUri = userWithID.path

        let IDFileName = photoIDUri.substring(photoIDUri.lastIndexOf('/')+ 1)
        let AddressFileName = proofOfAddressUri.substring(proofOfAddressUri.lastIndexOf('/')+ 1)
        let userWithIDFileName = userWithIDUri.substring(userWithIDUri.lastIndexOf('/')+ 1)

        if (photoID === null || proofOfAddress === null || userWithID === null){

          Alert.alert('Please upload all required documents to submit')

        }
        else{

        

        try {
      
          await storage().ref(IDFileName).putFile(photoIDUri);
          await storage().ref(AddressFileName).putFile(proofOfAddressUri);
          await storage().ref(userWithIDFileName).putFile(userWithIDUri);

          usersDB.doc(auth().currentUser.uid).update({
            
            isVerified: true
            
            })

          navigation.replace("TabNavigator")
          
        } catch (e) {
          console.log(e);
          
        }
      
      }
        }

    return (

      <View style={{flexDirection: "column", justifyContent: 'center', marginTop: 15, paddingTop: 0, marginLeft: 15, marginRight: 15}}>
        <ScrollView>
          <Text style={{fontWeight:'600',fontSize:18,color:'#0999f4',margin:10}}>Please Upload the Following Documents</Text>

          {/* Photo Identification */}
          <View style={{flexDirection:"column",margin:10,borderBottomColor:'gray',borderBottomWidth:1}}>

            <View style={{flexDirection:'row'}}>
              <View style={{flex:1,justifyContent:'flex-start'}}>
                <Text style={{color:'#283239', fontWeight: '300'}}>Photo Identification</Text>
              </View>
              <TouchableOpacity  onPress={capturePhotoID}>
                <Text style={{color:'#0999f4', fontWeight: '500'}}> Choose </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',marginVertical:20}}>
              {photoID !== null && <Image source={{uri:photoID.path}} style={{  width: 150,height: 150,borderColor: 'gray',borderWidth:0.5,resizeMode:'contain'}} />}  
            </View>

          </View>

          {/* Proof of Address */}

          <View style={{flexDirection:"column",margin:10,borderBottomColor:'gray',borderBottomWidth:1}}>

            <View style={{flexDirection:'row'}}>
              <View style={{flex:1,justifyContent:'flex-start'}}>
                <Text style={{color:'#283239', fontWeight: '300'}}>Proof of Address</Text>
              </View>
              <TouchableOpacity  onPress={captureProofOfAddress}>
                <Text style={{color:'#0999f4', fontWeight: '500'}}> Choose </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',marginVertical:20}}>
              {proofOfAddress !== null && <Image source={{uri:proofOfAddress.path}} style={{  width: 150,height: 150,borderColor: 'gray',borderWidth:0.5,resizeMode:'contain'}} />}  
            </View>
     
          </View>

          {/* User with Photo ID */}

          <View style={{flexDirection:"column",margin:10,borderBottomColor:'gray',borderBottomWidth:1}}>

            <View style={{flexDirection:'row'}}>
              <View style={{flex:1,justifyContent:'flex-start'}}>
                <Text style={{color:'#283239', fontWeight: '300'}}>User with Photo ID</Text>
              </View>
              <TouchableOpacity  onPress={captureUserWithID}>
                    <Text style={{color:'#0999f4', fontWeight: '500'}}> Choose </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',marginVertical:20}}>
              {userWithID !== null && <Image source={{uri:userWithID.path}} style={{  width: 150,height: 150,borderColor: 'gray',borderWidth:0.5,resizeMode:'contain'}} />}  
            </View>

          </View>
          <TouchableOpacity onPress={submit} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Submit</Text>
          </TouchableOpacity>

      </ScrollView>
    </View>
        
       
    );
  };
  
 
  
  export default VerificationScreen;