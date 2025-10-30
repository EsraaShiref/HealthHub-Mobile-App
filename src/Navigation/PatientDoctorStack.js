import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DoctorScreen } from "../Screens/DoctorsScreen";
import { DoctorInfoScreen } from "../Screens/DoctorInfoScreen";
import { BookAppointementScreen } from "../Screens/BookAppointementScreen";
import { AppointementDetailsScreen } from "../Screens/AppointementDetailsScreen";
import { PaymentConfirmationScreen } from "../Screens/PaymentConfirmation";
import { CustomHeader } from "../utils/helperFunctions";
import { PaymentMethodScreen } from "../Screens/PaymentMethodScreen";


const Stack = createNativeStackNavigator();



export function PatientDoctorStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="doctors" component={DoctorScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DoctorInfo" component={DoctorInfoScreen} options={{
                headerBackVisible: false, 
                headerTitle: () => <CustomHeader title="Doctor Info" />,
                headerShadowVisible: false,
            }} />
            <Stack.Screen name="BookAppointement" component={BookAppointementScreen} />
            <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen}/>
            <Stack.Screen name="AppointementDetails" component={AppointementDetailsScreen} />
            <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}