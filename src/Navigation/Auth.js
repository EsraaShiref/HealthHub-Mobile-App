import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUp } from "../DoctorScreens/Signup/signupScreen";
import { Login } from "../DoctorScreens/login/LoginScreen";
import { Complete } from "../DoctorScreens/completeSign/complete";
import { Choose } from "../DoctorScreens/loginOrSignup/LoginOrSignup";
import { SplashScreen } from "../DoctorScreens/Splachs/splach1";
import { Splash2 } from "../DoctorScreens/Splachs/splach2";
import { Splash3 } from "../DoctorScreens/Splachs/splach3";
import { BottomTab } from "./BottomTab"; // ✅ استخدم BottomTab بدلاً من HomeStack
import { PatientBottomTabsComponent } from "./PatientBottomTabs";
import { ForgotPassword } from "../DoctorScreens/ForgotPasswordScreen";
import { EmailSentScreen } from "../DoctorScreens/EmailSentScreen";
import { NewPasswordScreen } from "../DoctorScreens/OTPNewPasswordScreen";
import { SuccessPasswordScreen } from "../DoctorScreens/OTPSuccessPasswordScreen";
import { VerifyIdentityScreen } from "../DoctorScreens/VerifyIdentityScreen/VerifyIdentityScreen";
import { VerifyEmailScreen } from "../DoctorScreens/VerifyEmailScreen/VerifyEmailScreen";
import { EmailVerifiedScreen } from "../DoctorScreens/EmailVerifiedScreen/EmailVerifiedScreen";
import { CustomHeader } from "../utils/helperFunctions";
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Splash2" component={Splash2} options={{ headerShown: false }} />
      <Stack.Screen name="Splash3" component={Splash3} options={{ headerShown: false }} />
      <Stack.Screen name="LoginOrSignup" component={Choose} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Complete" component={Complete} options={{ headerShown: false }} />
      <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
      <Stack.Screen name="PatientBottomTabs" component={PatientBottomTabsComponent} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="EmailSentScreen" component={EmailSentScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="SuccessPassword" component={SuccessPasswordScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VerifyIdentityScreen" component={VerifyIdentityScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="EmailVerified" component={EmailVerifiedScreen} options={{ headerShown: false }}></Stack.Screen>
    </Stack.Navigator>
  );
}
