import { useEffect, useState } from "react";

import ForgetPasswordScreen from "../screen/ForgetPassword";
import LoginScreen from "../screen/Login";
import PersonalInformationScreen from "../screen/PersonalInformation";
import SignUpScreen from "../screen/Signup";
import ProfileInputScreen from "../screen/ProfileInput"
import VerificationScreen from "../screen/Verification"
import auth from '@react-native-firebase/auth'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Alert,
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const OnBoardingStack = createNativeStackNavigator();


const OnBoard= ({navigation}) => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    
 
      useEffect(() => {
        //Runs on every render

        if (user) {
          // navigation.replace("RegistrationScreen")

          // navigation.navigate("TabNavigator");
  
        } 
        
        else {
          setUser(null);
        }
      
        
      });
    

      useEffect(() => {


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