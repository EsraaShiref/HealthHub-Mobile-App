import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Edit} from"../DoctorScreens/editProfile/editprofile";
import {DoctorInfoScreen} from "../DoctorScreens/profile/profile";
import { DoctorAppointments } from "../DoctorScreens/DoctorAppoientements";
import EditAppointmentScreen from "../DoctorScreens/EditAppointment";
import { ChangePasswordScreen } from "../Screens/ChangePasswordScreen";
import { AddAppointmentScreen } from "../DoctorScreens/AddAppointment";
const Stack = createNativeStackNavigator();

export default function Profilestack() {
  return (
    <Stack.Navigator initialRouteName="DoctorInfoScreen">
       <Stack.Screen name="DoctorInfoScreen" component={DoctorInfoScreen} options={{ headerShown: false }} />
       <Stack.Screen name="Edit" component={Edit} />
       <Stack.Screen name="DoctorAppointments" component={DoctorAppointments} options={{ headerShown: false }} />
       <Stack.Screen name="EditAppointmentScreen" component={EditAppointmentScreen} options={{ headerShown: false }}/>
       <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }}/>
       <Stack.Screen name="AddAppointment" component={AddAppointmentScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
