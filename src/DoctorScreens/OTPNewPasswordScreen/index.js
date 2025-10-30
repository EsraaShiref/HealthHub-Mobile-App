import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    ActivityIndicator,
} from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

export function NewPasswordScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePasswordStrength = (password) => {
        // على الأقل 8 أحرف، بها حرف كبير وصغير ورقم ورمز خاص
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };
    const handleSubmit = async () => {
        if (!email || !otp || !password || !repassword) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert("Error", "Please enter a valid email address.");
            return;
        }

        if (!validatePasswordStrength(password)) {
            Alert.alert(
                "Weak Password",
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
            );
            return;
        }

        if (password !== repassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://10.0.2.2:8000/api/otp/password/reset/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp,
                    password,
                    password_confirmation: repassword,
                }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                Alert.alert("Success", "Password reset successful.", [
                    { text: "OK", onPress: () => navigation.navigate("SuccessPassword") },
                ]);
            } else {
                let errorMsg = data.message || "Something went wrong.";
                if (data.errors) {
                    const firstError = Object.values(data.errors)[0][0];
                    errorMsg = firstError;
                }
                Alert.alert("Error", errorMsg);
            }
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", "Network error. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.circleWrapper}>
                <View style={styles.circleYellow} />
                <View style={styles.circleGreen} />
                <View style={styles.circleBlue} />
            </View>

            <Text style={styles.title}>Set new password</Text>

            <Text style={styles.subtitle}>
                - At least 8 characters long{"\n"}
                - Upper and lowercase letters{"\n"}
                - At least one number and special character
            </Text>

            <TextInput
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />

            <TextInput
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                style={styles.input}
                keyboardType="numeric"
            />

            <TextInput
                placeholder="Enter new password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <TextInput
                placeholder="Re-enter password"
                value={repassword}
                onChangeText={setRepassword}
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
}
