import { ScaledSheet } from "react-native-size-matters";
import { Background, babyblue } from "../../utils/colors";
export const Styles = ScaledSheet.create({
    main: {
        backgroundColor: "#fff",
        flex: 1,
        width: "100%",
        justifyContent: "center", // تثبيت العناصر في مكانها
        borderRadius: "40@s",
        alignItems: "center",
    },
    inputcontainer: {
        width: "100%",
        minHeight: "350@s", // منع انهيار الحاوية عند ظهور الكيبورد
        borderTopLeftRadius: "80@s",
        backgroundColor: babyblue,
        justifyContent: "center",
        marginTop: "50@s",
        padding: "15@s",
        borderBottomLeftRadius: "40@s",
        borderBottomRightRadius: "40@s",
    },
    container: {
        flex: 1,
        backgroundColor: Background,
        padding: "22@s",
        alignItems: "center",
    },
    image: {
        width: '90%',
        height: "190@s",
        resizeMode: "cover",
        marginBottom: "10@s",
        marginTop: "50@s"
    }
    ,
    wrapperButton: {
        marginTop: "80@s",
        justifyContent: "flex-start",
        marginBottom: "50@s",
        alignSelf: 'stretch',
    }
    , textWrapper: {
        alignItems: 'center'
    },
    header: {
        fontSize: "18@s",
        fontWeight: "bold",
        color: "#000"
    },
    discription: {
        fontSize: "12@s",
        color: "#666",
        marginBottom: "30@s",
        textAlign: "center"
    }
})