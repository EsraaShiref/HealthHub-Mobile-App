import { ScaledSheet } from "react-native-size-matters";


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        paddingRight: 40, // space for the eye icon
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    inputWrapper: {
        position: 'relative',
        marginBottom: 15,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    warn: {
        fontSize: "12@s",
        color: '#f00',
    }
});

export default styles;