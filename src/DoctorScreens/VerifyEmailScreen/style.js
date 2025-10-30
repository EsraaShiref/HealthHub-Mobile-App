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

const Styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8FA",
        padding: "20@s",
        justifyContent: "center",
    },
    img: {
        width: "250@s",
        height: "250@s",
        alignSelf: 'center',
    },
    txt: {
        fontSize: "15@s",
        color: "#0D0D26",
        marginBottom: "24@s",
        textAlign: 'center',
        marginVertical: '20@s',
    },
    proceedButton: {
        backgroundColor: "#D1D5DB",
        padding: "16@s",
        borderRadius: "12@s",
        alignItems: "center",
    },
    proceedText: {
        color: "#6B7280",
        fontWeight: "600",
        fontSize: "14@s",
    },
    circleWrapper: {
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
        fontSize: "18@s",
        fontWeight: "700",
        color: "#0D0D26",
        marginBottom: "24@s",
    },
    subtitle: {
        color: "#666C8E",
        fontSize: "12@s",
        marginBottom: "20@s",
    },
    emailText: {
        color: "#0D0D26",
        fontWeight: "500",
    },
    resendText: {
        color: "#2563EB",
        textAlign: "center",
        marginVertical: "12@s",
    },
    verifyBtn: {
        backgroundColor: "#2563EB",
        padding: "16@s",
        borderRadius: "12@s",
        alignItems: "center",
        marginTop: "12@s",
    },
    verifyText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: "14@s",
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "16@s",
    },
    otpBox: {
        borderWidth: "1@s",
        borderColor: "#D1D5DB",
        borderRadius: "8@s",
        width: "48@s",
        height: "56@s",
        textAlign: "center",
        fontSize: "18@s",
        color: "#111827",
    },
    verifiedBadge: {
        color: "green",
        fontWeight: "bold",
        fontSize: "12@s",
        position: "absolute",
        right: "16@s",
        top: "18@s",
    },
});

export default Styles;
