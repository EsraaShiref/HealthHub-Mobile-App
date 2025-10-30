import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomHeader } from "../utils/helperFunctions";
import { HomeCalories } from "../Screens/calories/home/home";
import { Info } from "../Screens/calories/info";
import { Search } from "../Screens/calories/home/search";


const Stack = createNativeStackNavigator();
export function PatientFoodScanStack() {
    return (
        <Stack.Navigator initialRouteName="HomeCalories">
            <Stack.Screen name="HomeCalories" component={HomeCalories} options={{ headerShown: false }} />
            <Stack.Screen name="Info" component={Info} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};


{/**
    
    <Stack.Screen name="DoctorInfo" component={DoctorInfoScreen} options={{
                    headerBackVisible: false, 
                    headerTitle: () => <CustomHeader title="Doctor Info" />,
                    headerShadowVisible: false,
                }} />
    
    */}