import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { TINT_COLOR, PrimaryColor } from "../utils/colors";
import { Text } from 'react-native';
import { PatientHomeStack } from "./PatientHomeStack";
import { PatientDoctorStack } from "./PatientDoctorStack";
import { PatientProfileStack } from "./PatientProfileStack";
import { PatientFoodScanStack } from "./PatientFoodScanStack";
import  Ecommerce  from "./E-Commerce";

const Tabs = createBottomTabNavigator();


function MarketScreen() {
  return <Text>Market Screen</Text>;
}

function ProfileScreen() {
  return <Text>Profile Screen</Text>;
}



export function PatientBottomTabsComponent({ showTabBar = true, token }) {
  const route = useRoute();
  const user = route.params?.user; // 👈 Get user from route params
  console.log("👤 User in PatientBottomTab:", user);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => {
        const iconName = {
          Home: "home-outline",
          Doctors: "people-outline",
          Market: "briefcase-outline",
          Scan: "scan-outline",
          Profile: "person-outline",
        };

        const LabelName = {
          Home: "Home",
          Doctors: "Doctors",
          Market: "Market",
          Scan: "Scan",
          Profile: "Profile",
        };

        return {
          tabBarIcon: ({ focused }) => (
            <Icon
              name={iconName[route.name]}
              style={{
                fontSize: 26,
                color: focused ? TINT_COLOR : PrimaryColor,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 12,
                fontWeight: focused ? "bold" : "normal",
                color: focused ? "#000" : PrimaryColor,
              }}
            >
              {LabelName[route.name]}
            </Text>
          ),
          headerShown: false,
          tabBarStyle: {
            display: showTabBar ? "flex" : "none",
          },
        };
      }}
    >
      <Tabs.Screen name="Home">
        {() => <PatientHomeStack />}
      </Tabs.Screen>
      <Tabs.Screen name="Doctors">
        {() => <PatientDoctorStack />}
      </Tabs.Screen>
      <Tabs.Screen name="Market">
        {() => <Ecommerce />}
      </Tabs.Screen>
      <Tabs.Screen name="Scan">
        {() => <PatientFoodScanStack />}
      </Tabs.Screen>
      <Tabs.Screen name="Profile">
        {() => <PatientProfileStack />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
