import { ScaledSheet } from "react-native-size-matters";
import { primary, TINT_COLOR } from "../../utils/colors";
const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
        padding: "20@s",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: "22@ms",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "20@vs",
        color: "#3B5AFB",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: "10@ms",
        padding: "10@ms",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "14@vs",
    },
    inputText: {
        fontSize: "16@ms",
        marginLeft: "10@ms",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: "10@ms",
        padding: "10@ms",
        fontSize: "16@ms",
        marginBottom: "12@vs",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "10@s",
        marginBottom: "14@vs",
    },
    halfInput: {
        flex: 1,
    },
    label: {
        fontSize: "14@ms",
        color: "#333",
        marginBottom: "6@vs",
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: "10@vs",
    },
    updateButton: {
        backgroundColor: "#3B5AFB",
        paddingVertical: "12@vs",
        borderRadius: "10@ms",
        alignItems: "center",
        marginTop: "20@vs",
    },
    buttonText: {
        color: "#fff",
        fontSize: "16@ms",
        fontWeight: "bold",
    },
});

export default styles;