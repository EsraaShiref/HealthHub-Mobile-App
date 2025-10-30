import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    Alert
} from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

export function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email address.");
            return;
        }

        // تحقق من صحة الإيميل
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://10.0.2.2:8000/api/otp/password/reset/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // مشابه لرؤوس curl
                    "Accept": "application/json",
                },
                body: JSON.stringify({ email }), // إرسال البيانات كـ JSON
            });

            const data = await response.json();
            console.log("Response Data:", data); // ← اطبعي الداتا هنا


            if (response.ok) {
                Alert.alert("Success", "An OTP has been sent to your email.", [
                    { text: "OK", onPress: () => navigation.navigate("EmailSentScreen") }
                ]);
            } else {
                Alert.alert("Error", data.message || "Something went wrong");
                console.log(data.message)
            }
        } catch (error) {
            Alert.alert("Network Error", "Please check your internet connection.");
        } finally {
            setLoading(false);
        }
    };




    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.circleWrapper}>
                <View style={styles.circleYellow} />
                <View style={styles.circleGreen} />
                <View style={styles.circleBlue} />
            </View>

            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
                Please, enter your email address below to receive a new password
            </Text>

            <TextInput
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={styles.buttonText}>Reset Password</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
}
