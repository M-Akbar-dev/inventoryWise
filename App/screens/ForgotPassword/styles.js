import { StyleSheet } from "react-native";
import { AppStyles, MetricsMod, MetricsVertical } from "../../themes";

const styles = StyleSheet.create({
  contianer :{
    flex:1,
    backgroundColor:AppStyles.colorSet.white
  },
  textInput:{
    marginTop:MetricsMod.baseMargin
  },
  headingView:{
    width:"90%",
    alignSelf:'center',
    marginTop:MetricsVertical.marginThirtyFive
   },
   headingText:{
    fontSize:AppStyles.fontSet.large,
    color:AppStyles.colorSet.black,
    fontFamily:AppStyles.fontFamily.LatoBlack,
  
   },
   instructionTxt:{
    color:AppStyles.colorSet.black,
    fontFamily:AppStyles.fontFamily.LatoBoldItalic,
     // fontWeight:'bold'

   },
   titleTxt:{
    width:"90%",
    alignSelf:'center',
    marginTop:MetricsMod.fifteen,
    color:AppStyles.colorSet.black,
    fontFamily:AppStyles.fontFamily.LatoBold
    // fontWeight:'500'

   },
   forgotPasswordTxt:{
    color:AppStyles.colorSet.AppButtoncolor,
    width:"90%",
    alignSelf:'center',
    textAlign:'right',
    marginTop:MetricsMod.twenty
   },
   submitButton:{
    marginTop:MetricsVertical.twentyFive
   },
   errorText: {
    color: 'red',
    marginVertical: 5,
    fontSize: 14,
    width:"90%",
    alignSelf:'center',
    fontFamily:AppStyles.fontFamily.LatoBold
  },
  logoImg:{
    width: MetricsMod.twoNinety,
    height: MetricsMod.hundredFive,
    alignSelf: 'center',
    marginTop:MetricsMod.baseMarginIII
  },
  rowView: {
    flexDirection: 'row',
    width: "90%",
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: MetricsVertical.baseMarginIII
  },
  backCircleView: {
    height: MetricsMod.thirty,
    width: MetricsMod.thirty,
    borderRadius: MetricsMod.thirty / 2,
    borderWidth: 1,
    borderColor: AppStyles.colorSet.gray,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: AppStyles.colorSet.black,
    fontFamily: AppStyles.fontFamily.LatoBlack
    // fontWeight: 'bold'
  },
})

export default styles