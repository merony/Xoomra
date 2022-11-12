import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,ScrollView, Alert
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';

const SupportScreen = ({navigation, props}) => {

  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [email, setEmail] = useState('');

  const howItWorks = "Thanks for sending us your ideas, issues, or appreciations. We will pass it on to the teams who are working to help make Xrooma better for everyone."
    

  const checkValidity = () =>{
     if(name===''){
      return 'n'
     }else if (email==='' && phoneNumber===''){
      return 'e'
     }else if (details===''){
      return 'd'
     }else{
      return 'valid'
     }
  }
  const submitPressed= () =>{
    const status = checkValidity();
    if(status==='n'){
      Alert.alert('Please provide a name')
    }else if(status==='e'){
      Alert.alert('Please provide an email or a phone number')
    }else if(status==='d'){
      Alert.alert('Please provide some details')
    }else if(status==='valid'){
      const temp = `Hi ${name}, your opinion about ${selectedSubject} has been sent to a Xrooma Team member. We will contact you in 3 days.`
      Alert.alert(temp)
    }
  }
  

    return (

      <View style={{flexDirection: "column"}}>

      <ScrollView style={styles.scrollViewContainer}>

       {/* title */}
       <Text style={styles.HeadTitle}>
        Contact Us
       </Text>
       {/* about this screen */}
       <Text style={styles.howItWorks}>
        {howItWorks}
       </Text>






       {/* name */}
       <View style={styles.subContainer}>
       <Text style={styles.title}>How should we address you? </Text>
       <View style = {styles.formField}>
          <MaterialIcons name='person' size={18} color='#283239' style={styles.icon} />
          <TextInput 
            placeholder='name' 
            style = {styles.formInput} 
            keyboardType="default" 
            onChangeText={newText => setName(newText)}
          />
        </View>
       </View>

       {/* email */}
       <View style={styles.subContainer}>
       <Text style={styles.title}>What's your email address?</Text>
       <View style = {styles.formField}>
          <MaterialIcons name='alternate-email' size={18} color='#283239' style={styles.icon}/>
          <TextInput 
            placeholder='Email' 
            style = {styles.formInput} 
            keyboardType="email-address" 
            onChangeText={newText => setEmail(newText)}
          />
        </View>
       </View>

       {/* phone */}
       <View style={styles.subContainer}>
       <Text style={styles.title}>What's your phone number?</Text>
       <View style = {styles.formField}>
          <MaterialIcons name='smartphone' size={18} color='#283239' style={styles.icon}/>
          <TextInput 
            placeholder='phone number' 
            style = {styles.formInput} 
            keyboardType="number-pad"
            onChangeText={newText => setPhoneNumber(newText)} />
        </View>
       </View>

       {/* subject */}
       <View style={styles.subContainer}>

        <Text style={styles.title}>Choose the Subject</Text>

        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSubject}
          style={styles.picker}
          
          onValueChange={(itemValue, itemIndex) =>
            setSelectedSubject(itemValue)
          }>
          <Picker.Item label="Hosting" value="host" />
          <Picker.Item label="Traveling" value="guest" />
          <Picker.Item label="General Experience" value="general experience" />
        </Picker>

        </View>


       </View>

       {/* add details */}
       <View style={styles.subContainer}>
       <Text style={styles.title}>Add details</Text>
       <View style = {styles.formFieldDetails}>
          {/* <MaterialIcons name='alternate-email' size={18} color='#283239' /> */}
          <TextInput 
            placeholder='Details' 
            style = {styles.formInputDetails} 
            numberOfLines={5}  
            multiline = {true}
            onChangeText={newText => setDetails(newText)}
            />
        </View>
       </View>
      </ScrollView>
      

       {/* submit btn */}
       <TouchableOpacity 
        style={styles.customBTN}
        onPress={submitPressed}
       >
        <Text style={styles.textBTN}>SUBMIT</Text>

       </TouchableOpacity>



    </View>
        
       
    );
  };
  
 
  
  export default SupportScreen;