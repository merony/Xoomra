import HomeScreen from "../screen/Main/Home";
import LoginScreen from "../screen/Login";
import SignUpScreen from "../screen/Signup";
import StayListScreen from "../screen/Main/StayList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgetPasswordScreen from "../screen/ForgetPassword";
import { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';

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
  
    return (
        <OnBoardingStack.Navigator  screenOptions={{ 
            headerShown: false,
          
            }} >
            
            {(!user) && <OnBoardingStack.Screen name="Login" component={LoginScreen} /> }
            <OnBoardingStack.Screen name="Home Screen" component={HomeScreen} />
            <OnBoardingStack.Screen name="Stay List" component={StayListScreen} />
            <OnBoardingStack.Screen name="Forget Password" component={ForgetPasswordScreen} />
            <OnBoardingStack.Screen name="Sign Up" component={SignUpScreen} 
            
            options={{headerShown: false}}
            
            />
          
        </OnBoardingStack.Navigator>
    )
}
export default OnBoard;