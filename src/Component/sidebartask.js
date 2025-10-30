import React
 from "react";
import { View ,Text} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../consts/const"

 export function Side(props){
    const {day}=props
     return(
         <View style={styles.conatiner}>
            <Text style={styles.text}> {day}</Text>
         </View>
     )
 }
 const styles=ScaledSheet.create({
    conatiner:{
     
        backgroundColor:"#AEE2FF",
        padding:5,paddingVertical:50,
        borderRightWidth:1,
        borderColor:"#ccc",
       width:"20%",
       borderBottomWidth:1,alignItems:'center',
       justifyContent:"center"
      
    },
    text:{
        fontSize:12,
        color:Colors.primary,
        fontWeight:"800"
    }
 })