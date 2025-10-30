import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { Background } from "../../utils/colors";

export  function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Splash2");
    }, 4000);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/animation/Animation - 1739229810173.json")}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <View style={{justifyContent:'center',alignItems:"center"}}>
      <Text style={styles.text}>Your journey to better health</Text>
     
      <Text style={styles.text}>starts here! 🚀</Text>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Background,
    padding:20
  },
  animation: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 0,
  },
});
