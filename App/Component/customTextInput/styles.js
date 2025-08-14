import {StyleSheet} from 'react-native';
import {AppStyles, MetricsHorizontal, MetricsMod, MetricsVertical} from '../../themes';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:1,
    borderColor:AppStyles.colorSet.gray,
    borderRadius:MetricsMod.six,
    backgroundColor:AppStyles.colorSet.lightGray,
    // paddingBottom: 5,
    width: '90%',
    alignSelf: 'center',
},
input: {
    flex: 1,
    paddingHorizontal: MetricsHorizontal.eighteen,
    paddingVertical:MetricsVertical.six,
    fontSize: 14,
    color:AppStyles.colorSet.appBlack,
    fontFamily:AppStyles.fontFamily.LatoBold
},
requiredIcon: {
    marginRight: 5,
},
iconWrapper: {
    paddingHorizontal: 10,
    justifyContent: 'center',
},
});

export default styles;
