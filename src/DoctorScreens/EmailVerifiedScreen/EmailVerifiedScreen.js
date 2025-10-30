import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import Styles from "./style";
import LottieView from "lottie-react-native";


export function EmailVerifiedScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.circleWrapper}>
                <View style={styles.circleYellow} />
                <View style={styles.circleGreen} />
                <View style={styles.circleBlue} />
            </View>
            <Image source={require("../../../assets/images/Telescope.png")} style={Styles.img}></Image>

            <Text style={styles.title}>Congratulations,Your Email verified successfully</Text>
            <Text style={styles.subtitle}>We hope you have an easy and unique experience with our app.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
