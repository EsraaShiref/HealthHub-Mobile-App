import { StyleSheet } from "react-native";
import { Colors } from "../../consts/const"
export const Styles=StyleSheet.create({
    orderinfo:{
        borderBottomWidth:1,
        width:"100%",
        borderColor:'#bbb',
        paddingHorizontal:10

    },
    title:{ fontSize:20,
        fontWeight:"700",
        color:"#000",marginBottom:10
    },
    disc:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',marginBottom:10
    },
    text1:{
        fontSize:14,
    },
    text2:{
        fontSize:12,
        color:Colors.primary,
        fontWeight:'bold'
    }, container: {
        flex: 1,
     
        backgroundColor: "rgb(245, 253, 255)",
    },
    totalContainer: {
       
        alignItems:"center",
        width:"30%",
        flexDirection:"column"
    },
    totalText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    paymentButton: {
      
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        width:"50%"
    },
    paymentText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 18,
        marginTop: 20,
        color: "#666",
    },footer:{
        backgroundColor:'#fff',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        flexDirection:'row',
        justifyContent:"space-around",
        alignItems:"center" , borderWidth:1,marginTop:10,
        borderColor:"#ccc",
        width:"100%"
        ,
        paddingVertical:20
    },
    pricee:{
        fontSize: 18,
        fontWeight: "bold",
        color:Colors.primary,
      

    }
})