import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";
import { Image } from "react-native";

export function Job(props) {
    const { disc,imagee,onpress} = props;

    return (
        <TouchableOpacity style={styles.container} onPress={onpress}>
             <LinearGradient 
               colors={["#1565C0", "#FFFFFF"]}
                style={{padding:20,alignItems:"center",width:"100%",borderWidth: .5,
                    borderColor: "#bbb",
                    borderRadius: 10,}}
            >
                <Image source={imagee} style={styles.Image}/>
                <Text style={styles.text}>{disc}</Text>
            </LinearGradient>  
        </TouchableOpacity>
    );
}

const styles = ScaledSheet.create({
    container: {
        width: "47%",
        alignItems: "center",
        marginBottom: "10@vs",
        
    },
    Image:{
        width:"90@s",
        height:"90@s",
        borderRadius:"45@s"
    },
    textcontainer:{
     width: "100%",
      
    },
    iconContain: {
        width: "50@s",
        height: "30@s",
        borderRadius: "10@s",
        justifyContent: "center",
        alignItems: "center",
    },
    num: {
        fontSize: "16@s",
        fontWeight: "bold",
        marginLeft: "10@s",
        color: "black",
    },
    text: {
        fontSize: "16@s",
        color: "#000",
        fontWeight:'700',
        marginTop:"5@s"
    }
});
