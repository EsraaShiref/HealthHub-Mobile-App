import React, { useState } from "react";
import {Text,SafeAreaView,View,Image,ScrollView,Alert,ActivityIndicator,KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard,TouchableOpacity} from "react-native";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { Styles } from "./styles";
import { INput1 } from "../../Component/TextInput";
import { TouchButton } from "../../Component/touchableOpacity";
import { validateEmail, validatePassword } from "../Signup/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppButton } from "../../Component/AppButton";

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { setUser } = useUser();

  const handleLogin = async () => {
    setSubmitted(true);

    if (!validateEmail(email) || !validatePassword(password)) {
      Alert.alert("خطأ", "يرجى إدخال بيانات صحيحة!");
      return;
    }

    setLoading(true);

    const userData = { email, password };

    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/auth/login",
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, name, role } = response.data?.data;

      if (token) {
        const newUser = { token, name, email, role };
        setUser(newUser);
        await AsyncStorage.setItem("user", JSON.stringify(newUser));
        navigation.reset({
          index: 0,
          routes: [{ name: role === "client" ? "PatientBottomTabs" : "BottomTab" }],
        });
      } else {
        Alert.alert("خطأ", "لم يتم العثور على توكن!");
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      Alert.alert(
        "خطأ",
        error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <SafeAreaView style={Styles.container}>
            <View style={Styles.main}>
              <Image source={require("../../../assets/images/login.png")} style={Styles.image} />

              <View style={Styles.inputcontainer}>
                <Text style={Styles.text}>Login to your Account</Text>

                <INput1
                  placeholder="Email"
                  bordered
                  onChangeText={setEmail}
                  value={email}
                />
                {submitted && !validateEmail(email) && (
                  <Text style={Styles.warn}>يرجى إدخال بريد إلكتروني صحيح</Text>
                )}

                <INput1
                  placeholder="Password"
                  bordered
                  secureTextEntry={secureText}
                  onPress={() => setSecureText(!secureText)}
                  value={password}
                  onChangeText={setPassword}
                />
                {submitted && !validatePassword(password) && (
                  <Text style={Styles.warn}>
                    كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وصغير
                  </Text>
                )}
                <View style={Styles.forgtpassbtn}>
                  <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={Styles.forgotPassText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>


                <View style={Styles.wrapper_button}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                  ) : (
                    <AppButton title="Login" onPress={handleLogin} />
                  )}
                </View>

                <View style={Styles.wrapperTouch2}>
                  <TouchButton
                    title1="Don't have an Account?"
                    title2="Sign Up"
                    title1font={20}
                    onPress={() => navigation.navigate("SignUp")}
                  />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
