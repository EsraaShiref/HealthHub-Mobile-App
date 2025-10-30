import { StyleSheet } from "react-native";
import { s, ms, vs } from 'react-native-size-matters';
import { Background , gray} from "../../../utils/colors";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Background,
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: vs(40),
    alignItems: "center",
    marginTop: vs(16),
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: ms(10),
  },
  textheader: {
    fontSize: ms(24),
    color: "#000",
    textAlign: "center",
    fontWeight: "600",
  },
  uploadButton: {
    width: "90%",
    height: vs(180),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: ms(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(16),
    backgroundColor: Background,
    overflow: "hidden",
  },
  uploadText: {
    fontSize: ms(16),
    color: "#333",
  },
  camera: {
    fontSize: ms(16),
    color: gray,
    marginTop: vs(8),
  },
  top: {
    width: "100%",
    borderBottomRightRadius: ms(100),
    borderBottomLeftRadius: ms(100),
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: vs(52),
    textAlign: "center",
    backgroundColor: "#5b96fc",
    borderRadius: ms(10),
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "70%",
    marginTop: vs(8),
  },
  buttontext: {
    fontSize: ms(16),
    color: "#fff",
  },
});
