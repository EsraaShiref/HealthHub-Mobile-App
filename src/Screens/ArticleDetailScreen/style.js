import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        padding: "14@s", 
        paddingBottom: "30@s", // Add extra padding at the bottom to prevent clipping
    },
    image: {
        width: "100%",
        height: "250@s",
        borderRadius: "10@s",
        marginBottom: "16@s",
        resizeMode: 'contain',
    },
    title: {
        fontSize: "24@s",
        fontWeight: "bold",
        marginBottom: "12@s",
        color: "#333",
    },
    content: {
        fontSize: "14@s",
        lineHeight: "20@s",
        color: "#555",
    },
});

export default styles;