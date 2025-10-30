import { ScaledSheet } from "react-native-size-matters";
import { primary, TINT_COLOR } from "../../utils/colors";
const styles = ScaledSheet.create({
    container: {
        padding: "16@s",
        backgroundColor: "#F8F9FB",
        flex: 1,
    },
    header: {
        fontSize: "22@ms",
        fontWeight: "bold",
        marginBottom: "16@vs",
        textAlign: "center",
        color: "#333",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: "12@ms",
        padding: "16@ms",
        marginBottom: "12@vs",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: "16@ms",
        fontWeight: "bold",
        marginBottom: "6@vs",
        color: "#3B5AFB",
    },
    detail: {
        fontSize: "14@ms",
        color: "#444",
        marginBottom: "4@vs",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "30@vs",
    },
    loadingText: {
        marginTop: "12@vs",
        fontSize: "16@ms",
        color: "#555",
    },
    noData: {
        textAlign: "center",
        fontSize: "16@ms",
        color: "#999",
        marginTop: "40@vs",
    },
    detail: {
        fontSize: "14@ms",
        color: "#555",
        marginBottom: "2@vs",
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    iconGroup: {
        flexDirection: "row",
    },
});

export default styles;