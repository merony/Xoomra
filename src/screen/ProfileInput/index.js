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
      {label: 'Afrikaans', value: 'Afrikaans'},{label: 'Albanian', value: 'Albanian'},
      {label: 'Arabic', value: 'Arabic'},{label: 'Armenian', value: 'Armenian'},
      {label: 'Basque', value: 'Basque'},{label: 'Bengali', value: 'Bengali'},
      {label: 'Bulgarian', value: 'Bulgarian'},{label: 'Catalan', value: 'Catalan'},
      {label: 'Cambodian', value: 'Cambodian'},{label: 'Chinese (Mandarin)', value: 'Chinese (Mandarin)'},
      {label: 'Croatian', value: 'Croatian'},{label: 'Czech', value: 'Czech'},
      {label: 'Danish', value: 'Danish'},{label: 'Dutch', value: 'Dutch'},
      {label: 'English', value: 'English'},{label: 'Estonian', value: 'Estonian'},
      {label: 'Fiji', value: 'Fiji'},{label: 'Finnish', value: 'Finnish'},
      {label: 'French', value: 'French'},{label: 'Georgian', value: 'Georgian'},
      {label: 'German', value: 'German'},{label: 'Greek', value: 'Greek'},
      {label: 'Gujarati', value: 'Gujarati'},{label: 'Hebrew', value: 'Hebrew'},
      {label: 'Hindi', value: 'Hindi'},{label: 'Hungarian', value: 'Hungarian'},
      {label: 'Icelandic', value: 'Icelandic'},{label: 'Indonesian', value: 'Indonesian'},
      {label: 'Irish', value: 'Irish'},{label: 'Italian', value: 'Italian'},
      {label: 'Japanese', value: 'Japanese'},{label: 'Javanese', value: 'Javanese'},
      {label: 'Korean', value: 'Korean'},{label: 'Latin', value: 'Latin'},
      {label: 'Latvian', value: 'Latvian'},{label: 'Lithuanian', value: 'Lithuanian'},
      {label: 'Macedonian', value: 'Macedonian'},{label: 'Malay', value: 'Malay'},
      {label: 'Malayalam', value: 'Malayalam'},{label: 'Maltese', value: 'Maltese'},
      {label: 'Maori', value: 'Maori'},{label: 'Marathi', value: 'Marathi'},
      {label: 'Mongolian', value: 'Mongolian'},{label: 'Nepali', value: 'Nepali'},
      {label: 'Norwegian', value: 'Norwegian'},{label: 'Persian', value: 'Persian'},
      {label: 'Polish', value: 'Polish'},{label: 'Portuguese', value: 'Portuguese'},
      {label: 'Punjabi', value: 'Punjabi'},{label: 'Quechua', value: 'Quechua'},
      {label: 'Romanian', value: 'Romanian'},{label: 'Russian', value: 'Russian'},
      {label: 'Samoan', value: 'Samoan'},{label: 'Serbian', value: 'Serbian'},
      {label: 'Slovak', value: 'Slovak'},{label: 'Slovenian', value: 'Slovenian'},
      {label: 'Spanish', value: 'Spanish'},{label: 'Swahili', value: 'Swahili'},
      {label: 'Swedish', value: 'Swedish'},{label: 'Tamil', value: 'Tamil'},
      {label: 'Tatar', value: 'Tatar'},{label: 'Telugu', value: 'Telugu'},
      {label: 'Thai', value: 'Thai'},{label: 'Tibetan', value: 'Tibetan'},
      {label: 'Tonga', value: 'Tonga'},{label: 'Turkish', value: 'Turkish'},
      {label: 'Ukrainian', value: 'Ukrainian'},{label: 'Urdu', value: 'Urdu'},
      {label: 'Uzbek', value: 'Uzbek'},{label: 'Vietnamese', value: 'Vietnamese'},
      {label: 'Welsh', value: 'Welsh'},{label: 'Xhosa', value: 'Xhosa'}
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