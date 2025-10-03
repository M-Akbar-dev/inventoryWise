import { StyleSheet } from 'react-native';
import { AppStyles, Metrics, MetricsMod } from '../../themes';
import appStyles from '../../themes/AppStyles';

const styles = StyleSheet.create({
  drawerItemContainer: {
    flex: 1,
    backgroundColor:AppStyles.colorSet.white
   },
  itemContainer: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.white,
    paddingBottom: MetricsMod.forty,
    paddingTop: MetricsMod.baseMargin,
  },
  logoutContainer: {
    marginBottom: MetricsMod.thirty,
    marginRight: MetricsMod.forty,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetails: {
    backgroundColor: AppStyles.colorSet.appPrimaryColor,
    height:MetricsMod.twoHundred,
    borderColor:AppStyles.colorSet.black,
    borderBottomWidth:2
  },
  imageContainer: {
    marginTop: MetricsMod.forty,
    alignSelf: 'center',
  },

  userImage: {
    alignSelf: 'center',
    width: MetricsMod.hundred,
    height: MetricsMod.hundred,
    borderRadius: MetricsMod.hundred / 2,
    borderColor: AppStyles.colorSet.appPrimaryColor,
    borderWidth: 3,
    marginTop: MetricsMod.marginFifteen,
    backgroundColor: AppStyles.colorSet.appPrimaryColor,
  },
  userTitle: {
    alignSelf: 'center',
    fontSize: appStyles.fontSet.xmiddle,
    color: AppStyles.colorSet.white,
    marginTop: MetricsMod.baseMargin,
    marginBottom: MetricsMod.section,
    fontFamily:AppStyles.fontFamily.ChewyRegular,
  },
  userSubTitle: {
    fontSize: MetricsMod.baseMarginIII,
    color: AppStyles.colorSet.white,
    fontFamily:AppStyles.fontFamily.ChewyRegular,
  },
  divider: {
    borderTopColor: 'red',
    borderTopWidth: 5,
  },
  lightContainer: {
    backgroundColor: AppStyles.colorSet.primary,
  },
  darkContainer: {
    backgroundColor: AppStyles.colorSet.blackN,
  },
  lightThemeText: {
    color: AppStyles.colorSet.white,
  },
  darkThemeText: {
    color: AppStyles.colorSet.silver,
  },
  customContainerStyle: {
    marginHorizontal: MetricsMod.baseMargin,
    borderRadius: MetricsMod.smallMargin,
    paddingVertical: MetricsMod.baseMargin,
    paddingLeft: MetricsMod.thirty,
    // marginTop:MetricsMod.forty
    // backgroundColor: AppStyles.colorSet.primary,
  },
  drawerTextStyle: {
    fontWeight: '400',
    color: AppStyles.colorSet.green,
    fontSize: AppStyles.fontSet.normal,
    fontFamily:AppStyles.fontFamily.ChewyRegular,
    flex: 1,
    marginLeft:16,
    

  },
  drawerLogoutTextStyle:{
    fontWeight: '400',
    color: AppStyles.colorSet.green,
    fontSize: AppStyles.fontSet.normal,
    flex: 1,
    marginLeft:MetricsMod.sixty,
     alignSelf:'center',
     
  },

  drawerLogoutTextStyle2:{
    fontWeight: '400',
    color: AppStyles.colorSet.green,
    fontSize: AppStyles.fontSet.normal,
    flex: 1,
    marginLeft:MetricsMod.thirty,
     alignSelf:'center',
     
  },
  drawerTextStyleWithoutIcon: {
    fontWeight: 'bold',
    marginLeft: 0,
    fontSize: AppStyles.fontSet.tiny,
    color: AppStyles.colorSet.blackX,
    fontFamily:AppStyles.fontFamily.ChewyRegular,
  },
  logoutTextStyle: {
    fontWeight: '500',
    marginLeft: MetricsMod.seventeen,
    color: AppStyles.colorSet.redII,
    fontSize: AppStyles.fontSet.normal,
    fontFamily:AppStyles.fontFamily.ChewyRegular,
  },
  editTextStyle: {
    marginLeft: MetricsMod.marginFifteen,
    color: AppStyles.colorSet.white,
    fontSize: AppStyles.fontSet.smaller,
    fontFamily:AppStyles.fontFamily.ChewyRegular,
  },
  imageStyle: {
    marginTop: MetricsMod.baseMarginIII,
    tintColor: AppStyles.colorSet.white,
    width: MetricsMod.eighteen,
    height: MetricsMod.eighteen,
    marginRight: MetricsMod.smallMargin,
  },
  editImageStyle: {
    marginTop: MetricsMod.smallMargin,
    tintColor: AppStyles.colorSet.white,
    width: MetricsMod.baseMargin,
    height: MetricsMod.baseMargin,
  },
  logoutRightStyle: {
    marginTop: MetricsMod.smallMargin,
    tintColor: AppStyles.colorSet.greyColor,
    width: MetricsMod.eighteen,
    height: MetricsMod.eighteen,
  },
  editSection: {
    marginLeft: MetricsMod.doubleBaseMargin,
    marginRight: MetricsMod.forty,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: MetricsMod.smallMargin,
  },
  leftImageStyle: {
    width: MetricsMod.doubleBaseMargin,
    height: MetricsMod.doubleBaseMargin,
     
  },
  logoutImageStyle: {
    width: MetricsMod.doubleBaseMargin,
    height: MetricsMod.doubleBaseMargin,
    tintColor: AppStyles.colorSet.redII,
  },
  deleteImage: {
    width: MetricsMod.doubleBaseMargin,
    height: MetricsMod.doubleBaseMargin,
    tintColor: 'black',
  },
  scrollContainer: {
    flex: 1,
    // marginBottom: MetricsMod.marginFifteen,
    // opacity: 1
  },
  nameTxt:{
    fontSize:22,
    alignSelf:'center',
    marginTop:10,
    color:AppStyles.colorSet.white,
    fontFamily:AppStyles.fontFamily.LatoBold,
  },
  logoImgstyle:{
    alignSelf:'center'
    
  },
  customContainerStyle1:{
    marginHorizontal: MetricsMod.baseMargin,
    borderRadius: MetricsMod.smallMargin,
    paddingVertical: MetricsMod.baseMargin,
    paddingLeft: MetricsMod.thirty,
    
  }
});

export default styles;
