import HomeScreen from "../screen/Main/Home";
import { NavigationContainer } from '@react-navigation/native';
import OnBoard from "./OnBoard.stack";
import SearchScreen from "../screen/Main/Search";
import StayListScreen from "../screen/Main/StayList";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();


const Routing = () => {
    return (
        <NavigationContainer>

            
            <RootStack.Navigator screenOptions={{ headerShown: false,
             headerStyle: {backgroundColor: '#FF4500',  textTransform: 'uppercase'},
             headerTintColor: '#fff',
             headerTitleStyle: {fontWeight: 'bold'},
            
             }}>
                <RootStack.Screen name="OnBoard" component={OnBoard} />
                <RootStack.Screen name="Home Screen" component={HomeScreen}/>
                <RootStack.Screen name="Stay List" component={StayListScreen}/>
                <RootStack.Screen name="Search Screen" component={SearchScreen}
                options={{headerShown: false}}
                />
                
                
            
        
        
               

            </RootStack.Navigator>
        </NavigationContainer>
    )
}
export default Routing;