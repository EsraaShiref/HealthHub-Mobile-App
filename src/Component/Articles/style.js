import { ScaledSheet} from 'react-native-size-matters';
import { TINT_COLOR , PrimaryColor} from '../../utils/colors';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get("window");


const style =  ScaledSheet.create ({
  container: {
    marginVertical: '10@s',
    alignItems: 'center',
    borderRadius: '10@s',
  },
  slide: {
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: '10@s',
    overflow: "hidden",
    alignItems: "center",
    marginHorizontal: width * 0.05,
    paddingVertical: "10@s",
    elevation: 5,
  },
  image: {
    alignSelf: 'center',
    width: "90%",
    height: "150@s",
    resizeMode: "contain",
    borderRadius: '10@s',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: "10@s",
  },
  dot: {
    width: '8@s',
    height: '8@s',
    borderRadius: '8@s',
    marginHorizontal: '4@s',
  },
  activeDot: {
    backgroundColor: TINT_COLOR,
  },
  inactiveDot: {
    backgroundColor: PrimaryColor,
  },
});

export default style;
