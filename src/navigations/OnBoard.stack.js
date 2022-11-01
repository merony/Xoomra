import { useEffect, useState } from "react";

import ForgetPasswordScreen from "../screen/ForgetPassword";
import LoginScreen from "../screen/Login";
import PersonalInformationScreen from "../screen/PersonalInformation";
import SignUpScreen from "../screen/Signup";
import auth from '@react-native-firebase/auth'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const OnBoardingStack = createNativeStackNavigator();


const OnBoard= ({navigation}) => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    
 
      useEffect(() => {
        //Runs on every render

        if (user) {
          // navigation.replace("RegistrationScreen")

          navigation.navigate("TabNavigator");
  
        } 
        
        else {
          setUser(null);
        }
      
        
      });
    

      useEffect(() => {

        //Runs only on the first render

        // auth().signOut()

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
        <OnBoardingStack.Navigator  screenOptions={{ 
            headerShown: false,
          
            }} >
           {/* {(!user) && <OnBoardingStack.Screen name="Login" component={LoginScreen} /> } */}
           <OnBoardingStack.Screen name="Login" component={LoginScreen} />
            <OnBoardingStack.Screen name="Forget Password" component={ForgetPasswordScreen} />
            <OnBoardingStack.Screen name="Sign Up" component={SignUpScreen} />
            <OnBoardingStack.Screen name="Personal Information" component={PersonalInformationScreen} />
          
        </OnBoardingStack.Navigator>
    )
}
export default OnBoard;