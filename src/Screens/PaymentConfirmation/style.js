import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6495ED',
        justifyContent: 'center',
        alignItems: 'center',
        padding: "30@s",
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: "20@s",
        borderStyle: 'dashed',
        borderColor: 'white',
        borderWidth: "2@s",
        alignItems: 'center',
        padding: "30@s",
    },
    icon: {
        marginBottom: "20@s",
    },
    message: {
        color: 'white',
        fontSize: "14@s",
        textAlign: 'center',
        marginBottom: "16@s",
    },
    doctorName: {
        fontWeight: 'bold'
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    dateTimeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: "8@s"
    },
    dateTimeText: {
        color: 'white',
        marginLeft: "5@s",
        fontSize: "14@s",

    },
    button: {
        marginTop: "250@s",
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: "10@s",
        paddingVertical: "10@s",
        paddingHorizontal: "30@s",
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    paymentContainer: {
        flexDirection: 'row',
        padding: "15@s",
        borderRadius: "10@s",
        alignItems: "center",
        width: "80%",
        alignSelf: "center",
    },
    paymentLabel: {
        color: "#fff",
        fontSize: "14@s",
        fontWeight: "bold",
        marginHorizontal: "10@s"
    },

    paymentAmount: {
        color: "#2E8B57",
        fontSize: "14@s",
        fontWeight: "bold",
        marginTop: "5@s",
        marginHorizontal: "10@s"
    },
    ccccc1: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        padding: "5@s",
        marginTop: "10@s",
    },
    typeText: {
        color: "#fff",
        fontSize: "13@s",
    }, icon: {
        marginRight: "5@s",
        fontSize: "14@s",
    },
    meetingLinkContainer: {
        marginTop: "20@s",
        padding: "15@s",
        backgroundColor: "#f4f4f4",
        borderRadius: "10@s",
        width: "80%", // ✅ أقل من 100% عشان يحترم البادينج
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    meetingLinkText: {
        fontSize: "13@s",
        fontWeight: "500",
        color: "#333",
    },
    meetingLink: {
        fontSize: "13@s",
        fontWeight: "bold",
        color: "#1a73e8",
        textDecorationLine: "underline",
        flex: 1,
        textAlign: "right",
    }


});

export default styles;