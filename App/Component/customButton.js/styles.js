import { StyleSheet } from 'react-native';
import { AppStyles, MetricsMod } from '../../themes';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:AppStyles.colorSet.appPrimaryColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: MetricsMod.baseMargin,
    width : "90%",
    alignSelf:'center'
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: AppStyles.colorSet.white,
    fontSize: 16,
    fontFamily:AppStyles.fontFamily.LatoBlack,
    // fontWeight:'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
});

export default styles;
