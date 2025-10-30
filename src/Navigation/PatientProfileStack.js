import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomHeader } from "../utils/helperFunctions";
import { PatientProfileScreen } from "../Screens/PatientProfileScreen";
import { EditProfileScreen } from "../Screens/EditP_ProfileScreen";
import { MedicalInfoScreen } from "../Screens/PatientMedicalinfo";
import { AppoientementHistoryScreen } from "../Screens/AppoientementHistory";
import { ChangePasswordScreen } from "../Screens/ChangePasswordScreen";
import { AppointementDetail } from "../Screens/AppoientementHistoryDetail";


const Stack = createNativeStackNavigator();


export function PatientProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profilescreen" component={PatientProfileScreen} options={{
                headerBackVisible: false,
                headerTitle: () => <CustomHeader title="Profile" />,
                headerShadowVisible: false,
            }}></Stack.Screen>
            <Stack.Screen name="edit" component={EditProfileScreen} options={{
                headerBackVisible: false,
                headerTitle: () => <CustomHeader title="Edit Your Profile" />,
                headerShadowVisible: false,
            }}></Stack.Screen>
            <Stack.Screen name="MedicalInfo" component={MedicalInfoScreen} options={{
                headerBackVisible: false,
                headerTitle: () => <CustomHeader title="Medical Information" />,
                headerShadowVisible: false,
            }}></Stack.Screen>
            <Stack.Screen name="AppoientementHistory" component={AppoientementHistoryScreen} options={{
                headerBackVisible: false,
                headerTitle: () => <CustomHeader title="Appoientement History" />,
                headerShadowVisible: false,
            }}></Stack.Screen>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{
                headerBackVisible: false,
                headerTitle: () => <CustomHeader title="Change Your Password" />,
                headerShadowVisible: false,
            }}></Stack.Screen>
            <Stack.Screen name="AppointementDetail" component={AppointementDetail} options={{
                headerBackVisible: false,
                headerTitle: () => <CustomHeader title="Appoientement Details" />,
                headerShadowVisible: false,
            }}></Stack.Screen>
        </Stack.Navigator>
    );
};
