import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create ({
    list: {
        padding: "16@s",
        backgroundColor:'white',
      },
      card: {
        backgroundColor: "#fff",
        borderRadius: "10@s",
        padding: "14@s",
        marginBottom: "10@s",
        elevation: 5,
        marginTop: "30@s",
      },
      con1:{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "16@s",
      },
      image: {
        width: "80@s",
        height: "80@s",
        borderRadius: "80@s",
        marginRight: "10@s",
      },
      textContainer: {
        justifyContent: "center",
      },
      title: {
        fontSize: "17@s",
        fontWeight: "bold",
        marginLeft: "10@s",
      },
      description: {
        fontSize: "12@s",
        color: "#4a4a4a",
      },
});

export default styles;