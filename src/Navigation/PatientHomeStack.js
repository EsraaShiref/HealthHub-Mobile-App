import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PatientHomeScreen } from "../Screens/PatientHomeScreen";
import { DoctorScreen } from "../Screens/DoctorsScreen";
import { DoctorInfoScreen } from "../Screens/DoctorInfoScreen";
import { BookAppointementScreen } from "../Screens/BookAppointementScreen";
import { AppointementDetailsScreen } from "../Screens/AppointementDetailsScreen";
import { PaymentConfirmationScreen } from "../Screens/PaymentConfirmation";
import { BlogsScreen } from "../Screens/BlogsScreen";
import { ArticlesScreen } from "../Screens/ArticlesScreen";
import { VideosScreen } from "../Screens/VideosScreen";
import { MealsScreen } from "../Screens/MealsScreen";
import { MealDetailScreen } from "../Screens/MealDetailsScreen";
import { ArticleDetailScreen } from "../Screens/ArticleDetailScreen";
import { PaymentMethodScreen } from "../Screens/PaymentMethodScreen";
import { CustomHeader } from "../utils/helperFunctions";



const Stack = createNativeStackNavigator();



export function PatientHomeStack({ token }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" options={{ headerShown: false }}>
                {() => <PatientHomeScreen token={token} />}
            </Stack.Screen>
            <Stack.Screen name="Doctors" component={DoctorScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DoctorInfo" component={DoctorInfoScreen} options={{
                headerBackVisible: false, 
                headerTitle: () => <CustomHeader title="Doctor Info" />,
                headerShadowVisible: false,
            }} />
            <Stack.Screen name="BookAppointement" component={BookAppointementScreen} />
            <Stack.Screen name="AppointementDetails" component={AppointementDetailsScreen} />
            <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen}/>
            
            <Stack.Screen name="Blogs" component={BlogsScreen} options={{
                headerBackVisible: false, 
                headerTitle: () => <CustomHeader title="Blogs" />,
                headerShadowVisible: false,
            }} />
            <Stack.Screen name="Articles" component={ArticlesScreen} options={{
                headerBackVisible: false, 
                headerTitle: () => <CustomHeader title="Articles" />,
                headerShadowVisible: false,
            }} />
            <Stack.Screen name="Videos" component={VideosScreen} options={{
                headerBackVisible: false, 
                headerTitle: () => <CustomHeader title="Videos" />,
                headerShadowVisible: false,
            }} />
            <Stack.Screen name="Meals" component={MealsScreen} options={{
                headerBackVisible: false, 
                headerTitle: () => <CustomHeader title="Meals" />,
                headerShadowVisible: false,
            }} />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} options={{
                headerBackVisible: false, 
                headerTitle: () => <CustomHeader title="Meal Detail" />,
                headerShadowVisible: false,
            }} />
            <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} options={{
                headerBackVisible: false, 
                headerTitle: () => <CustomHeader title="Article Detail" />,
                headerShadowVisible: false,
            }} />
        </Stack.Navigator>
    );
}