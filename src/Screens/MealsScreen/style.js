import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        padding: "10@s",
        backgroundColor: "#fff",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: "10@s",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: "15@s",
    },
    image: {
        width: "100%",
        height: "150@s",
        borderTopLeftRadius: "10@s",
        borderTopRightRadius: "10@s",
        resizeMode:"cover",
    },
    favoriteButton: {
        position: "absolute",
        top: "10@s",
        right: "10@s",
        backgroundColor: "#fff",
        borderRadius: "20@s",
        padding: "5@s",
    },
    infoContainer: {
        padding: "10@s",
    },
    category: {
        color: "#8AB661",
        fontWeight: "bold",
        fontSize: "10@s",
    },
    title: {
        fontWeight: "bold",
        fontSize: "13@s",
        marginTop: "5@s",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: "5@s",
    },
    time: {
        marginLeft: "5@s",
        color: "#777",
    },
    author: {
        color: "#777",
        fontSize: "10@s",
    },
});

export default styles;