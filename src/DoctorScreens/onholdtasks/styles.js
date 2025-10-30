import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../consts/const";
import { primary } from "../../utils/colors";


export const Styles = ScaledSheet.create({
  container: {
    backgroundColor: "#F5F8FF",
    paddingHorizontal: "10@s",
    paddingTop: "20@s",
    paddingBottom: "60@s",
    flex:1,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "20@s",
  },
  headertext: {
    fontSize: 15,
    fontWeight: "600",
  },
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonwrapper: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
  doctorTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 6,
    marginTop: 12,
    marginLeft: 10,
  },
  noTaskText: {
    textAlign: "center",
    marginTop: 30,
    color: "#6B7280",
    fontSize: 15,
  },
  dayContainer: {
    backgroundColor: "#E0F2FE", // light blue
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 70,
  },
  dayText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#0369A1", // darker blue
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "12@s",
    padding: "12@s",
    borderRadius: "16@s",
    marginHorizontal: "12@s",
  },
  img: {
    width: "60@s",
    height: "60@s",
    borderRadius: "30@s",
    marginRight: "12@s"
  },
  clientname: {
    fontSize: "14@s",
    fontWeight: "bold",
    color: "#1F2937",
    marginVertical: "3@s"
  },
  clientmail: {
    fontSize: "12@s",
    color: "#6B7280",
    marginVertical: "3@s"
  },
  timeCont: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary + "22",
    paddingVertical: "6@s",
    paddingHorizontal: "8@s",
    borderRadius: "12@s",
    marginRight: "12@s",
    marginVertical: "10@s",
    
  },
  Timetxt: {
    color: "#333",
    fontSize: "13@s"
  },

});
