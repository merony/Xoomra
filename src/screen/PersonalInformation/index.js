import {
    Alert,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {cUserDB, usersDB} from '../../data/firRef';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Entype from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import React from 'react';
import { RotateInUpLeft } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import search from '../../data/search';
import styles from './styles';

const PersonalInformationScreen = ({navigation, props}) => {

  const dob = new Date();
  const year = dob.getFullYear();
  const month = dob.getMonth();
  const day = dob.getDate();


  const [firstNameFromUI,setFirstNameFromUI] = useState("")
  const [lastNameFromUI,setLastNameFromUI] = useState("")
  const [genderFromUI,setGenderFromUI] = useState("")
  const [addressFromUI,setAddressFromUI] = useState("")
  const [mobileNumberFromUI,setMobileNumberFromUI] = useState("")
  const [emergencyEmailFromUI,setEmergencyEmailFromUI] = useState("")
  const [emergencyMobileFromUI,setEmergencyMobileFromUI] = useState("")
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const [selectedDOB,setSelectedDOB] = useState("Select Date Of Birth")
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState("");
  const [gender, setGender] = useState([
    {label: 'Male', value: 'Male'},{label: 'Female', value: 'Female'},
    {label: 'X', value: 'X'}]);




  useEffect(() => {
    //Runs on every render

    // test();
     
  });


  useEffect(() => {
    //Runs only on the first render


   
  }, []);


  const savePressed = async() => {

    
    const profilesCollection = await usersDB.where(`mobile`,`==`,mobileNumberFromUI).get()
    
    if (firstNameFromUI.length === 0  || lastNameFromUI.length === 0 ||  
        genderValue.length === 0  || addressFromUI.length === 0 ||
        mobileNumberFromUI.length === 0){

      Alert.alert('',"Please fill all Information")
    }


    else{

      
        if (profilesCollection.docs.length !== 0){
          Alert.alert('',"number already exists")
          setMobileNumberFromUI("")
          
        }
        else if(profilesCollection.docs.length === 0) {
          usersDB.doc(auth().currentUser.uid).update({
             
              firstName : firstNameFromUI,
              lastName : lastNameFromUI,
              gender : genderValue,
              DOB : selectedDOB,
              Address : addressFromUI,
              mobile : mobileNumberFromUI,
              emergencyMobile : emergencyMobileFromUI,
              emergencyEmail : emergencyEmailFromUI,
              isCompleted: true
              
              })
              console.log(auth().currentUser.uid)
              navigation.navigate('Profile Screen')

        }

      }

    }

    return (

       
          <View style={{ justifyContent: 'center', margin: 20,}} > 
            <Text style={styles.headerTitle}>Personal Information</Text>
            <ScrollView>
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

              <View style={styles.dropField}>
              <Fontisto style={{ paddingVertical: 17}} name='genderless' size={16} color='#283239' />
                <DropDownPicker style = {styles.dropInput}

                      open={genderOpen}
                      value={genderValue}
                      items={gender}
                      setOpen={setGenderOpen}
                      setValue={setGenderValue}
                      setItems={setGender}
                      multiple={false}
                      min={1}
                      placeholder={"Select Gender"}
                      // mode="SIMPLE"
                      // zIndex={1000}
                     
                      dropDownDirection="BOTTOM"
                      showBadgeDot={true}
                      textStyle={{
                        fontSize: 14,
                        opacity: 0.5
                      }}

                      dropDownContainerStyle={{
                        backgroundColor: "#fff",
                        width: 340,
                        borderWidth:0,
                        opacity: 1,
                        zIndex: -999
                       
            
                      }}

                      containerStyle={{

                        // height: 10,
                        // margin: 0,
                        // padding: 0

                      }}

                      

                    
                      
                    />
               </View>
            
            <View style={styles.formField}>
              <MaterialIcons style={{ paddingVertical: 2,paddingRight:3}} name='date-range' size={18} color='#283239' />
              <Text onPress={() => setOpen(true)} style={styles.formInput}>{selectedDOB}</Text>
            </View>

              <DatePicker
              modal
              mode='date'
              open={open}
              date={date}
              // maximumDate={new Date()}              
              // minDate={moment().subtract(100, "years")._d}
              // maximumDate={moment().subtract(18, 'years')._d}
              defaultDate={new Date()}
              minimumDate = {new Date(year - 80, month, day)}
              maximumDate={new Date(year - 18, month, day)}
              onConfirm={(date) => {
              setOpen(false)
              setDate(date)
              let dateString = date.toString().substring(4,15)
              setSelectedDOB('Date of Birth: '+ dateString)
              }}
              onCancel={() => {
              setOpen(false)
              }}
              />

            
            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='location-outline' size={18} color='#283239' />
            <TextInput placeholder='Address' style = {styles.formInput}
              value={addressFromUI} onChangeText={setAddressFromUI}/>
            </View>

            {/* <View style={{marginBottom:20}}>
              <FlatList
              data={search}
              renderItem={({item}) => (
              
              <View style={styles.row}>
                  <View style ={styles.iconContainer}>
                      <Entype name={"location-pin"} size={30} color='#283239' />
                      
                      </View>

                      <Text style ={styles.locationText}>{item.description}</Text>
              </View>
              )} />
            </View> */}

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='settings-cell' size={18} color='#283239' />
            <TextInput placeholder='Mobile Number' style = {styles.formInput}
              value={mobileNumberFromUI} onChangeText={setMobileNumberFromUI} keyboardType={'number-pad'}/>
            </View>
            
            <Text style = {{marginBottom:4,paddingBottom:4,marginTop:8}}>Emergency Contact (Optional) </Text>

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
            <TextInput placeholder='Email' style = {styles.formInput}
              value={emergencyEmailFromUI} onChangeText={setEmergencyEmailFromUI}/>
            </View>

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='settings-cell' size={18} color='#283239' />
            <TextInput placeholder='Mobile' style = {styles.formInput}
              value={emergencyMobileFromUI} onChangeText={setEmergencyMobileFromUI}/>
            </View>

          
            </ScrollView>

            <TouchableOpacity onPress={savePressed} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Save</Text>
            </TouchableOpacity>
          </View>
        
    );
  };
  
 
  
  export default PersonalInformationScreen;