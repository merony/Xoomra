import HomeScreen from "../screen/Main/Home";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import SearchScreen from "../screen/Main/Search";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();


const TabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        activeColor="#0999f4"
        inactiveColor="#030f14"
        barStyle={{ backgroundColor: '#f0f5f5' }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Stay',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

<Tab.Screen
          name="Fav"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Stay',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
      
      </Tab.Navigator>
  
    )
  }
  export default TabNavigator;