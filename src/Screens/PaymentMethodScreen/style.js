import { ScaledSheet } from "react-native-size-matters";
import { TINT_COLOR ,PrimaryColor } from "../../utils/colors";

const styles = ScaledSheet.create({
    container :{
        flex:1,
        paddingHorizontal:'15@s',
        paddingVertical:"20@s",
    },
    card :{
        paddingHorizontal:"15@s",
    },
    Cost :{
        flexDirection:'row',
        marginVertical:'6@s',
        justifyContent:'space-between',
    },
    CostText :{
        fontSize:'14@s',
        color:PrimaryColor,
    },
    CostText1 :{
        fontSize:'16@s',
        color:"#000",
    },
    totalPayment: {
        justifyContent: "space-between",
        borderTopWidth: "1@s",
        borderTopColor: "#DDD",
        paddingTop: "10@s",
        marginTop: "20@s",
    },
    totalLabel: {
        fontSize: "14@s",
        fontWeight: "bold",
        color: "#000",
        marginVertical: "20@s",
    },
    paymentOption: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "13@s",
        borderWidth: "1@s",
        borderColor: "#ccc",
        borderRadius: "10@s",
        marginBottom: "13@s",
        backgroundColor: "#fff",
    },
    selectedOption: {
        borderColor: "#3498db",
        backgroundColor: "#ecf6ff",
    },
    proceedButton: {
        marginVertical: "20@s",
        borderRadius: "10@s",

    },
    paymentIcon: {
        marginRight: "13@s",
        alignSelf: "center"
    },
    paymentText: {
        flex: 1,
        fontSize: "14@s",
        color: "#000",
        fontWeight: "500",
    },
    input: {
        height: "50@s",
        borderColor: "#ccc",
        borderWidth: "1@s",
        borderRadius: "10@s",
        paddingHorizontal: "15@s",
        marginTop: "2@s",
        fontSize: "13@s",
        backgroundColor: "#fff",
        marginBottom: "10@s",
      },
      
    
});

export default styles;