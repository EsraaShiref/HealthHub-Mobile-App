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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import Icon2 from "react-native-vector-icons/Entypo";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import Styles from "./styles";
import { INput1 } from "../../Component/TextInput";
import { TouchButton } from "../../Component/touchableOpacity";
import { Gender } from "../../dummy/dummydata";
import FilePickerButton from "../../Component/uploadButton";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppButton } from "../../Component/AppButton";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "./functions";
import DropdownComponent from "../../Component/Dropdown";
import { User } from "../../Component/UserType/usertype";

export function SignUp({ navigation }) {
  const { setUser, setToken } = useUser();
  const [userType, setUserType] = useState("null");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [secureTextConfirm, setSecureTextConfirm] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [government, setGovernment] = useState(null);
  const [gender, setGender] = useState(null);
  const checkInternetConnection = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    if (!name || !email || !phone || !password || !confirmPassword || !gender || !userType) {
      Alert.alert("خطأ", "يرجى ملء جميع الحقول");
      return;
    }

    if (!userType || userType === "null") {
      Alert.alert("خطأ", "يرجى اختيار نوع المستخدم");
      return;
    }


    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      Alert.alert("خطأ", "لا يوجد اتصال بالإنترنت!");
      return;
    }

    setLoading(true);
    const user = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
      role: userType,
      phone,
      gender: gender?.toLowerCase(),
      governorate: government,
    };

    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/auth/register",
        user,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201 || response.status === 200) {
        const { token, name, email, role } = response.data?.data;
        const newUser = { token, name, email, role };
        setUser(newUser);
        await AsyncStorage.setItem("user", JSON.stringify(newUser));

        if (role === "doctor") {
          Alert.alert(
            "Account Created",
            "Your account has been created. Please login after admin verification."
          );
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        } else {
          Alert.alert(
            "Congratulations",
            "Your account has been successfully created, but there is one more step to confirm your account with us."
          );
          navigation.reset({
            index: 0,
            routes: [{ name: "VerifyIdentityScreen" }],
          });
        }
      }

    } catch (error) {
      Alert.alert("Sorry", error.response?.data?.message || "فشل إنشاء الحساب، حاول مرة أخرى!");
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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={Styles.container}>
            <View style={Styles.main}>
              <Image
                source={require("../../../assets/images/login.png")}
                style={Styles.image}
              />

              <View style={Styles.inputcontainer}>
                <View style={Styles.textWrapper}>
                  <Text style={Styles.text}>Create An Account</Text>
                </View>

                <View style={Styles.choose}>
                  <User onValueChange={setUserType} value={userType} />
                </View>

                <View style={Styles.wrapper_textinput}>
                  <INput1
                    placeholder="Name"
                    bordered
                    rendericonleft={() => (
                      <Icon2 name="language" size={15} color="#bbb" />
                    )}
                    onChangeText={setName}
                    value={name}
                  />
                  {submitted && !validateName(name) && (
                    <Text style={Styles.warn}>
                      Name must be in English and contain only letters
                    </Text>
                  )}

                  <INput1
                    placeholder="Email"
                    bordered
                    rendericonleft={() => (
                      <Icon name="email" size={15} color="#bbb" />
                    )}
                    onChangeText={setEmail}
                    value={email}
                  />
                  {submitted && !validateEmail(email) && (
                    <Text style={Styles.warn}>You entered an invalid email</Text>
                  )}
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
                    placeholder="Select Gender"
                    datatype={Gender}
                    value={gender}
                    onChange={(item) => setGender(item.value)}
                  />
                  {submitted && !gender && <Text style={Styles.warn}>Select your Gender</Text>}


                  <INput1
                    placeholder="Password"
                    bordered
                    secureTextEntry={secureText}
                    onPress={() => setSecureText(!secureText)}
                    rendericonleft={() => (
                      <Icon2 name="lock" size={15} color="#bbb" />
                    )}
                    rendericonright={() => (
                      <Icon2
                        name={secureText ? "eye-with-line" : "eye"}
                        size={15}
                        color="#bbb"
                      />
                    )}
                    onChangeText={setPassword}
                    value={password}
                  />
                  {submitted && !validatePassword(password) && (
                    <Text style={Styles.warn}>
                      Password must be at least 8 characters and contain one uppercase and one lowercase letter
                    </Text>
                  )}

                  <INput1
                    placeholder="Confirm Password"
                    bordered
                    secureTextEntry={secureTextConfirm}
                    onPress={() => setSecureTextConfirm(!secureTextConfirm)}
                    rendericonleft={() => (
                      <Icon2 name="lock" size={15} color="#bbb" />
                    )}
                    rendericonright={() => (
                      <Icon2
                        name={secureTextConfirm ? "eye-with-line" : "eye"}
                        size={15}
                        color="#bbb"
                      />
                    )}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                  />
                  {submitted &&
                    !validateConfirmPassword(password, confirmPassword) && (
                      <Text style={Styles.warn}>Passwords do not match</Text>
                    )}
                </View>

                {userType === "doctor" && (
                  <>
                    <Text>If you are a Doctor, upload your files</Text>
                    <FilePickerButton />
                  </>
                )}


                <View style={Styles.wrapper_button}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                  ) : (
                    <AppButton title="Sign Up" onPress={handleSubmit} />
                  )}
                </View>

                <View style={Styles.wrapperTouch2}>
                  <TouchButton
                    title1="Have an Account?"
                    title2="Login"
                    title1font={20}
                    onPress={() => navigation.navigate("Login")}
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



//SignUp