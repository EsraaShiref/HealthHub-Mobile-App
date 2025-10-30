import { Text, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
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
        marginTop: "80@s",
        padding: "13@s",
        borderBottomLeftRadius: "40@s",
        borderBottomRightRadius: "40@s",

    },
    container: {
        flex: 1,
        backgroundColor: Background,
        padding: "22@s",
        alignItems: "center",
    },
    text: {
        fontSize: "20@s",
        color: "#000",
        fontWeight: "bold", textAlign: "center", marginVertical: "20@s"
    },
    image: {
        width: '90%',
        height: "100@s",
        resizeMode: "cover",
        marginVertical: "50@s",
    },
    wrapper_textinput: {
        flex: 2,
        alignSelf: "stretch",
        justifyContent: 'center',
        marginTop: "60@s",
        alignSelf: 'center',
        minHeight: "50@s", // تثبيت حجم الحقل لتجنب التحرك
    },
    wrapper_button: {
        flex: 1,
        justifyContent: "center",
        marginBottom: "50@s",
        alignSelf: 'stretch',
    },
    textWrapper: {
        justifyContent: 'flex-start',
        marginBottom: "20@s",
        alignSelf: 'center',
    },
    wrapperTouch: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-start",
        paddingRight: "5@s",
    },
    wrapperTouch2: {
        alignItems: "center",
        paddingBottom: "20@s",
    },
    warn: {
        fontSize: "12@s",
        color: '#f00',
    },
    forgtpassbtn: {
        alignItems: "flex-end",
    },
    forgotPassText: {
        fontSize: "12@s",
        color: "#007BFF",
        textAlign: "right",
        textDecorationLine: "underline",
    },
});
