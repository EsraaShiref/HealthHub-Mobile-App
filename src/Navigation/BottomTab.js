import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import { Text } from "react-native";
import HomeStack from "./homestack";
import Profilestack from "./profilestack";
import Taskstack from "./taskstack";
import { Cart } from "../DoctorScreens/e-commerce/cart";
import { TINT_COLOR, PrimaryColor } from "../utils/colors";
import { useUser } from "../context/UserContext"; // ✅ استيراد الـ UserContext
import Ecommerce from "./E-Commerce";
const Tab = createBottomTabNavigator();

export function BottomTab({ showTabBar = true }) {
  const iconname = {HomeStack: "home",Task: "add-to-list",Profile: "user",Shop: "shopping-cart",};
  const label = {HomeStack: "Home",Task: "Tasks",Profile: "Profile",Shop: "Shop",};
  return (
    <Tab.Navigator screenOptions={({ route }) => ({tabBarIcon: ({ focused }) => (
          <Entypo name={iconname[route.name]} style={{fontSize: 26,color: focused ? TINT_COLOR : PrimaryColor,}}/>),
        tabBarLabel: ({ focused }) => (
          <Text style={{fontSize: 12,fontWeight: focused ? "bold" : "normal",color: focused ? "#000" : PrimaryColor,}}>
            {label[route.name]}</Text> ),headerShown: false,tabBarStyle: {display: showTabBar ? "flex" : "none",},})}>
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Task" component={Taskstack} />
      <Tab.Screen name="Shop">
        {() => <Ecommerce/>}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={Profilestack} />
    </Tab.Navigator>
  );
}


