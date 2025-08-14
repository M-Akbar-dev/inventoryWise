import { StyleSheet } from 'react-native';
import AppStyles from '../../themes/AppStyles';
import { MetricsMod } from '../../themes';
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyles.colorSet.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: MetricsMod.smallMargin,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: AppStyles.colorSet.black,
    fontSize: AppStyles.fontSet.normal,
    fontFamily:AppStyles.fontFamily.ChewyRegular,
 
 
  },
  timeStyle: {
    marginLeft: MetricsMod.marginFifteen,
    color: AppStyles.colorSet.black,
    fontSize: AppStyles.fontSet.xxsmall,
    fontFamily:AppStyles.fontFamily.ChewyRegular,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    width: MetricsMod.thirty,
    height: MetricsMod.thirty,
    marginRight: MetricsMod.marginFifteen,
  },
  rightImageStyle: {
    width: MetricsMod.thirtyFive,
    height: MetricsMod.thirtyFive,
    marginLeft: MetricsMod.baseMargin,
  },
  divider: {
    marginTop: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 0.7,
    backgroundColor: AppStyles.colorSet.black,
  },
});

export default styles;
