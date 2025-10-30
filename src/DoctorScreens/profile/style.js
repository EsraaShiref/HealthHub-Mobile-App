import { ScaledSheet } from "react-native-size-matters";
import { primary, TINT_COLOR } from "../../utils/colors";
const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#F7F9FB',
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: "20@s",
  },
  avatar: {
    width: "90@s",
    height: "90@s",
    borderRadius: "45@s",
  },
  avatarWrapper: {
    position: 'relative',
    width: "100@s",
    height: "100@s",
    borderRadius: "50@s",
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "5@s",
  },

  avatar: {
    width: "90@s",
    height: "90@s",
    borderRadius: "45@s",
  },

  editIcon: {
    position: 'absolute',
    bottom: "0@s",
    right: "0@s",
  },

  editIconInner: {
    width: "28@s",
    height: "28@s",
    backgroundColor: '#007AFF',
    borderRadius: "14@s",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: "2@s",
    borderColor: '#fff',
  },
  name: {
    marginTop: "10@s",
    fontSize: "18@s",
    fontWeight: '600',
    color: '#333',
  },
  location: {
    fontSize: "14@s",
    color: '#777',
  },
  section: {
    marginVertical: "10@s",
    borderRadius: "10@s",
    marginHorizontal: "14@s",
  },
  Card: {
    flexDirection: 'row',
    padding: "14@s",
    marginVertical: "4@s",
    borderRadius: "7@s",
    alignItems: 'center',
  },
  icon: {
    fontSize: "25@s",
    color: TINT_COLOR,
    paddingHorizontal: "10@s",
  },
  text: {
    fontSize: "16@s"
  },
  icon1: {
    fontSize: "25@s",
    color: TINT_COLOR,
    paddingHorizontal: "10@s",
    marginLeft: 'auto', // يدفع العنصر لأقصى اليمين
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    marginLeft: 18,
    marginTop: 10,
    fontSize: 14,
    color: '#999',
  },
});

export default styles;