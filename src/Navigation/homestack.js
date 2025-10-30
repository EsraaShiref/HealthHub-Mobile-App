import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {CompletedTasks} from"../DoctorScreens/completedtask/completetask"
import {Cart} from"../DoctorScreens/e-commerce/cart"
import {Jobb} from "../DoctorScreens/job/job"
import {Home} from "../DoctorScreens/DoctorHome/doctorhome"
import {OnHold} from"../DoctorScreens/onholdtasks/onHolod"
import {Edit} from"../DoctorScreens/editProfile/editprofile";

import Profilestack from "./profilestack";

const Stack = createNativeStackNavigator();

export default function HomeStack(props) {
  const user = props;
  return (
    <Stack.Navigator initialRouteName="Home">
       <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
       <Stack.Screen name="CompletedTasks" component={CompletedTasks} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Stack.Screen name="Jobb" component={Jobb} options={{ headerShown: false }} />
      <Stack.Screen name="Profilestack" component={Profilestack} options={{ headerShown: false }} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="OnHold" component={OnHold} options={{ headerShown: false }} />      
    </Stack.Navigator>
  );
};
