import { ScaledSheet } from "react-native-size-matters";
import { TINT_COLOR } from "../../utils/colors";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: "40@s",
  },
  image: {
    width: '180@s',
    height: '180@s',
    borderRadius: '10@s',
  },
  DoctorName: {
    fontSize: '16@s',
    fontWeight: 'bold',
  },
  wrapper1: {
    marginTop: '20@s',
    alignItems: 'center',
  },
  wrapper2: {
    paddingVertical: '5@s',
    flexDirection:'row',
    marginBottom: "0@s"
  },
  wrapper3: {
    width: '83%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title3: {
    fontSize: '13@s',
    color: TINT_COLOR,
  },
  title4: {
    fontSize: '12@s',
    color: 'grey',
  },
  title5: {
    fontSize: '13@s',
    color: 'grey',
    textDecorationLine: 'underline',
    paddingVertical: '2@s'

  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "3@s",
  },
  starIcon: {
    fontSize: "18@s",
    color: "orange",
    marginHorizontal: "1@s",
  },
  starRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2@s",
  },
  aboutSection: {
    marginTop: "18@s",
    paddingHorizontal: "15@s",
    paddingVertical: "12@s",
  },
  aboutTitle: {
    fontSize: '16@s',
    fontWeight: 'bold',
    marginBottom: "5@s"
  },
  aboutText: {
    fontSize: '12@s',
    color: "#555",
    lineHeight: "20@s",
  },
  AppButton: {
    borderRadius: "5@s",
    padding: "10@s",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "20@s",
    width: "180@s",
  },
  AppButtonTitle: {
    fontSize: '14@s',
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "15@s",
    width: "100%",
  },

  priceLabel: {
    fontSize: '15@s',
    fontWeight: "bold",
  },
  priceValue: {
    fontSize: '15@s',
    fontWeight: "bold",
    color: "#27ae60",
  },
  cliniccontainer:{
    marginTop: "5@s",
    paddingHorizontal: "15@s",
    width: "100%",
  }


});

export default styles;