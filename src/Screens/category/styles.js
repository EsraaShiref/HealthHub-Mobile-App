import { Colors } from "../../consts/const";
import { ScaledSheet } from "react-native-size-matters";

export const Styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        flexDirection:"row",
        flexWrap:'wrap',
        justifyContent:"space-between"
      }
      ,header:{width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:10},
      pagename:{fontSize:24,fontWeight:"semibold"},
  
      cardwrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 8,
      } }
    )