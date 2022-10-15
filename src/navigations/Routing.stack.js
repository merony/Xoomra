import { NavigationContainer } from '@react-navigation/native';
import OnBoard from "./OnBoard.stack";
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
                
                
            
        
        
               

            </RootStack.Navigator>
        </NavigationContainer>
    )
}
export default Routing;