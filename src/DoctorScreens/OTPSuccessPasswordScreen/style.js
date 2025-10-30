import { ScaledSheet } from "react-native-size-matters";
import {
    primary1,
    text,
    background,
    border,
    warning,
    success,
    babyblue,
} from "../../utils/colors";

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: babyblue,
        padding: "20@s",
        justifyContent: "center",
    },
    circleWrapper: {
        position: "absolute",
        top: "0@s",
        left: 0,
        right: 0,
        height: "160@s",
    },

    circleYellow: {
        position: "absolute",
        top: "35@s",
        left: "35@s",
        width: "90@s",
        height: "90@s",
        borderRadius: "45@s",
        backgroundColor: "#FFD966",
    },

    circleGreen: {
        position: "absolute",
        top: "-30@s",
        right: "100@s",
        width: "70@s",
        height: "70@s",
        borderRadius: "35@s",
        backgroundColor: success,
        opacity: 0.9, // عشان تبان تحت اللون الأصفر لو فيه تداخل
    },

    circleBlue: {
        position: "absolute",
        top: "85@s",
        right: "40@s",
        width: "60@s",
        height: "60@s",
        borderRadius: "30@s",
        backgroundColor: "#A4C2F4",
    },

    title: {
        fontSize: "22@s",
        fontWeight: "bold",
        marginBottom: "8@s",
        color: text,
        textAlign: "center",
    },
    subtitle: {
        textAlign: "center",
        color: "#555",
        marginBottom: "20@s",
    },
    input: {
        borderWidth: "1@s",
        borderColor: border,
        borderRadius: "10@s",
        padding: "12@s",
        marginBottom: "20@s",
    },
    button: {
        backgroundColor: primary1,
        padding: "13@s",
        borderRadius: "10@s",
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default styles;
