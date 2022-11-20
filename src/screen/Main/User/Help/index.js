import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,Alert
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const HelpScreen = ({navigation, props}) => {

  const dummyDataUserName = 'Lukas'
  const [guestTabFocused,setGuestTabFocused] = useState(true)
  const tabGuestPressed = () =>{
    setGuestTabFocused(true)
  }
  const tabHostPressed = () =>{
    setGuestTabFocused(false)
  }
  const navi = useNavigation()

  const cellPressed = (id) =>{
    let temp
    navi.navigate('HelpDetail',{id:id})
  }

  const contactUsPressed = () =>{
    navi.navigate('Support')
  }

  const TabMenu = () =>{
    let temp = <View></View>

    if(guestTabFocused){
      temp = 
        <View style={styles.tabMenu}>
          <View style={styles.subTabMenu}>
            <Text 
              style={styles.tabMenuTitleFocused}
              onPress={tabGuestPressed}>Guest</Text>
            <Text 
              style={styles.tabMenuTitle}
              onPress={tabHostPressed}
              >Host</Text>
          </View>

          <Text style={styles.subTitle}>Guides for getting started</Text>

          <View style={styles.cellContainer}>

            <TouchableOpacity 
              style={styles.cell}
              onPress={()=>{cellPressed(0)}}
            >
             <MaterialIcons name='search' size={25} color='#283239' style={styles.icon}/>
             <Text style={styles.textInCell}> Finding out a stay that's right for you</Text>
             <MaterialIcons name='keyboard-arrow-right' size={25} color='#283239' style={styles.icon}/>

            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cell}
              onPress={()=>{cellPressed(1)}}
            >
             <MaterialIcons name='cancel' size={25} color='#283239' style={styles.icon}/>
             <Text style={styles.textInCell}> How cancellations work</Text>
             <MaterialIcons name='keyboard-arrow-right' size={25} color='#283239' style={styles.icon}/>

            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cell}
              onPress={()=>{cellPressed(2)}}
            >
             <MaterialIcons name='account-circle' size={25} color='#283239' style={styles.icon}/>
             <Text style={styles.textInCell}> Setting up your account</Text>
             <MaterialIcons name='keyboard-arrow-right' size={25} color='#283239' style={styles.icon}/>

            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cell}
              onPress={()=>{cellPressed(3)}}
            >
             <MaterialIcons name='home' size={25} color='#283239' style={styles.icon}/>
             <Text style={styles.textInCell}> Getting protected through Xcover</Text>
             <MaterialIcons name='keyboard-arrow-right' size={25} color='#283239' style={styles.icon}/>

            </TouchableOpacity>



          </View>

        </View>
    }else{
      temp = 
        <View style={styles.tabMenu}>
          <View style={styles.subTabMenu}>
            <Text 
              style={styles.tabMenuTitle}
              onPress={tabGuestPressed}>Guest</Text>
            <Text 
              style={styles.tabMenuTitleFocused}
              onPress={tabHostPressed}
              >Host</Text>
          </View>

          <Text style={styles.subTitle}>Guides for Hosts</Text>

          <View style={styles.cellContainer}>

            <TouchableOpacity 
              style={styles.cell}
              onPress={()=>{cellPressed(4)}}
            >
             <MaterialIcons name='settings' size={25} color='#283239' style={styles.icon}/>
             <Text style={styles.textInCell}> Optimizing your listing</Text>
             <MaterialIcons name='keyboard-arrow-right' size={25} color='#283239' style={styles.icon}/>

            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cell}
              onPress={()=>{cellPressed(5)}}
            >
             <MaterialIcons name='people' size={25} color='#283239' style={styles.icon}/>
             <Text style={styles.textInCell}> Meet new friends</Text>
             <MaterialIcons name='keyboard-arrow-right' size={25} color='#283239' style={styles.icon}/>

            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cell}
              onPress={()=>{cellPressed(6)}}
            >
             <MaterialIcons name='star-outline' size={25} color='#283239' style={styles.icon}/>
             <Text style={styles.textInCell}> Achieving your hotsing goals</Text>
             <MaterialIcons name='keyboard-arrow-right' size={25} color='#283239' style={styles.icon}/>

            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cell}
              onPress={()=>{cellPressed(7)}}
            >
             <MaterialIcons name='cancel' size={25} color='#283239' style={styles.icon}/>
             <Text style={styles.textInCell}> Changes and cancellations</Text>
             <MaterialIcons name='keyboard-arrow-right' size={25} color='#283239' style={styles.icon}/>

            </TouchableOpacity>



          </View>

        </View>

    }
    return temp
  }
    
  

    return (

      <ScrollView style={{flexDirection: "column",}}>

       <Text style={styles.mainTitle1}>Hi {dummyDataUserName},</Text>
       <Text style={styles.mainTitle2}>how can  we help?</Text>

      {/* tab menu */}
      <TabMenu />

        <View style={styles.getInTouch}>

          <Text style={styles.titleGetInTouch}>Need to get in touch?</Text>
          <Text style={styles.textGetInTouch}>We'll start  with some questions and get you to the right place.</Text>

          <TouchableOpacity 
            style={styles.customBTN}
            onPress={contactUsPressed}>
            <Text style={styles.textBTN}>Contact us</Text>
          </TouchableOpacity>

        </View>


    </ScrollView>
        
       
    );
  };
  
 
  
  export default HelpScreen;