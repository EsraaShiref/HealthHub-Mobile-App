import { ScaledSheet } from "react-native-size-matters";

export const Styles = ScaledSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: "8@s",
        height:'100%'
    },
    tiltle: {
        color: "black",
        fontSize: "20@s",
        fontWeight: "500",
        paddingHorizontal:"12@s"

    },
    taskWrapper: {
        width: "100%",
        marginTop: "20@s",
    },
    taskWrapperwrapper: {
        marginVertical: "10@s",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingHorizontal:"12@s",

    },
    databtns :{
        paddingHorizontal:"12@s"

    },
});
