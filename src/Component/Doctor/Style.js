import { ScaledSheet } from "react-native-size-matters";
import { TINT_COLOR } from "../../utils/colors";

const styles = ScaledSheet.create({
    container :{
        paddingVertical:'18@s',
    },
    Header :{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:'10@s',
        alignItems:'center',
    },
    title : {
        fontSize:'18@s',
        fontWeight:'bold',
        
    },
    
    title1 :{
        fontSize:'14@s',
    },
    image :{
        width:'90@s',
        height:'95@s',
        borderRadius:'10@s',
    },
    DoctorComponent:{
        padding:'10@s',
    },
    wrapper :{
        flexDirection:'row',
    },
    DoctorName :{
        fontSize:'14@s',
        fontWeight:'bold',
    },
    wrapper1 :{
        marginLeft:'10@s',
    },
    wrapper2 :{
        flexDirection:'row',
        marginTop:'5@s',
        alignItems: 'center',
    },
    wrapper3:{
        width:'83%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
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
    wrapperIcon : {
        flexDirection:'row',
        marginVertical:'3@s'
    },
    dateButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        borderRadius:'10@s',
        paddingVertical: "8@s",
        paddingHorizontal: "14@s",
      },
      buttonText: {
        fontSize: '13@s',
        color: "#333",
      },
      datePickerContainer: {
        flexDirection:'row',
        paddingVertical: "5@s",
      },
      Search:{
        paddingHorizontal: "10@s",
      },
      searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ddd",
        borderWidth: "1@s",
        borderRadius: "10@s",
        marginVertical: "7@s",
        paddingHorizontal: "10@s",
      },
      searchIcon: {
        marginRight: "8@s",
      },
      searchInput: {
        flex: 1,
        fontSize: 16,
      },

      
});

export default styles;