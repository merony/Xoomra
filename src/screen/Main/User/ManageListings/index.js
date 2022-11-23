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
import ManageListingItem from '../../../../components/ManageListingItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import places from '../../../../data/stayFeed';
import styles from './styles';

const ManageListingScreen = ({navigation, props}) => {
    
const stays = places
const dummyDatalistings = [
  {
    stay:stays[0],
    isPublished:true,
  },
  {
    stay:stays[1],
    isPublished:false,
  },
  {
    stay:stays[2],
    isPublished:false,
  },
  {
    stay:stays[3],
    isPublished:true,
  }
]

const [selectedSubject, setSelectedSubject] = useState('');


    return (

      <View style={{flexDirection: "column", margin: 20}}>

   <View style={{flexDirection: "row", justifyContent: 'flex-end'}}>

<TouchableOpacity title="X"  onPress = { () => navigation.navigate("Add Listing")} >
                            <Text style = {{fontWeight: '500', fontSize: 14, color: "#030f14", textDecorationLine: 'underline'}}>Add New Listing</Text>
                        </TouchableOpacity>
                        </View>

                         {/* flatlistContainer */}
        <View style={styles.flatlistContainer}>

<FlatList
  data={dummyDatalistings}
  renderItem={({item}) => <ManageListingItem listing={item} />}
 />

</View>

        </View>

    
  );
   };
  
 
  
  export default ManageListingScreen;