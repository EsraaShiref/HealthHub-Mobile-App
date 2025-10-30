import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    TextInput,
    ActivityIndicator,
    Alert,
    ScrollView
} from "react-native";
import Styles from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export function VerifyEmailScreen() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params || {}; // استلام الإيميل من الشاشة السابقة

    const handleChange = (text, index) => {
        if (!/^\d*$/.test(text)) return; // السماح بالأرقام فقط

        const updated = [...otp];
        updated[index] = text;
        setOtp(updated);

        // التنقل تلقائيًا للصندوق التالي
        if (text && index < otp.length - 1) {
            const nextInput = `otpInput-${index + 1}`;
            const nextField = inputRefs[nextInput];
            if (nextField) nextField.focus();
        }
    };

    // مراجع مربعات الـ OTP
    const inputRefs = {};

    const handleVerify = async () => {
        const fullOtp = otp.join("");

        if (fullOtp.length !== 6) {
            Alert.alert("Invalid OTP", "Please enter all 6 digits.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "http://10.0.2.2:8000/api/otp/email/verification/verify",
                {
                    email,
                    otp: fullOtp,
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                // Alert.alert("Success", "Email verified successfully.");
                navigation.navigate("EmailVerified");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Verification Failed", error?.response?.data?.message || "Incorrect OTP.");
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

                <Image source={require("../../../assets/images/Telescope.png")} style={Styles.img} />

                <Text style={Styles.title}>Verify Email Address</Text>
                <Text style={Styles.subtitle}>
                    Check your mail for a 6-digit OTP code has been sent to{" "}
                    <Text style={Styles.emailText}>{email}</Text>.
                </Text>

                <View style={Styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs[`otpInput-${index}`] = ref)}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            style={Styles.otpBox}
                        />
                    ))}
                </View>

                <Text style={Styles.resendText}>Didn’t receive code? Resend</Text>

                <TouchableOpacity
                    style={Styles.verifyBtn}
                    onPress={handleVerify}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={Styles.verifyText}>Verify Email</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
