import { ScaledSheet } from "react-native-size-matters";
import { primary} from "../../utils/colors";

export const Styles = ScaledSheet.create({
  container: {
    backgroundColor: "#F5F8FF",
    paddingHorizontal: "10@s",
    paddingTop: "20@s",
    height:"10000000%"
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "20@s",
  },
  headertext: {
    fontSize: "15@s",
    fontWeight: "600",
  },
  
   card :{ 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: "12@s", 
    padding: "12@s", 
    borderRadius: "16@s" 
  },
  img:{ 
    width: "60@s", 
    height: "60@s", 
    borderRadius: "30@s", 
    marginRight: "12@s" 
  },
  clientname:{ 
    fontSize: "14@s", 
    fontWeight: "bold", 
    color: "#1F2937", 
    marginVertical: "3@s" 
  },
  clientmail:{ 
    fontSize: "12@s", 
    color: "#6B7280", 
    marginVertical: "3@s" 
  },
  timeCont:{
     alignItems: "center",
     justifyContent: "center",
     backgroundColor:primary + "22",
     paddingVertical: "6@s",
     paddingHorizontal: "8@s",
     borderRadius:"12@s",
     marginRight: "12@s",
     marginVertical: "10@s",
     },
  Timetxt:{ 
    color: "#333", 
    fontSize: "13@s" 
  },    
});
