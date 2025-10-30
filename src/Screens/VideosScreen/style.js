import { ScaledSheet } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { TINT_COLOR } from "../../utils/colors";

const styles = ScaledSheet.create({
    container: {
        paddingVertical: "20@s",
        gap: "15@s",
        paddingHorizontal:"15@s",
        backgroundColor:'white',
    },
    videoCard: {
        height: "230@s",
        borderRadius: "15@s",
        marginBottom: "20@s",
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 4,
    },
    videoPlayer: {
        height: "200@s",
        borderRadius: "15@s",
        borderTopLeftRadius: "15@s",
        borderTopRightRadius: "15@s",
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1,
    },
    loadingText: {
        marginTop: "10@s",
        color: TINT_COLOR,
        fontWeight: 'bold',
        fontSize: "16@s",
    },
});

export default styles;