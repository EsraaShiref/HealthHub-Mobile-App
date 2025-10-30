import { ScaledSheet } from "react-native-size-matters";
import { TINT_COLOR, PrimaryColor } from "../../utils/colors";

const style = ScaledSheet.create({
    container: {
        padding: "20@s",
        backgroundColor: "#fff",
        height: "100%",
    },
    card: {
        backgroundColor: TINT_COLOR,
        padding: "20@s",
        borderRadius: "20@s",
    },
    image: {
        width: "150@s",
        height: "150@s",
        resizeMode: "cover",
        borderRadius: "10@s",
        alignSelf: 'center'
    },
    container1: {
        justifyContent: "center",
        padding: "12@s",
        alignItems: 'center'
    },
    DoctorName: {
        fontSize: '13@s',
        fontWeight: 'bold',
        color: "#fff",
    },
    specialty: {
        fontSize: '12@s',
        fontWeight: 'bold',
        color: "#fff",
        marginRight: "5@s"
    },
    experience: {
        fontSize: '12@s',
        color: "#d0d3d4",
    },
    container2: {
        justifyContent: "center",
        flexDirection: 'row',
        marginTop: "5@s",

    },
    appointmentContainer: {
        alignItems: "center",
        marginVertical: "10@s",
    },
    appointmentCard: {
        backgroundColor: "#4C85E5",
        borderRadius: "10@s",
        paddingVertical: "10@s",
        paddingHorizontal: "20@s",
        flexDirection: "row",
    },
    icon: {
        marginRight: "5@s",
        fontSize: "14@s",
    },

    icon1: {
        marginRight: "5@s",
        fontSize: "14@s",

    },
    dateText: {
        color: "#fff",
        fontSize: "13@s",
    },
    timeText: {
        color: "#fff",
        fontSize: "13@s",
    },
    ccccc: {
        flexDirection: 'row',
        alignItems: "center",
        marginRight: "20@s"
    },
    ccccc1: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        padding: "5@s",
        borderRadius: "10@s",
    },
    typeText: {
        color: "#fff",
        fontSize: "13@s",
    },
    paymentOption: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "13@s",
        borderWidth: "1@s",
        borderColor: "#ccc",
        borderRadius: "10@s",
        marginBottom: "13@s",
        backgroundColor: "#fff",
    },
    paymentIcon: {
        marginRight: "13@s",
        alignSelf: "center"
    },
    input: {
        height: "50@s",
        borderColor: "#ccc",
        borderWidth: "1@s",
        borderRadius: "10@s",
        paddingHorizontal: "15@s",
        marginTop: "2@s",
        fontSize: "13@s",
        backgroundColor: "#fff",
        marginBottom: "10@s",
    },
    paymentText: {
        flex: 1,
        fontSize: "14@s",
        color: "#000",
        fontWeight: "500",
    }, proceedButton: {
        marginVertical: "20@s",
        borderRadius: "10@s",

    },
    title5: {
        fontSize: '11@s',
        color: '#fff',
        textDecorationLine: 'underline',
        fontWeight: "500",
    },
    paymentContainer: {
        flexDirection: 'row',
        marginTop: "10@s",
        padding: "5@s",
        borderRadius: "10@s",
        alignItems: "center",
        width: "80%",
        alignSelf: "center",
    },

    paymentLabel: {
        color: "#fff",
        fontSize: "14@s",
        fontWeight: "bold",
        marginHorizontal: "20@s"
    },

    paymentAmount: {
        color: "light orange",
        fontSize: "14@s",
        fontWeight: "bold",
        marginHorizontal: "20@s"

    },
    totalPayment: {
        justifyContent: "space-between",
        borderTopWidth: "1@s",
        borderTopColor: "#DDD",
        paddingTop: "10@s",
        marginTop: "30@s",
    },

    totalLabel: {
        fontSize: "14@s",
        fontWeight: "bold",
        color: "#000",
        marginVertical: "15@s",
    },

    totalAmount: {
        fontSize: "14@s",
        fontWeight: "bold",
        color: "#000",
    },

    payButton: {
        padding: "12@s",
        borderRadius: "10@s",
        alignItems: "center",
        marginTop: "16@s",
        marginBottom: "76@s",
    },


    payButton1: {
        padding: "12@s",
        borderRadius: "10@s",
        alignItems: "center",
        marginTop: "16@s",
    },

    payButtonText: {
        color: "#FFF",
        fontSize: "15@s",
        fontWeight: "bold",
    },
    starContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: "3@s",
    },
    starIcon: {
        fontSize: "18@s",
        color: "orange",
        marginHorizontal: "1@s",
    },
    starRatingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "2@s",
    },
    starFull: {
        fontSize: "15@s",
        color: "orange",
        marginRight: "2@s"
    },
    starOutline: {
        fontSize: "15@s",
        color: "#ddd",
        marginRight: "2@s",
    },
    applyButton: {
        backgroundColor: TINT_COLOR,
        paddingVertical: "8@s",
        paddingHorizontal: "15@s",
        borderRadius: "10@s",
        marginLeft: "10@s",
        alignItems: "center",
        justifyContent: "center",
    },

    applyButtonText: {
        color: "#fff",
        fontSize: "12@s",
        fontWeight: "bold",
        textTransform: "uppercase",
    },


});

export default style;