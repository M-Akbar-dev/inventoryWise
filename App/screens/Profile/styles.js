import { StyleSheet } from "react-native";
import { AppStyles, MetricsHorizontal, MetricsMod, MetricsVertical } from "../../themes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.colorSet.gradientColorII
    },
    rowView: {
        flexDirection: 'row',
        width: "90%",
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: MetricsVertical.baseMarginIII,
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
        fontFamily: AppStyles.fontFamily.LatoBlack,
        // fontWeight:'bold'
    },
    detailContainer: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    imgContainer: {
        height: 155,
        width: 155,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: AppStyles.colorSet.appRed,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        height: 150,
        width: 150,
        borderRadius: 75,
        alignSelf: 'center'
    },
    nameTxt: {
        fontSize: 20,
        fontFamily: AppStyles.fontFamily.LatoBlack,
        // fontWeight:'bold',
        color: AppStyles.colorSet.appBlack,
        marginTop: MetricsMod.baseMargin
    },
    emailTxt: {
        color: AppStyles.colorSet.darkGray,
        fontSize: 15,
        fontFamily: AppStyles.fontFamily.InterMedium
    },
    rowCreds: {
        flexDirection: 'row',
        width: "80%",
        alignSelf: 'center',
        justifyContent: 'space-between',
        backgroundColor: AppStyles.colorSet.lightGray,
        padding: MetricsMod.six,
        borderRadius: 5,
        shadowColor: AppStyles.colorSet.appBlack,
        marginTop: MetricsMod.baseMarginIII
    },
    textCreds: {
        fontFamily: AppStyles.fontFamily.InterBold,
        color: AppStyles.colorSet.appBlack
    },
    txtTitle: {
        fontFamily: AppStyles.fontFamily.InterBold,
        color: AppStyles.colorSet.appRed
    },
    PInfoContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: MetricsMod.twenty
    },
    infoRowContainer: {
        marginTop: MetricsMod.baseMarginIII,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: '#E6E6F0',
        padding: 5,
        borderRadius: 10
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dataTxt: {
        fontFamily: AppStyles.fontFamily.LatoBlack,
        // fontWeight: 'bold',
        color: AppStyles.colorSet.appBlack,
        marginHorizontal: MetricsHorizontal.baseMarginII,
        fontSize: 15,
        width: MetricsMod.twoHundred
    },
    mainTitle: {
        fontFamily: AppStyles.fontFamily.InterSamiBold,
        marginLeft: 3,
        color: AppStyles.colorSet.darkGray

    },
    logoutBtn: {
        width: "90%",
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: MetricsVertical.baseMargin,
        marginVertical: MetricsVertical.baseMarginIII,
        borderColor: AppStyles.colorSet.darkGray,
        borderRadius: 30,
        borderWidth: 1,
        backgroundColor: AppStyles.colorSet.lightGray,
        marginTop: MetricsMod.marginForty,
     },
    logoutTxt: {
        // fontFamily: AppStyles.fontFamily.InterBold,
        fontWeight:'bold',
        color: AppStyles.colorSet.appRed,
        marginHorizontal: 3
    }

})

export default styles