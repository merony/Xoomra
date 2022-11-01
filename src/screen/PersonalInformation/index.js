import {
    FlatList,
    Image,
    Pressable,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import { TextInput,ScrollView } from 'react-native-gesture-handler';
import { RotateInUpLeft } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth'
import styles from './styles';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-date-picker';





const PersonalInformationScreen = ({navigation, props}) => {



  const [firstNameFromUI,setFirstNameFromUI] = useState("")
  const [lastNameFromUI,setLastNameFromUI] = useState("")
  const [genderFromUI,setGenderFromUI] = useState("")
  const [dateOfBirthFromUI,setDateOfBirthFromUI] = useState("")
  const [streetFromUI,setStreetFromUI] = useState("")
  const [houseNumberFromUI,setHouseNumberFromUI] = useState("")
  const [cityFromUI,setCityFromUI] = useState("")
  const [countryFromUI,setCountryFromUI] = useState("")
  const [postalCodeFromUI,setPostalCodeFromUI] = useState("")
  const [mobileNumberFromUI,setMobileNumberFromUI] = useState("")



    return (

      <SafeAreaView style={{flex: 1, flexDirection: "column"}}>
         <StatusBar/>
        <View >
            <Image style={{ justifyContent: 'flex-start', width: 395, height: 200, marginTop: 0, paddingTop: 0}} source={require('../../Image/login-image.png')}/>
        </View>
        <ScrollView>
        
          <View style={{ justifyContent: 'center', marginTop: 15, paddingTop: 0, marginLeft: 15, marginRight: 15}} > 

            <Text style={styles.headerTitle}>Personal Information</Text>
          
            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='person' size={18} color='#283239' />
            <TextInput placeholder='First Name' style = {styles.formInput} 
              value={firstNameFromUI} onChangeText={setFirstNameFromUI}/>
            </View>
            
            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='person' size={18} color='#283239' />
            <TextInput placeholder='Last Name' style = {styles.formInput}
              value={lastNameFromUI} onChangeText={setLastNameFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='person' size={18} color='#283239' />
            <TextInput placeholder='Gender' style = {styles.formInput}
              value={genderFromUI} onChangeText={setGenderFromUI}/>
            </View>

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='date-range' size={18} color='#283239' />
            <TextInput placeholder='Date Of Birth DD/MM/YYYY' style = {styles.formInput}
              value={dateOfBirthFromUI} onChangeText={setDateOfBirthFromUI}/>
            </View>

            
            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='house' size={18} color='#283239' />
            <TextInput placeholder='Street' style = {styles.formInput}
              value={streetFromUI} onChangeText={setStreetFromUI}/>
            </View>

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='house' size={18} color='#283239' />
            <TextInput placeholder='Appartment / House Number' style = {styles.formInput}
              value={houseNumberFromUI} onChangeText={setHouseNumberFromUI}/>
            </View>

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='house' size={18} color='#283239' />
            <TextInput placeholder='City' style = {styles.formInput}
              value={cityFromUI} onChangeText={setCityFromUI}/>
            </View>

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='house' size={18} color='#283239' />
            <TextInput placeholder='Country' style = {styles.formInput}
              value={countryFromUI} onChangeText={setCountryFromUI}/>
            </View>

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='house' size={18} color='#283239' />
            <TextInput placeholder='Postal Code' style = {styles.formInput}
              value={postalCodeFromUI} onChangeText={setPostalCodeFromUI}/>
            </View>


            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='settings-cell' size={18} color='#283239' />
            <TextInput placeholder='Mobile Number' style = {styles.formInput}
              value={mobileNumberFromUI} onChangeText={setMobileNumberFromUI}/>
            </View>

            
            
            <TouchableOpacity style = {styles.customBTN}>
                <Text style={styles.textBTN}>Submit</Text>
            </TouchableOpacity>

           

          </View>
        
          </ScrollView>
      </SafeAreaView>
        
       
    );
  };
  
 
  
  export default PersonalInformationScreen;