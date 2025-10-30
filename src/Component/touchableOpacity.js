import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export function TouchButton(props) {
  const { title1="", title2, onPress ,position ,title2font,title1font} = props;
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={styles.text}>{title1}</Text>
        {title2 ? <Text style={styles.title2}>{title2}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
 
  text: {
    fontSize: "12@s",
    color: "#000",
    fontWeight:'600'
  },
  title2: {
    fontSize: "18@s",
    color: "#0070FF",
    fontWeight:'bold'
  },
});
