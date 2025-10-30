import React from "react";
import { View, TextInput } from "react-native";
import Styles from "../DoctorScreens/VerifyIdentityScreen/style";

export function OTPInput ({ otp, setOtp }) {
  return (
    <View style={Styles.otpContainer}>
      {[...Array(6)].map((_, index) => (
        <TextInput
          key={index}
          style={Styles.otpBox}
          maxLength={1}
          keyboardType="numeric"
          value={otp[index] || ""}
          onChangeText={(text) => {
            const newOtp = otp.split("");
            newOtp[index] = text;
            setOtp(newOtp.join(""));
          }}
        />
      ))}
    </View>
  );
};
