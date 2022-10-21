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
        inactiveColor="#283239"
        barStyle={{ backgroundColor: '#f0f5f5' }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Stay',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="search" color={color} size={26} />
            ),
          }}
        />

<Tab.Screen
          name="Favorites"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

<Tab.Screen
          name="Bookings"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Bookings',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

<Tab.Screen
          name="Message"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Message',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />


<Tab.Screen
          name="User"
          component={HomeScreen}
          options={{
            tabBarLabel: 'User',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

      
      </Tab.Navigator>
  
    )
  }
  export default TabNavigator;