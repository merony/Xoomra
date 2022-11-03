import { useEffect, useState } from "react";

import ForgetPasswordScreen from "../screen/ForgetPassword";
import LoginScreen from "../screen/Login";
import PersonalInformationScreen from "../screen/PersonalInformation";
import SignUpScreen from "../screen/Signup";
import ProfileInputScreen from "../screen/ProfileInput"
import auth from '@react-native-firebase/auth'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const OnBoardingStack = createNativeStackNavigator();


const OnBoard= () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

      useEffect(() => {

        auth().signOut()


        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
      if (initializing) return null;

     


    return (
        <OnBoardingStack.Navigator  screenOptions={{ 
            headerShown: false,
          
            }} >
           {(!user) && <OnBoardingStack.Screen name="Login" component={LoginScreen} /> }

            <OnBoardingStack.Screen name="Forget Password" component={ForgetPasswordScreen} />
            <OnBoardingStack.Screen name="Sign Up" component={SignUpScreen} />
            <OnBoardingStack.Screen name="Personal Information" component={PersonalInformationScreen}/>
            <OnBoardingStack.Screen name="Profile Screen" component={ProfileInputScreen}/>
          
        </OnBoardingStack.Navigator>
    )
}
export default OnBoard;