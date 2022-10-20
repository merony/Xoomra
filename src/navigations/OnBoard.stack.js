import { useEffect, useState } from 'react';

import LoginScreen from "../screen/Login";
import SignUpScreen from "../screen/Signup";
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
            <OnBoardingStack.Screen name="Login" component={LoginScreen} />
            <OnBoardingStack.Screen name="Sign Up" component={SignUpScreen} 
            />
          
        </OnBoardingStack.Navigator>
    )
}
export default OnBoard;