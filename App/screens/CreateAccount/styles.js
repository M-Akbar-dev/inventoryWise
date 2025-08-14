import { StyleSheet } from "react-native";
import { AppStyles, MetricsMod, MetricsVertical } from "../../themes";

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.white
  },
  textInput: {
    marginTop: MetricsMod.baseMargin
  },
  headingView: {
    width: "90%",
    alignSelf: 'center',
    marginTop: MetricsVertical.marginThirtyFive
  },
  headingText: {
    fontSize: AppStyles.fontSet.large,
    color: AppStyles.colorSet.black,
    fontFamily: AppStyles.fontFamily.LatoBlack,
  },
  instructionTxt: {
    color: AppStyles.colorSet.black,
    fontFamily: AppStyles.fontFamily.LatoBoldItalic,
  },
  titleTxt: {
    width: "90%",
    alignSelf: 'center',
    marginTop: MetricsMod.fifteen,
    color: AppStyles.colorSet.black,
    fontFamily: AppStyles.fontFamily.LatoBold
  },
  forgotPasswordTxt: {
    color: AppStyles.colorSet.AppButtoncolor,
    width: "90%",
    alignSelf: 'center',
    textAlign: 'right',
    marginTop: MetricsMod.twenty,
    fontFamily: AppStyles.fontFamily.LatoBlack
  },
  submitButton: {
    marginVertical: MetricsMod.twenty
  },
  errorText: {
    color: 'red',
    marginVertical: 5,
    fontSize: 14,
    width: "90%",
    alignSelf: 'center',
    fontFamily: AppStyles.fontFamily.LatoBold

  },
  logoImg: {
    width: MetricsMod.twoNinety,
    height: MetricsMod.hundredFive,
    alignSelf: 'center',
    marginTop: MetricsMod.baseMarginIII
  },
  dontHaveAccount:{
    alignSelf:'center'
  },
  txtStyles:{
    fontSize:16,

  },
  logoUploadContainer: {
    alignItems: 'center',
    marginBottom: MetricsMod.twenty,
  },
  logoContainer: {
    width: "90%",
    height: 150,
    borderRadius: 10,
    backgroundColor: AppStyles.colorSet.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: MetricsMod.fifteen,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: AppStyles.colorSet.appPrimaryColor,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  placeholderIcon: {
    width: 50,
    height: 50,
    // tintColor: AppStyles.colorSet.appPrimaryColor,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: AppStyles.colorSet.appPrimaryColor,
    borderRadius: 15,
    padding: 5,
  },
  cameraIcon: {
    width: 20,
    height: 20,
    tintColor: AppStyles.colorSet.white,
  },
  mandatoryStar: {
    color: AppStyles.colorSet.appRed,
  },
})

export default styles