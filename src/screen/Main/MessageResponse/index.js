import {AccommodationsDetailsDB, ExchangeDB, MessagesDB, UserMessages, usersDB} from '../../../data/firRef';
import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {cAccommodationsDB, cMessagesDB, cUserDB} from '../../../data/firCuRef';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import InputBoxInMessage from '../../../components/InputBoxInMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MessageResponseItem from '../../../components/MessageResponseItem';
import MrotherUser from '../../../components/MrotherUser';
import React from 'react';
import StayInfoGuestInMessageComponent from '../../../components/StayInfoInMessage/indexGuest';
import StayInfoInMessageComponent from '../../../components/StayInfoInMessage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messages from '../../../data/message';
import places from '../../../data/stayFeed';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const MessageResponseScreen = ({navigation, props, route}) => {


  const {data} = route.params;

  const [allMessages, GetAllMessages] = useState([]); 

  const [myExchnageListing, GetMyExchnageListing] = useState([]);
  const [myListing, GetMyListing] = useState([]); 

  const [otherExchnageListing, GetOtherExchnageListing] = useState([]); 

  const [otherListing, GetOtherListing ] = useState([]); 
  const [openBottom,setOpenBottom]=useState(false)
  const[openTop,setOpenTop]=useState(false)

  const currentMessageDB = MessagesDB.doc(data.messageId).collection('Message')
  // .where( "seen", "==", false)

  const myExchnageListingDB = ExchangeDB.doc(data.messageId).collection(data.hostingId).doc(data.host.docID)

  const myListingDB = AccommodationsDetailsDB.doc(data.host.docID)

  const otherExchnageListingDB = ExchangeDB.doc(data.messageId).collection(auth().currentUser.uid).doc(data.listingId)

  const otherListingDB = AccommodationsDetailsDB.doc(data.listingId)


  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [availabilityFrom,setavailabilityFrom] = useState(new Date())
  const [availabilityTo,setavailabilityTo] = useState(new Date())


  let myReqdata = [];

  let myListingData = [];

  let otherExchangeListinData = [];

  let otherListingData = [];

  // otherExchnageListing.checkInDate
  // checkOutDate


  // console.log("Exchnage data", data)



  const getCheckinDate = () => {
   
    const date = new Date(myExchnageListing?.checkOutDate?.seconds*1000);
    const options = {   year: 'numeric', month: 'long', day: 'numeric' };
    const today = date.toLocaleDateString('en-US', options);
    console.log('What day is it', today);

    console.log ('consol', myExchnageListing?.checkOutDate?.seconds)

    return today;
  }

  const getCheckOutDate = () => {
   
    const date = new Date(myExchnageListing?.checkInDate?.seconds*1000);
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    const today = date.toLocaleDateString('en-US', options);
    console.log('What day is it', today);

    return today;
  }

  const confrim=()=>{



    myExchnageListingDB.update({


      status : 'Accepted'


    }).then(() => {


      loadData().then(() =>{

        if (myExchnageListing.status === 'Accepted'){



            console.log ('Worekd')

        }else{

          console.log ('did nt wikreds')

        }


      })


    })




  }

  const accept=()=>{



  }

  const reject=()=>{



  }




  const interested=()=>{
    const interested="Interested"
    
    if(availabilityFrom&&availabilityTo){
      otherExchnageListingDB.update({

        status: interested,
        checkInDate:availabilityFrom  ,
        checkOutDate:availabilityTo 
  
      })

      setOpenBottom(false)
      setOpenTop(true)
    }
    else{
      console.log("Error=====>")
    }
 
  }

  const modify=()=>{
       
    if(availabilityFrom&&availabilityTo){
      otherExchnageListingDB.update({

        checkInDate: availabilityFrom ,
        checkOutDate:availabilityTo
  
      })
alert("dates has been updated")
    }
    else{
      console.log("Error=====>")
    }
  }


  const loadDataEx = async () => {



    try{


      await otherExchnageListingDB.get()
      .then(querySnapshot => {
    
    
        otherExchangeListinData = querySnapshot.data()
    
        GetOtherExchnageListing(otherExchangeListinData)
    
    
        // console.log('otherExchnageListing Data', otherExchnageListing.StayTitle)
    
        
      }) ;

    }catch(error){

      console.log("otherExchnageListing not", error);


    }

  }

 const loadData = async () => {

    await currentMessageDB.get()
    .then(querySnapshot => {

      querySnapshot.forEach((doc) => {

        allMessages.push(doc.data())

        console.log('Message Seen', allMessages )

        // allMessages.push (doc.data().filter(elem => elem.seen === false))

        // console.log("Message Filter", doc.data().filter(elem => elem.seen === 'false') )

      });

      GetAllMessages(allMessages);

      // console.log('All Chat Message', allMessages[0] )

  });

  await myExchnageListingDB.get()
  .then(querySnapshot => {
 

    // myExchnageListing.push(querySnapshot.data())

    myReqdata = querySnapshot.data()

    GetMyExchnageListing (myReqdata)

    console.log('My Exchange Data', querySnapshot.data().checkOutDate)
    
  }) ;



  await myListingDB.get()
  .then(querySnapshot => {
    
    myListingData = querySnapshot.data()

    GetMyListing(myListingData)
    // console.log('myListing Data', myListing.images[0])


  }) ;



};



const loadDataOther = async () => {


  
  try {

    await otherListingDB.get()
    .then(querySnapshot => {
  
      otherListingData = querySnapshot.data()
  
      // otherListing.push(querySnapshot.data())
  
      GetOtherListing(otherListingData)
  
      // console.log('otherListing Data', otherListingData.StayTitle)
  
    }) ;


  }catch(error){

    console.log ('Mylisting DB', error)
  }


};



  useEffect(() => {
    //Runs on every render

    // test();


  });

  useEffect(() => {
    loadData().then(() => {

    })

    loadDataEx().then(() => {


      if (otherExchnageListing.status === null){

        console.log ('Its Working', otherExchnageListing.status)
        
  setOpenBottom(true)
  
      } else{
  
        console.log ('Its Working not', otherExchnageListing.status)

        setOpenTop(true)
  
      }
    })

    loadDataOther();
   
  }, []);


  //get data of host and guest (host is the current user),the listing of current  will be displayed on top
  //send data as chatData to component
  //if both users orders' status do not contain unreceived, received or rejected, show input box

  const stayIDOfHost = '0'
  const stayhost = places.find(place => place.id === stayIDOfHost)
  const stayIDOfGuest = '1'
  const stayGuest = places.find(place => place.id === stayIDOfGuest)
    
  
  const dummyDataHostName = 'Vadim'
  const dummyDataGuestName = 'Lukas'
  const dummyDataUserName = 'Vadim'
  // order status has five status ' unreceived, received, interested, accepted, rejected'
  const dummyDataOrderStatusOfGuestsOrder = 'received'
  const dummyDataOrderStatusOfHostsOrder = 'accepted'

  const [orderStatusOfGuestsOrder,setOrderStatusOfGuestsOrder] = useState(dummyDataOrderStatusOfGuestsOrder)
  const [orderStatusOfHostsOrder,setOrderStatusOfHostsOrder] = useState(dummyDataOrderStatusOfHostsOrder)



  const setGuestOrderStatus = (orderStatus) =>{
    // dummyDataOrderStatusOfGuestsOrder=orderStatus
    setOrderStatusOfGuestsOrder(orderStatus)
  }
  const setHostOrderStatus = (orderStatus) =>{
    // dummyDataOrderStatusOfHostsOrder=orderStatus
    setOrderStatusOfHostsOrder(orderStatus)
  }
  
  const stayInfoDataHost = () =>{
    

      const chatData = {
        hostName:dummyDataHostName,
        guestName:dummyDataGuestName,
        userName:dummyDataUserName,
        orderStatus:dummyDataOrderStatusOfGuestsOrder,
        stay:stayhost,
        setOrderStatus:setGuestOrderStatus,
      }

      return chatData

    
  }
  const stayInfoDataGuest = () =>{
      const chatData = {
        hostName:dummyDataGuestName,
        guestName:dummyDataHostName,
        userName:dummyDataUserName,
        orderStatus:dummyDataOrderStatusOfHostsOrder,
        stay:stayGuest,
        setOrderStatus:setHostOrderStatus,
    }
      return chatData

    }

  
  const showInput = () =>{
    let temp 
    if (
      orderStatusOfGuestsOrder==='unreceived' || 
      orderStatusOfGuestsOrder==='received' ||
      orderStatusOfGuestsOrder==='rejected' ||
      orderStatusOfHostsOrder==='unreceived' ||
      orderStatusOfHostsOrder==='received' ||
      orderStatusOfHostsOrder==='rejected'){
        temp = false
      }else{
        temp = true
      }
      
      return temp
  }


    
    
    return (
      
      <View style={styles.container}>
        {/* stay */}
        <View style={styles.mainContainer}>
          {/* <StayInfoInMessageComponent cData={stayInfoDataHost()}/> */}
                  
      {/* mainContainer */}

      <Image source={{uri: myListing?.images?.[0]}} style={styles.image}/>

      <View style={styles.column}>
        <Text 
          style={styles.title} 
          numberOfLines={1}
          onPress={'listPressed'}>
          {myExchnageListing.StayTitle}
         

          
        </Text>

        <View style={{flexDirection:'row'}}>

        <Text>{myExchnageListing.hostName} </Text>
        <Text style={{marginHorizontal:5}}>-</Text>
          <Text>{myExchnageListing.status}</Text>
          <Text style={{marginHorizontal:5}}>·</Text>
        

        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between', width:300}}>


        <View style={{flexDirection:'column'}}>

    <Text>From {getCheckinDate()}

        </Text>

      <Text>To {getCheckOutDate()}

      </Text>
      </View>

          <View style={{flexDirection:'column', justifyContent:'flex-end',}}>
            
          <Pressable 
            style={[styles.listingContainer,{backgroundColor:"#1ea3f7",justifyContent:'space-evenly' }]}
            onPress={confrim}>
              {/* <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/> */}
              <Text style={{color:"white", textAlign:"center"}}>Accept</Text>
          </Pressable>

          <Pressable 
            style={[styles.listingContainer,{backgroundColor:"green",justifyContent:'space-evenly' }]}
            onPress={''}>
              {/* <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/> */}
              <Text style={{color:"white", textAlign:"center"}}>Confirmed</Text>
          </Pressable>

          <Pressable 
             style={[styles.listingContainer,{backgroundColor:"#f71e89", justifyContent:'space-evenly' }]}
            onPress={''}>
              {/* <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/> */}
              <Text style={{color:"white", textAlign:"center", justifyContent:"center"}}>Reject</Text>
          </Pressable>

          {/* if user is a guest, has received a request from the host, 
          there will be an option on the top right corner */}
          </View>
         
        </View>

      </View>

        </View>


{openTop&&<View>
<MrotherUser
 otherListing={otherListing}
 otherExchnageListing={otherExchnageListing}
 setOpen={setOpen}
 open={open}
 availabilityTo={availabilityTo}
 availabilityFrom={availabilityFrom}
 setavailabilityFrom={setavailabilityFrom}
 setOpenTo={setOpenTo}
 openTo={openTo}
 modify={modify}
 setavailabilityTo={setavailabilityTo}
 />
</View>}

        

        {/* message list */}
        <View style={styles.listContainer}>
        <Text> </Text>
          <FlatList 
            data={messages} 
            renderItem={({item}) => <MessageResponseItem message={item}/>}
            // inverted
            style={styles.list}
          />
        </View>

{openBottom&&
        <View style= {{ flexDirection: "row", padding: 20, justifyContent: 'space-between', backgroundColor: '#fff', marginLeft: 10,}} >
    
        <View style= {{ flexDirection: "column",  justifyContent: 'flex-start',}} >
           <Text style={styles.title} >New Request</Text>
            
        
            <View style= {{marginTop: 10, marginLeft: 0,}}>
        
          <Text onPress={() => setOpen(true)} style={{marginHorizontal: 0, fontSize: 14, fontWeight: 'bold'}}>From</Text>
          <Text  style={{fontSize: 14}}>{availabilityFrom.toDateString()}</Text>
          <Text onPress={() => setOpenTo(true)} style={{marginHorizontal: 0, fontSize: 14, fontWeight: 'bold'}}>To</Text>
          <Text  style={{fontSize: 14}}>{availabilityTo?.toDateString()}</Text>
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
          
        </View>
        
        <View style= {{ flexDirection: "column"}}>
        
        <Text style={styles.title} >{otherListing.StayTitle} </Text>
        <Text>By {otherExchnageListing.hostName}</Text>
        
        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                    
                    <Pressable 
                      style={[styles.listingContainer,{backgroundColor:"green",justifyContent:'space-evenly' }]}
                      onPress={interested}>
                        {/* <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/> */}
                        <Text style={{color:"white", textAlign:"center"}}>Interested</Text>
                    </Pressable>
          
                    <Pressable 
                       style={[styles.listingContainer,{backgroundColor:"#f71e89", justifyContent:'space-evenly' }]}
                      onPress={''}>
                        {/* <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/> */}
                        <Text style={{color:"white", textAlign:"center", justifyContent:"center"}}>Reject</Text>
                    </Pressable>
          
                    {/* if user is a guest, has received a request from the host, 
                    there will be an option on the top right corner */}
                    </View>
        
        </View>
        
        <View>
        
        
        </View>
              
        </View>}





        {/* input box */}
        <View style={styles.inputBox}>
          <InputBoxInMessage  cData={showInput()}/>
        </View>


    </View>
        
       
    );
  };
  
 
  
  export default MessageResponseScreen;
