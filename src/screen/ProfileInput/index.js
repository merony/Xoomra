import {
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import SelectList from 'react-native-dropdown-select-list'
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import styles from './styles'
import auth from '@react-native-firebase/auth'

const ProfileInputScreen = ({navigation, props}) => {
    
    const [facebookLinkFromUI,setFacebookLinkFromUI] = useState("")
    const [linkedinLinkFromUI,setlinkedinLinkFromUI] = useState("")
    const [interestFromUI,setInterestFromUI] = useState("")
    const [aboutYourSelfFromUI,setAboutYourSelfFromUI] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState([
      {label: 'English', value: 'English'},
      {label: 'French', value: 'French'},
      {label: 'Arabic', value: 'Arabic'},
      {label: 'Chinese', value: 'Chinese'},
      {label: 'Hindi', value: 'Hindi'},
      {label: 'Italian', value: 'Italian'},
      {label: 'Russian', value: 'Russian'},
      {label: 'Persian', value: 'Persian'},
      {label: 'Spanish', value: 'Spanish'}
    ]);

    const savePressed = () =>{

      console.log("PRESSED")

      firestore().collection('Profiles').add({
        uid : auth().currentUser.uid,
        email : auth().currentUser.email,
        FacebookURL : facebookLinkFromUI,
        LinkedinURL : linkedinLinkFromUI,
        Intrests : interestFromUI,
        aboutYourSelf : aboutYourSelfFromUI,
        Languages : value
        })

        navigation.navigate('Verification Screen')
    }

    return (

      <View style={{flexDirection: "column",margin:10}}>


            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='logo-facebook' size={18} color='#283239' />
            <TextInput placeholder='Facebook URL' style = {styles.formInput}
              value={facebookLinkFromUI} onChangeText={setFacebookLinkFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='logo-linkedin' size={18} color='#283239' />
            <TextInput placeholder='Linkedin URL' style = {styles.formInput}
              value={linkedinLinkFromUI} onChangeText={setlinkedinLinkFromUI} keyboardType={'number-pad'}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='heart-outline' size={18} color='#283239' />
            <TextInput placeholder='Interest' style = {styles.formInput}
              value={interestFromUI} onChangeText={setInterestFromUI} keyboardType={'number-pad'}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='list' size={18} color='#283239' />
            <TextInput placeholder='About Your Self' style = {styles.formInput}
              value={aboutYourSelfFromUI} onChangeText={setAboutYourSelfFromUI} keyboardType={'number-pad'}/>
            </View>

            

            <View style={{margin:10}}>
              <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    multiple={true}
                    min={1}
                    placeholder={"Select Language"}
                  />
            </View>
            <TouchableOpacity onPress={savePressed} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Save</Text>
            </TouchableOpacity>


    </View>
        
       
    );
  };
  
 
  
  export default ProfileInputScreen;