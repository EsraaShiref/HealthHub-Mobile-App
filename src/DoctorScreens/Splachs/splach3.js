import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Background } from "../../utils/colors";
import { Button } from "../../Component/button";
import { AppButton } from "../../Component/AppButton";

export  function Splash3({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/images/Group.png")} style={styles.animation} />
      
      <View style={styles.textContainer}>
        <Text style={styles.text}>Find all your needs here, Nutrition</Text>
        <Text style={styles.text}>Fitness, and More! 💪🚀 </Text> 
      </View>
<View style={{alignSelf:"flex-end",marginTop:16,width:"30%"}}>
      <AppButton title={"Next"} onPress={() => navigation.navigate("LoginOrSignup")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Background,
    padding: 20,
    paddingTop:90
  },
  animation: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80, // إضافة مسافة بين النص والزر
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
