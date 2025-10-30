import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { Colors } from "../consts/const";
import { ScaledSheet } from "react-native-size-matters";
import { RadioButton } from "react-native-paper";
import { PrimaryColor } from "../../utils/colors";

export function User(props) {
  const { value, onValueChange } = props;

  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      <View style={styles.wrapper}>
        {/* Doctor Button */}
        <TouchableOpacity
          style={[
            styles.container,
            value === "doctor" ? { borderColor: PrimaryColor } : null,
          ]}
          onPress={() => onValueChange("doctor")}
        >
          <Image source={require("../../../assets/images/doctor.png")} style={styles.image} />
          <Text style={styles.text}>Doctor</Text>
          <RadioButton value="doctor" />
        </TouchableOpacity>

        {/* Client Button */}
        <TouchableOpacity
          style={[
            styles.container,
            value === "client" ? { borderColor: PrimaryColor } : null,
          ]}
          onPress={() => onValueChange("client")}
        >
          <Image source={require("../../../assets/images/user1.png")} style={styles.image} />
          <Text style={styles.text}>Client</Text>
          <RadioButton value="client" />
        </TouchableOpacity>
      </View>
    </RadioButton.Group>
  );
}

const styles = ScaledSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    backgroundColor: "#ffff",
    padding: "10@s",
    width: "30%",
    height: "100@s",
    borderRadius: 5,
    marginBottom: "10@s",
    borderColor: "#bbb",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "40@s",
    height: "40@s",
    borderRadius: 20,
  },
  text: {
    fontSize: "12@s",
    color: "#000",
    fontWeight: "400",
  },
});
