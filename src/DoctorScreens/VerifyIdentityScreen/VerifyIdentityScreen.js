import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView
} from "react-native";
import Styles from "./style";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export function VerifyIdentityScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSendOTP = async () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/otp/email/verification/send",
        { email },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "OTP sent successfully!");
        navigation.navigate("VerifyEmail", { email }); // تمرير الإيميل للشاشة التالية
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (error) {
      Alert.alert("Attention", error?.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
        <View style={Styles.container}>
      <View style={Styles.circleWrapper}>
        <View style={Styles.circleYellow} />
        <View style={Styles.circleGreen} />
        <View style={Styles.circleBlue} />
      </View>

      <View style={{paddingHorizontal:20,marginTop:20}}>
        <Image source={require("../../../assets/images/Telescope.png")} style={Styles.img} />

      <Text style={Styles.title}>Verify your Email</Text>
      <Text style={Styles.subtitle}>
        Please, enter your email address below to receive an OTP to verify your E-mail
      </Text>

      <TextInput
        placeholder="Enter email address"
        value={email}
        onChangeText={setEmail}
        style={Styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={Styles.button} onPress={handleSendOTP} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={Styles.buttonText}>Send OTP</Text>
        )}
      </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}
