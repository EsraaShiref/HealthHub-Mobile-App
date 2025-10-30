import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F7F9FB',
    padding: "14@s",
    marginBottom:"16@s"
  },
  label: {
    fontSize: "12@s",
    color: '#555',
    marginTop: "12@s",
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: "8@s",
    padding: "10@s",
    marginTop: "6@s",
    fontSize: "14@s",
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: "6@s",
  },
  changeBtn: {
    marginLeft: "10@s",
    backgroundColor: '#E0EFFE',
    borderRadius: "6@s",
    paddingHorizontal: "12@s",
    paddingVertical: "10@s",
  },
  changeText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: "6@s",
  },
  dateInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: "8@s",
    padding: "12@s",
    marginRight: "8@s",
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: "30@s",
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E5E5EA',
    borderRadius: 10,
    paddingVertical: 14,
    marginRight: 10,
    alignItems: 'center',
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
  },
  updateText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;