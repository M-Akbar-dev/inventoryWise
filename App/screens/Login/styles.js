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

  }
})

export default styles