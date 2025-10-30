import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create ({
    Header :{
        fontSize:'18@s',
        fontWeight:'bold',
    },
    container :{
        paddingHorizontal:'10@s',
    },
    iconContainer :{
        backgroundColor:'white',
        width:'60@s',
        height:'60@s',
        borderRadius:'50%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'15@s',
        marginHorizontal:'10@s',
    },
    icon :{
        width:'100%',
        height:'100%',
    },
    iconName :{
        fontSize:'13@s',
        textAlign:'center'
    },
    
});

export default styles;