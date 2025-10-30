import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./style";
import { PlatformTouchable } from "../PlatformTouchable";
import { useNavigation } from "@react-navigation/native";

export function PatientComponent({ name, image}) {
  const navigation = useNavigation();

  // الاسم الافتراضي
  const displayName = name?.trim() ? name : "Esraa Shiref";

  // الصورة الافتراضية
  const displayImage =
  typeof image === "string"
    ? { uri: image }
    : image ||null ;


  return (
    <PlatformTouchable
      onPress={() => {
        navigation.navigate("Profile");
      }}
    >
      <View style={styles.container}>
        <View style={styles.image}>
          <Image source={displayImage} style={styles.image} />
        </View>
        <View >
          <Text style={styles.title1}>Hello {displayName}</Text>
          <Text style={styles.title2}>Good Morning</Text>
        </View>
      </View>
    </PlatformTouchable>
  );
}
