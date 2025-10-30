import { ScaledSheet } from "react-native-size-matters";

const Styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    detailImage: {
        width: "100%",
        height: "250@s",
    },
    overlay: {
        position: "absolute",
        top: "20@s",
        right: "15@s",
        flexDirection: "row",
        gap: "15@s",
    },
    title: {
        fontSize: "16@s",
        fontWeight: "bold",
        marginHorizontal: "15@s",
        marginVertical: "10@s",
    },
    author: {
        fontSize: "14@s",
        color: "#666",
        marginHorizontal: "15@s",
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: "20@s",
        marginTop: "15@s",
        marginHorizontal: "15@s",
        padding: "5@s",
    },
    tab: {
        paddingVertical: "8@s",
        paddingHorizontal: "20@s",
        borderRadius: "20@s",
    },
    activeTab: {
        backgroundColor: "#fff",
    },
    tabText: {
        fontSize: "12@s",
        color: "#666",
    },
    activeTabText: {
        color: "#000",
        fontWeight: "bold",
    },
    divider: {
        height: "60%",
        width: 1,
        backgroundColor: "#ccc",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: "15@s",
    },
    statItem: {
        alignItems: "center",
        justifyContent: "center",
        width: "80@s",
        height: "80@s",
        borderRadius: "40@s",
        borderWidth: "1@s",
        borderColor: "#2a9d8f", 
        marginHorizontal: 8, // خلي فيه مسافة بين كل عنصر

    },
    statText: {
        fontSize: "14@s",
        fontWeight: "bold",
    },
    statLabel: {
        fontSize: "10@s",
        color: "#666",
        marginTop: "5@s",
    },
    sectionTitle: {
        fontSize: "15@s",
        fontWeight: "bold",
        marginHorizontal: "15@s",
    },
    nutritionContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: "10@s",
    },
    nutritionItem: {
        alignItems: "center",
        justifyContent: "center",
        width: "70@s",
        height: "70@s",
        borderRadius: "35@s",
        borderWidth: "1@s",
        borderColor: "#2a9d8f", 
    },
    nutritionValue: {
        fontSize: "14@s",
        fontWeight: "bold",
    },
    nutritionLabel: {
        fontSize: "10@s",
        color: "#666",
        marginTop: "5@s",
    },
    utensils: {
        fontSize: "12@s",
        color: "#666",
        marginHorizontal: "15@s",
        marginTop: "5@s",
    },
    ingredientItem: {
        fontSize: "14@s",
        marginHorizontal: "15@s",
        marginVertical: "3@s",
    },
    instructionItem: {
        fontSize: "14@s",
        marginHorizontal: "15@s",
        marginVertical: "5@s",
    },
});

export default Styles;