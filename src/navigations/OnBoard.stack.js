import HomeScreen from "../screen/Main/Home";
import LoginScreen from "../screen/Login";
import SignUpScreen from "../screen/Signup";
import StayListScreen from "../screen/Main/StayList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const OnBoardingStack = createNativeStackNavigator();

const OnBoard= () => {
    return (
        <OnBoardingStack.Navigator  screenOptions={{ 
            headerShown: false,
          
            }} >
            <OnBoardingStack.Screen name="Login" component={LoginScreen} />
            <OnBoardingStack.Screen name="Home Screen" component={HomeScreen} />
            <OnBoardingStack.Screen name="Stay List" component={StayListScreen} />
            <OnBoardingStack.Screen name="Sign Up" component={SignUpScreen} 
            
            options={{headerShown: false}}
            
            />
          
        </OnBoardingStack.Navigator>
    )
}
export default OnBoard;