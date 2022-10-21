import { useEffect, useState } from 'react';

import ForgetPasswordScreen from "../screen/ForgetPassword";
import LoginScreen from "../screen/Login";
import SignUpScreen from "../screen/Signup";
import auth from '@react-native-firebase/auth'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
<<<<<<< HEAD
=======
import ForgetPasswordScreen from "../screen/ForgetPassword";
import { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
>>>>>>> 21918aa1794049cb1d0bb0cdf5fccc9386324ed3

const OnBoardingStack = createNativeStackNavigator();


const OnBoard= () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

      useEffect(() => {

        // auth().signOut()


        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
      if (initializing) return null;

      {(!user) && <OnBoardingStack.Screen name="Login" component={LoginScreen} /> }


    return (
        <OnBoardingStack.Navigator  screenOptions={{ 
            headerShown: false,
          
            }} >

            {(!user) && <OnBoardingStack.Screen name="Login" component={LoginScreen} /> }
            <OnBoardingStack.Screen name="Forget Password" component={ForgetPasswordScreen} />
            <OnBoardingStack.Screen name="Sign Up" component={SignUpScreen} />
          
        </OnBoardingStack.Navigator>
    )
}
export default OnBoard;