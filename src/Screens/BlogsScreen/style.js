import { ScaledSheet } from "react-native-size-matters";
import { TINT_COLOR , PrimaryColor} from "../../utils/colors";

const styles = ScaledSheet.create ({
    container :{
        paddingHorizontal:'15@s',
        paddingVertical:'40@s',
        backgroundColor:'white',
        height: '100%',
    },
    
    Card :{
        flexDirection:'row',
        padding:"15@s",
        marginVertical:"13@s",
    },
    con1:{
        justifyContent:'center',
        alignItems:'center'
    },
    con2:{
        marginLeft:'10@s'
    },
    blogTitle :{
        fontSize:'16@s',
        fontWeight:'bold',
    },
    blogContent:{
        fontSize:'12@s',
        marginTop:'5@s',
        color:PrimaryColor,
    },
    button :{
        backgroundColor:"#CEE3F6",
        width:"60%",
        marginTop:'10@s',
    },
    buttontitle :{
        color:TINT_COLOR,
        fontWeight:'bold'
    }
});

export default styles;