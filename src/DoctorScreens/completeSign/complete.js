import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import Icon2 from "react-native-vector-icons/Entypo";
import { Styles } from "./styles";
import { INput1 } from "../../Component/TextInput";
import DropdownComponent from "../../Component/Dropdown";
import { Governmentdata, Gender } from "../../dummy/dummydata";
import { validatePhone } from "../Signup/functions";
import FilePickerButton from "../../Component/uploadButton";
import NetInfo from "@react-native-community/netinfo";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppButton } from "../../Component/AppButton";

export function Complete({ navigation, route }) {
  const { user } = route.params;
  const { setUser, setToken } = useUser();
  const [phone, setPhone] = useState("");
  const [government, setGovernment] = useState(null);
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const checkInternetConnection = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  };

  const handleSignUp = async () => {
    setSubmitted(true);

    if (!validatePhone(phone) || !government || !gender) {
      Alert.alert("خطأ", "يرجى إدخال جميع البيانات بشكل صحيح!");
      return;
    }

    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      Alert.alert("خطأ", "لا يوجد اتصال بالإنترنت!");
      return;
    }

    setLoading(true);

    const userData = {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
      role: user.role,
      phone,
      gender: gender?.toLowerCase(),
      governorate: government,
    };

    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/auth/register",
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ استجابة السيرفر:", response.data);

      if (response.status === 201 || response.status === 200) {
        const token = response.data?.data?.token;
        const userResponse = {
          name: response.data.data?.name,
          email: response.data.data?.email,
          role: response.data.data?.role,
          token: response.data?.data?.token,
        };

        if (!token) {
          console.error("❌ لا يوجد توكن في الاستجابة");
          Alert.alert("خطأ", "لم يتم الحصول على التوكن.");
          return;
        }

        setUser({ token, name: userResponse.name, email: userResponse.email, role: userResponse.role });


        console.log("✅ Token and user set:", user);

        // الانتقال للصفحة التالية بناءً على الدور
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: role === "client" ? "PatientBottomTabs" : "BottomTab" }],
          });
        }, 300);
      }
    } catch (error) {
      console.error("❌ Registration Error:", error.response?.data || error.message);
      Alert.alert("خطأ", error.response?.data?.data?.message || "فشل إنشاء الحساب، حاول مرة أخرى!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <SafeAreaView style={Styles.container}>
            <View style={Styles.main}>
              <Image source={require("../../../assets/images/login.png")} style={Styles.image} />

              <View style={Styles.inputcontainer}>
                <INput1
                  placeholder="Phone"
                  bordered
                  rendericonleft={() => <Icon2 name="phone" size={15} color="#bbb" />}
                  onChangeText={setPhone}
                  value={phone}
                />
                {submitted && phone !== "" && !validatePhone(phone) && (
                  <Text style={Styles.warn}>Phone number isn't correct</Text>
                )}

                <DropdownComponent
                  placeholder="Select Government"
                  datatype={Governmentdata}
                  value={government}
                  onChange={(item) => setGovernment(item.value)}
                />
                {submitted && !government && <Text style={Styles.warn}>Select a Governorate</Text>}

                <DropdownComponent
                  placeholder="Select Gender"
                  datatype={Gender}
                  value={gender}
                  onChange={(item) => setGender(item.value)}
                />
                {submitted && !gender && <Text style={Styles.warn}>Select your Gender</Text>}

                {user.role === "doctor" && (
                  <>
                    <Text>If you are a Doctor, upload your files</Text>
                    <FilePickerButton />
                  </>
                )}

                <View style={Styles.wrapper_button}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                  ) : (
                    <AppButton title={"Complete"} onPress={handleSignUp} />
                  )}
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
