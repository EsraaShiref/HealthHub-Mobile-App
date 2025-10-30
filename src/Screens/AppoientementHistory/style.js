import { ScaledSheet } from "react-native-size-matters";
import { TINT_COLOR } from "../../utils/colors";

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FB',
        padding: '16@s',
    },
    header: {
        fontSize: '20@s',
        fontWeight: '600',
        marginBottom: '12@vs',
        color: '#000',
    },
    tabsWrapper: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: "12@s",
        padding: '4@s',
        marginBottom: '16@vs',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: '10@vs',
        borderRadius: "8@s",
    },
    tabLabel: {
        fontSize: '14@s',
        color: '#888',
    },
    activeTabItem: {
        backgroundColor: '#EAF2FF',
    },
    activeTabLabel: {
        color: '#007AFF',
        fontWeight: '600',
    },
    listWrapper: {
        flex: 1,
    },
    appointmentCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: '10@s',
        padding: "8@s",
        elevation: 3,
        alignItems: "center",
        marginVertical: "5@s"
    },
    doctorImage: {
        width: '80@s',
        height: '80@s',
        borderRadius: '10@s',
    },
    details: {
        flex: 1,
        marginLeft: '10@s',
    },
    doctorName: {
        fontSize: '14@s',
        fontWeight: '600',
        color: '#000',
    },
    specialty: {
        fontSize: '13@s',
        color: TINT_COLOR,
        marginLeft:'4@s'
    },
    time: {
        fontSize: '12@s',
        color: '#555',
        marginTop: '4@vs',
    },
    status: {
        marginTop: '4@vs',
        fontWeight: '500',
        fontSize: '12@s',
    },
});

export default styles;
