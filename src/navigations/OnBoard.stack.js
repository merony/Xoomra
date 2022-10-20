import ForgetPasswordScreen from "../screen/ForgetPassword";
import LoginScreen from "../screen/Login";
import SignUpScreen from "../screen/Signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const OnBoardingStack = createNativeStackNavigator();

const OnBoard= () => {
    return (
        <OnBoardingStack.Navigator  screenOptions={{ 
            headerShown: false,
          
            }} >
            <OnBoardingStack.Screen name="Login" component={LoginScreen} />
            <OnBoardingStack.Screen name="Forget Password" component={ForgetPasswordScreen} />
            <OnBoardingStack.Screen name="Sign Up" component={SignUpScreen} 
            
            
            
            />
          
        </OnBoardingStack.Navigator>
    )
}
export default OnBoard;