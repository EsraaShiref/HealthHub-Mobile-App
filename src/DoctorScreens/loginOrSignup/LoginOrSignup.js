import React, { useEffect } from "react";
import { Styles } from "./Styles";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AppButton } from "../../Component/AppButton";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Icon from "react-native-vector-icons/FontAwesome"; // أيقونة Google

export function Choose(props) {
  const { navigation } = props;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "324359535124-5avsqj7rapuq1veutngu21mo5bfemnkb.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();

      const response = await fetch("http://10.0.2.2:8000/api/auth/google/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        Alert.alert("تم تسجيل الدخول", `مرحباً ${data.data.name}`);
        // navigation.navigate("Home");
      } else if (data.msg === "Need to complete register") {
        navigation.navigate("CompleteRegister", {
          token: data.token,
        });
      } else {
        Alert.alert("خطأ", data.msg || "فشل تسجيل الدخول");
      }

    } catch (error) {
      console.error("Google Signin Error:", error.code, error.message);
      Alert.alert("خطأ", "حدث خطأ أثناء تسجيل الدخول بـ Google");
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.main}>
        <Image
          source={require("../../../assets/images/login.png")}
          style={Styles.image}
        />
        <View style={Styles.inputcontainer}>
          <View style={Styles.textWrapper}>
            <Text style={Styles.header}>Find Best Specialists,</Text>
            <Text style={Styles.discription}>Treatments and Job Opportunities in Our Specialist App</Text>
          </View>

          <AppButton
            title={"Login"}
            onPress={() => navigation.navigate("Login")}
            wrapperStyle={{ marginVertical: 8, borderRadius: 25 }}
          />
          <AppButton
            title={"SignUp"}
            onPress={() => navigation.navigate("SignUp")}
            wrapperStyle={{ marginVertical: 8, borderRadius: 25 }}
          />
          <Text style={{textAlign:'center'}}>Or</Text>

          {/* Google Login Button with icon */}
          <TouchableOpacity
            onPress={handleGoogleLogin}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              paddingVertical: 12,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: '#ccc',
              marginVertical: 8,
            }}
          >
            <Icon name="google" size={20} color="#db4437" style={{ marginRight: 10 }} />
            <Text style={{ color: '#333', fontSize: 16, fontWeight: '600' }}>
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
