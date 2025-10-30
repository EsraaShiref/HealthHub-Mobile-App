import { ScaledSheet } from "react-native-size-matters";
import { TINT_COLOR } from "../../utils/colors";

const style = ScaledSheet.create({
    container :{
        padding: "20@s", 
        backgroundColor: "#fff", 
        flexGrow: 1
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius:'10@s',
        padding: "8@s",
        elevation: 5,
        alignItems: "center",
        width: "95%",
    },
    image :{
        width:'80@s',
        height:'80@s',
        borderRadius:'10@s',
    },
    starFull: {
        fontSize: "16@s",
        color: "orange",
        marginRight: "2@s",
    },
    starOutline: {
        fontSize: "16@s",
        color: "orange",
        marginRight: "2@s",
    },
    wrapper1 :{
        marginLeft:'10@s',
    },
    wrapper3:{
        width:'83%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    DoctorName :{
        fontSize:'14@s',
        fontWeight:'bold',
    },
    wrapper2 :{
        flexDirection:'row',
        marginTop:'3@s',
        alignItems: 'center',
    },
    
    title3 :{
        fontSize:'12@s',
        color:TINT_COLOR,
    },
    title4 :{
        fontSize:'10@s',
        color:'grey',
        marginLeft:'5@s'
    },
    title5 :{
        fontSize:'11@s',
        color:'grey',
        textDecorationLine:'underline',
    },
    starContainer: {
        flexDirection: "row",
        marginTop: "5@s",
        marginVertical: "3@s" 

      },
    starFull: { 
        fontSize: "15@s", 
        color: "orange", 
        marginRight: "2@s" 
    },
    starOutline: {     
        fontSize: "15@s",  
        color: "#ddd", 
        marginRight:"2@s" ,
    },
    section: { 
        marginVertical: "15@s",
    },
    sectionTitle: { 
        fontSize: "15@s", 
        fontWeight: "bold", 
        marginBottom: "10@s" 
    },
    toggleContainer: { 
        flexDirection: "row", 
        borderRadius: "10@s", 
        overflow: "hidden", 
        backgroundColor: "#F3F3F3" 
    },
    toggleButton: { 
        flex: 1, 
        padding: "10@s", 
        alignItems: "center" 
    },
    activeButton: { 
        backgroundColor: TINT_COLOR 
    },
    toggleText: { 
        fontSize: "12@s", 
        color: "#777" 
    },
    activeText: { 
        color: "#fff" 
    },
    row: { 
        flexDirection: "row", 
        justifyContent: "space-between" ,
    },
    dateButton: { 
        padding: "5@s", 
        borderRadius: "10@s", 
        borderWidth: "1@s", 
        borderColor: "#ddd", 
        alignItems: "center", 
        flex: 1, 
        marginHorizontal: 5,
    },
    activeDate: { 
        backgroundColor: TINT_COLOR, 
        borderColor: TINT_COLOR,   
    },
    activeSlotText: {
        color: "#fff",
    },
    dateText: { 
        fontSize: "13@s", 
        fontWeight: "bold" 
    },
    slotText: { 
        fontSize: "9@s", 
        color: "#777",
    },
    grid: { 
        flexDirection: "row", 
        flexWrap: "wrap", 
        justifyContent: "space-between" 
    },
    timeButton: { 
        padding: "8@s", 
        borderRadius: "8@s", 
        borderWidth: "1@s", 
        borderColor: "#ddd", 
        alignItems: "center", 
        width: "30%", 
        marginVertical: "4@s" 
    },
    activeTime: { 
        backgroundColor:TINT_COLOR, 
        borderColor: TINT_COLOR 
    },
    timeText: { 
        fontSize: "12@s", 
    },
    activeText: { 
        color: "#fff" 
    },
    contactButton: { 
        borderWidth: "1@s", 
        borderColor: TINT_COLOR, 
        backgroundColor: "transparent", 
        marginBottom: "10@s" 
    },
    contactText: { 
        color: TINT_COLOR
    },
    bookButton: { 
        backgroundColor: TINT_COLOR 
    },
     
      
});

export default style;