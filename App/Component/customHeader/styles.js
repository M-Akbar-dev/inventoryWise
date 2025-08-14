import { StyleSheet } from 'react-native';
import { AppStyles, MetricsMod } from '../../themes';

const styles = StyleSheet.create({
  header: {
    backgroundColor: AppStyles.colorSet.appPrimaryColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    // width: 40,
    // height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStylesUser: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: AppStyles.colorSet.white,
  },

});

export default styles;
