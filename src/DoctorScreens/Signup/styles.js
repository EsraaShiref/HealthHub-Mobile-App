import { Text, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Background, babyblue } from "../../utils/colors";

const Styles = ScaledSheet.create({
    main: {
        backgroundColor: "#fff",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        borderRadius: "40@s",
        alignItems: "center",
    },
    inputcontainer: {
        width: "100%",
        flex: 1, 
        borderTopLeftRadius: "80@s",
        backgroundColor: babyblue,
        justifyContent: "center",
        marginTop: "25@s",
        padding: "13@s",
        borderBottomLeftRadius: "40@s",
        borderBottomRightRadius: "40@s"
    },
    container: {
        flex: 1,
        backgroundColor: Background,
        padding: "22@s",
        alignItems: "center",
    },
    text: {
        fontSize: "21@s",
        color: "#333333",
        fontWeight: "bold",
    },
    image: {
        width: '80%',
        height: "100@s",
        resizeMode: "cover",
        marginBottom: "30@s",
    },
    wrapper_textinput: {
        flex: 4,
        alignSelf: "stretch",
        justifyContent: 'center',
    },
    wrapper_button: {
        flex: 1,
        justifyContent: "center",
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
    choose: {
        flex: 1,
        width: '100%',
        marginTop: "20@s",
    },
    warn: {
        fontSize: "12@s",
        color: '#f00',
    }
});

export default Styles;
