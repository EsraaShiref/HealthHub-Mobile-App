import { Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { PrimaryColor } from "../../utils/colors";
export const Styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        alignItems: 'center',
        justifyContent: "space-between"
    },
    text: {
        fontSize: 24,
        color: "#333333"
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginBottom: 30,
        marginTop: 20,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: PrimaryColor
    },
    cameraIconContainer: {
        position: "absolute",
        bottom: 100,
        left: 0,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 6,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    wrapper_textinput: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: 'center',
        marginTop: 0
    },
    wrapper_button: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 50,
        alignSelf: 'stretch'
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 20,
        alignSelf: 'center'
    },
    text: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    wrapperTouch: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-start",
        paddingRight: 5
    },
    wrapperTouch2: {
        flex: 1,
        alignItems: "center",
        paddingBottom: 20,
    },
    warn: {
        fontSize: "12@s",
        color: '#f00'
    },
    text2: {
        fontSize: 18,
        color: "#888",
        fontWeight: "400"
    }, timecontain: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
        color: "#333",
        marginTop: 10,
    },

});
