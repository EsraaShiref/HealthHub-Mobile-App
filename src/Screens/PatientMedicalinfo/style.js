import { ScaledSheet } from "react-native-size-matters";
import { TINT_COLOR } from "../../utils/colors";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FB',
    paddingHorizontal: "14@s",
    paddingVertical: "16@s",
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    padding: "14@s",
    borderRadius: "12@s",
    marginBottom: "12@s",
    shadowColor: '#000',
    elevation: "5@s",
  },
  cardLabel: {
    fontSize: "12@s",
    color: '#999',
    marginVertical: "4@s",
    marginLeft: "8@s"
  },
  cardValue: {
    fontSize: "14@s",
    fontWeight: '600',
    marginTop: "2@s",
    color: '#000',
  },
  tabsWrapper: {
    flexDirection: 'row',
    paddingHorizontal: "4@s",
    paddingVertical: "4@s",
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: "1@s",
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: "10@s",
    borderRadius: "8@s",
  },

  activeTabItem: {
    backgroundColor: '#EAF2FF',
  },

  tabLabel: {
    fontSize: "12@s",
    color: '#888',
  },

  activeTabLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },

  section: {
    backgroundColor: '#fff',
    borderRadius: "12@s",
    marginVertical: "10@s",
    paddingVertical: "5@s",
    elevation: "5@s",
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: "14@s",
    paddingVertical: "12@s",
    backgroundColor: '#F7F9FB',
    marginHorizontal: "16@s",
    borderRadius: "12@s",
    marginVertical: "8@s",
  },
  optionText: {
    flex: 1,
    marginLeft: "12@s",
    fontSize: "13@s",
    color: '#333',
  },
  sectionTitle: {
    fontSize: "14@s",
    fontWeight: '600',
    color: '#333',
  },
  savedDoctorsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: "18@s",
    marginBottom: "8@s",
  },
  seeAllText: {
    color: '#007AFF',
    fontSize: "12@s",
  },
  doctorCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: "12@s",
    padding: "12@s",
    alignItems: 'center',
    marginBottom: "12@s",
    elevation: "5@s",
  },
  doctorImage: {
    width: "48@s",
    height: "48@s",
    borderRadius: "24@s",
    marginRight: "12@s",
  },
  doctorName: {
    fontSize: "14@s",
    fontWeight: '600',
    color: '#000',
  },
  doctorSpecialty: {
    fontSize: "11@s",
    color: '#777',
    marginTop: "2@s",
  },
  doctorExp: {
    fontSize: "10@s",
    color: '#555',
    marginTop: "4@s",
  },
  starContainer: {
    flexDirection: "row",
    marginTop: "5@s",
    marginVertical: "3@s"

  },
  starFull: {
    fontSize: "16@s",
    color: "orange",
    marginRight: "2@s",
  },
  starOutline: {
    fontSize: "16@s",
    color: "orange",
    marginRight: "2@s",
  },
  container1: {
    padding: "20@s",
    backgroundColor: "#fff",
    flexGrow: 1
  },
  card1: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: '10@s',
    padding: "8@s",
    elevation: 5,
    alignItems: "center",
    marginVertical:"5@s"
  },
  image: {
    width: '80@s',
    height: '80@s',
    borderRadius: '10@s',
  },
  starFull: {
    fontSize: "16@s",
    color: "orange",
    marginRight: "2@s",
  },
  starOutline: {
    fontSize: "16@s",
    color: "orange",
    marginRight: "2@s",
  },
  wrapper1: {
    marginLeft: '10@s',
  },
  wrapper2: {
    flexDirection: 'row',
    marginTop: '3@s',
    alignItems: 'center',
  },

  title3: {
    fontSize: '12@s',
    color: TINT_COLOR,
  },
  title4: {
    fontSize: '10@s',
    color: 'grey',
    marginLeft: '5@s'
  },
  title5: {
    fontSize: '11@s',
    color: 'grey',
    textDecorationLine: 'underline',
  },
  DoctorName :{
    fontSize:'14@s',
    fontWeight:'bold',
},
});

export default styles;
