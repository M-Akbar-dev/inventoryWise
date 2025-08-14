import { StyleSheet } from "react-native";
import { AppStyles, Metrics, MetricsMod, MetricsVertical } from "../../themes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  alignItems: "center",
        backgroundColor: AppStyles.colorSet.white

    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: AppStyles.colorSet.black,
        fontFamily: AppStyles.fontFamily.LatoBlack
    },
    otpInput: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 8,
        width: 50,
        height: 50,
        fontSize: 24,
        textAlign: "center",
        marginHorizontal: 5,
    },
    rowView: {
        flexDirection: 'row',
        width: "90%",
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: MetricsVertical.baseMargin
    },
    headingView: {
        width: "90%",
        alignSelf: 'center',
        marginTop: MetricsVertical.doubleBaseMargin
    },
    headingText: {
        fontSize: 25,
        color: AppStyles.colorSet.black,
        fontFamily: AppStyles.fontFamily.LatoBlack
        // fontWeight:'bold'
    },
    instructionTxt: {
        color: AppStyles.colorSet.appBlack,
        fontFamily: AppStyles.fontFamily.LatoBoldItalic,
        // fontWeight:'bold',
        fontSize:15

    },
    otpView: {
        // width: "90%",
        alignSelf: 'center',
        marginTop: MetricsVertical.doubleBaseMargin,
 
    },
    codeNotRe: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: MetricsVertical.doubleBaseMargin,
     },
    txt: {
        color: AppStyles.colorSet.gray,
        fontFamily: AppStyles.fontFamily.LatoBold,
        // fontWeight:"500",
        color:AppStyles.colorSet.appBlack,
        fontSize:15
    },
    logoImg: {
        width: MetricsMod.twoNinety,
        height: MetricsMod.hundredFive,
        alignSelf: 'center',
        marginTop: MetricsMod.baseMarginIII
    },
    btnStyle: {
        marginTop: MetricsVertical.marginThirty
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
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: AppStyles.fontFamily.LatoBold
    },

});

export default styles;
