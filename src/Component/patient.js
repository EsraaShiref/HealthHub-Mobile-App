import React from 'react'
import { TouchableOpacity, View ,Text} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { Colors } from "../consts/const"

import Entypo from "react-native-vector-icons/Entypo";
export function Patient (props){
    const {name,title,month,date,name2}=props
    return(
        <View style={styles.container}>

<View style={styles.wrapper}>
    <View style={{flexDirection:"row"}}>

<View style={styles.textwrapper}>
<Text style={styles.title}>{title}</Text>
<View style={styles.time}>

    <Entypo name={name}size={15} color="gray" />

<Text style={styles.disc}> {month}</Text>
<Text style={styles.disc}> {date}</Text>
</View>

</View>
</View>

    <Entypo name={name2}size={15} color={Colors.primary} />


</View>
        </View>
    )
}
const styles =ScaledSheet.create({
    container: {
        marginTop: 10,
        width: '100%',         
    },
    wrapper:{
        alignSelf: 'center',borderColor:"#BBBB",
        borderWidth:1
         ,  backgroundColor: "#fefefe",
        borderRadius: 10,
      
        width:"99%",
        flexDirection:'row',
        paddingRight:30,
        paddingStart:5,
        paddingVertical:10,
      
        
         
        alignItems:"center",
        marginLeft:10,
    
       
       
        justifyContent:"space-between"
    },textwrapper:{
        marginLeft:5
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },IconContainer: {
        width: "20@s",
        height: "20@s",
        borderRadius: "10@s",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:Colors.primary
    },
    title: {
        fontSize: "16@s",
        fontWeight: "bold",
        marginLeft: 0,
        color: "black",
    },
    disc: {
        fontSize: "12@s",
        color: "gray",
       
      
    },
    textwrapper:
    {
       marginLeft:10,
       width:"90%"  
    },
    icon2:
    {
        alignSelf:"center",
    },
    time:{
        flexDirection:'row'
        }
})