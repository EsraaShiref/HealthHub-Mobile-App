import { Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { Background , babyblue} from "../../utils/colors";
export const Styles = ScaledSheet.create({image:{
    width:'90%', height: "110@s", 
    resizeMode: "cover",
    marginVertical:30
},  
choose:{
    // flex:1,

    width:'100%',marginTop:10
    

},
   main: {
          backgroundColor: "#fff",
          flex: 1,
          width: "100%",
          justifyContent: "center",
          borderRadius: 40,
          alignItems: "center",
          // منع العناصر من الاختفاء عند ظهور الكيبورد
      },
      inputcontainer: {
          width: "100%",
          flex: 1, // جعل المحتوى يتكيف مع حجم الشاشة
          borderTopLeftRadius: 80,
          backgroundColor:babyblue,
          justifyContent: "center",
      
          padding: 15,borderBottomLeftRadius:40,borderBottomRightRadius:40,paddingTop:50
      },
      container: {
          flex: 1,
          backgroundColor:Background,
          padding: 24,
          alignItems: "center",
      },
    text: {
        fontSize: 24,
        color: "#333333"
    }
   ,
    wrapper_textinput:{
        flex:8,
      
        alignSelf:"stretch",
        justifyContent:'center'
      
        
    }
    ,wrapper_button:{

        justifyContent:"center",marginBottom:60, 
        alignSelf:'stretch'
    },
    
    
   choose:{
        flex:1,
  
        width:'100%',marginTop:20
        

    },
    warn:{
        fontSize:"12@s",
        color:'#f00'
     }
})