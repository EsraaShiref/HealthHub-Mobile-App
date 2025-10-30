import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    padding: "20@s",
    backgroundColor: "#F9F9F9",
    flexGrow: 1,
  },
  title: {
    fontSize: "20@s",
    fontWeight: "bold",
    color: "#3B5AFB",
    marginBottom: "20@vs",
    textAlign: "center",
  },
  label: {
    fontSize: "16@s",
    fontWeight: "600",
    marginBottom: "5@vs",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: "12@vs",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: "15@s",
    marginBottom: "15@vs",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "10@s",
  },
  inputBox: {
    flex: 1,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: "12@s",
    marginBottom: "15@vs",
  },
  dateText: {
    fontSize: "15@s",
    color: "#333",
    marginLeft: 10,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "15@vs",
  },
  button: {
    backgroundColor: "#3B5AFB",
    padding: "10@vs",
    borderRadius: 12,
    alignItems: "center",
    marginTop: "10@vs",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: "16@s",
  },
});
