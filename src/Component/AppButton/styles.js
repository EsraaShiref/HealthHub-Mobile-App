import {ScaledSheet} from 'react-native-size-matters';
import { TINT_COLOR } from '../../utils/colors';

const textColor = 'white';

const styles = ScaledSheet.create({
  wrapper: {
    backgroundColor: TINT_COLOR,
    borderColor: TINT_COLOR,
    borderRadius: '8@s',
    borderWidth: "1@s",
    padding: "9@s",
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: textColor,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.3,
  },
});

export default styles;
