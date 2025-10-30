import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";


export function EmailSentScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleWrapper}>
        <View style={styles.circleYellow} />
        <View style={styles.circleGreen} />
        <View style={styles.circleBlue} />
      </View>
      <Text style={styles.title}>Password reset e-mail has been sent</Text>
      <Text style={styles.subtitle}>Check your email inbox for instructions</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NewPassword")}>
        <Text style={styles.buttonText}>Go to email</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
