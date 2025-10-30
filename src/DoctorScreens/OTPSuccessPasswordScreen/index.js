import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";


export function SuccessPasswordScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.circleWrapper}>
                <View style={styles.circleYellow} />
                <View style={styles.circleGreen} />
                <View style={styles.circleBlue} />
            </View>
            <Text style={styles.title}>New password confirmed successful</Text>
            <Text style={styles.subtitle}>Password reset e-mail has been sent successfully</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
