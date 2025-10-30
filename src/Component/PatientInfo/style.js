import {ScaledSheet} from 'react-native-size-matters';
import {Dimensions} from 'react-native';
import { TINT_COLOR,PrimaryColor } from '../../utils/colors';

const {width} = Dimensions.get('window');

const imageWidth = width / 3;
const imageHeight = imageWidth * 2;

const styles = ScaledSheet.create({
  container: {
    flexDirection:'row',
    paddingHorizontal:'10@s',
    alignItems:'center',
    marginTop:'10@s',
    marginBottom:0,
  },
  image: {
    backgroundColor:'#FFFFFF',
    marginEnd:'15@s',
    marginStart:'5@s',
    width:'60@s',
    height:'60@s',
    borderRadius:'30@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  title1 : {
    fontSize: '15@s',
    fontWeight: 'bold',
    marginBottom: '2@s',
  },
  title2:{
    fontSize: '12@s',
    // marginStart: '5@s',
    color:PrimaryColor,
  }
});

export default styles;
