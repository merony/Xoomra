import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import React from 'react'
import styles from './styles';

const MrotherUser = (props) => {
  const {otherListing,
    otherExchnageListing,
    setOpen,
    open,
    availabilityTo,
    modify,
    availabilityFrom,
    setavailabilityFrom,
    setOpenTo,
    openTo,
    setavailabilityTo}=props
    // console.log("availabilityTo=====>",availabilityTo?.toString())
  return (
    <View style={styles.mainContainer}>
    {/* <StayInfoInMessageComponent cData={stayInfoDataHost()}/> */}
            
{/* mainContainer */}

<Image source={{uri: otherListing?.images?.[0]}} style={styles.image}/>

<View style={styles.column}>
  <Text 
    style={styles.title} 
    numberOfLines={1}
    onPress={'listPressed'}>
    {otherExchnageListing.StayTitle}
  </Text>

  <View style={{flexDirection:'row'}}>

  <Text>{otherExchnageListing.hostName} </Text>
  <Text style={{marginHorizontal:5}}>-</Text>
    <Text>{otherExchnageListing.status}</Text>
    <Text style={{marginHorizontal:5}}>·</Text>
  

  </View>


  <View style={{flexDirection:'row',justifyContent:'flex-start', alignItems: 'center', width:300}}>


  <View style={{flexDirection:'column'}}>

 <Text onPress={() => setOpen(true)} style={{marginHorizontal: 0, fontSize: 14, fontWeight: 'bold'}}>From</Text>
    <Text  style={{fontSize: 14}}>{availabilityFrom?.toDateString()}</Text>
    <Text onPress={() => setOpenTo(true)} style={{marginHorizontal: 0, fontSize: 14, fontWeight: 'bold'}}>To</Text>
    <Text  style={{fontSize: 14}}>{availabilityTo?.toDateString()}</Text> 
    {/* <Text>{availabilityTo?.toString()}</Text> */}
        <DatePicker
          modal
          open={open}
          date={availabilityFrom}
          onConfirm={(date) => {
            setOpen(false)
            setavailabilityFrom(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
            />
  
  
        <DatePicker
          modal
          open={openTo}
          date={availabilityTo}
          onConfirm={(date) => {
            setOpenTo(false)
            setavailabilityTo(date)
          }}
          onCancel={() => {
            setOpenTo(false)
          }}
            />
          
</View>

    <View style={{flexDirection:'column', justifyContent:'space-between',marginLeft:70}}>
      
    <Pressable 
      style={[styles.listingContainer,{backgroundColor:"#1ea3f7",justifyContent:'space-evenly' }]}
      onPress={modify}>
        {/* <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/> */}
        <Text style={{color:"white", textAlign:"center"}}>Modify Date</Text>
    </Pressable>


    {/* if user is a guest, has received a request from the host, 
    there will be an option on the top right corner */}
    </View>
   
  </View>

</View>



  </View>
  )
}

export default MrotherUser

