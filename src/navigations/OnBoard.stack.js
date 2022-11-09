import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useEffect, useState } from "react";

import DatePickerComponent from "../components/DatePicker/index"
import ForgetPasswordScreen from "../screen/ForgetPassword";
import LoginScreen from "../screen/Login";
import LongTextComponent from "../components/longText";
import PersonalInformationScreen from "../screen/PersonalInformation";
import ProfileInputScreen from "../screen/ProfileInput"
import SignUpScreen from "../screen/Signup";
import VerificationScreen from "../screen/Verification"
import auth from '@react-native-firebase/auth'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firestore from '@react-native-firebase/firestore';

const OnBoardingStack = createNativeStackNavigator();


const OnBoard= ({navigation}) => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [isCompleted, setCompleted] = useState(false);



    const navTransfer = async() =>{

      await firestore()
      .collection('users')
      .doc('PersonalInformations')
      .collection('user')
      .doc(auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data().isCompleted);
        setCompleted(documentSnapshot.data().isCompleted);
  
        // Alert.alert('User exists: ', documentSnapshot.exists);
    
        // if (documentSnapshot.exists) {
        //   Alert.alert('User data: ', documentSnapshot.data().uid);
        // };
      
    });

    if (isCompleted === true) {
      // navigation.replace("RegistrationScreen")

      navigation.navigate("TabNavigator");

    } 
    
    else {
      setUser(null);
    }


  }
    
 
      useEffect(() => {
        //Runs on every render

        navTransfer();

        
      });
    

      useEffect(() => {

        navTransfer();


        // (user) && navigation.navigate("TabNavigator");


        function onAuthStateChanged(user) {
          setUser(user);
          if (initializing) setInitializing(false);
        }
  


        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // if (user) {
        //   // navigation.replace("RegistrationScreen")
        //   navigation.navigate("TabNavigator");
        // } 
        return subscriber; // unsubscribe on unmount
      }, []);
    
      if (initializing) return null;



    return (
        <OnBoardingStack.Navigator  screenOptions={{ headerShown: false,
          headerStyle: {backgroundColor: '#FFF'},
          headerTintColor: '#030f14',
          headerTitleStyle: {fontWeight: '500', fontSize: 24,} 
         
          }} >

           {/* {(!user) && <OnBoardingStack.Screen name="Login" component={LoginScreen} /> } */}

           
           <OnBoardingStack.Screen name="Login" component={LoginScreen} />

            <OnBoardingStack.Screen name="Forget Password" component={ForgetPasswordScreen} />
            <OnBoardingStack.Screen name="Sign Up" component={SignUpScreen} />
            <OnBoardingStack.Screen name="Personal Information" component={PersonalInformationScreen}
            
            options={{
              headerShown: true, 
              headerBackVisible:false, 
              headerTitle: "Complete Registration",
        
                      }}/>

            <OnBoardingStack.Screen name="Profile Screen" component={ProfileInputScreen}
            options={{
              headerShown: true, 
              headerBackVisible:true, 
              headerTitle: " ",
              
              headerRight: () => (
                  <TouchableOpacity  onPress = { () => navigation.navigate("Verification Screen")} >
                      <Text style = {{fontWeight: '500', fontSize: 18, color: "#030f14",textDecorationLine:"underline"}}>Skip</Text>
                  </TouchableOpacity>
                )

                      }}
            />

              <OnBoardingStack.Screen name="Verification Screen" component={VerificationScreen}
            
            options={{
              headerShown: true, 
              headerBackVisible:false, 
              headerTitle: " ",
        
              headerRight: () => (
                <TouchableOpacity  onPress = { () => navigation.replace("TabNavigator")} >
                    <Text style = {{fontWeight: '500', fontSize: 18, color: "#030f14",textDecorationLine:"underline"}}>Skip</Text>
                </TouchableOpacity>
              )

                      }}/>
          
        </OnBoardingStack.Navigator>
    )
}
export default OnBoard;