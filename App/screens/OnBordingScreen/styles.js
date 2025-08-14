import { StyleSheet, Dimensions, Platform } from "react-native";
import { AppStyles, MetricsMod, MetricsVertical } from "../../themes";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        resizeMode: 'cover',

    },
    constructionView: {
        backgroundColor: AppStyles.colorSet.appRed,
        width: "80%",
        alignSelf: 'center',
        marginBottom: height * 0.05,
        alignItems: 'center',
        padding: height * 0.04,
        borderRadius: width * 0.1,
        height: "42%",
    },
    headingText: {
        fontSize: (width * 0.06),
        color: AppStyles.colorSet.white,
        textAlign: 'center',
        fontFamily: AppStyles.fontFamily.LatoBlack,
        // fontWeight:'bold',
        minHeight: height * 0.05,
    },
    instructionText: {
        fontSize: width * 0.05,
        color: AppStyles.colorSet.white,
        textAlign: 'center',
        marginVertical: height * 0.01,
        fontFamily: AppStyles.fontFamily.LatoBold,
        // fontWeight:'bold',
        height: height * 0.1,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: height * 0.02,
    },
    progressStep: {
        flex: 1,
        height: height * 0.01,
        marginHorizontal: width * 0.01,
        borderRadius: height * 0.005,
    },
    activeStep: {
        backgroundColor: AppStyles.colorSet.white,
        shadowColor: AppStyles.colorSet.white,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inactiveStep: {
        backgroundColor: AppStyles.colorSet.darkGray,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: height * 0.02,
        position: 'absolute',
        bottom: height * 0.03,
    },
    buttonText: {
        color: AppStyles.colorSet.white,
        fontSize: width * 0.04,
        fontFamily: AppStyles.fontFamily.LatoBold,
        alignSelf: 'center'

    },
    nextTxtView: {
        flexDirection: 'row',

    },
    iconStyles: {
        alignSelf: 'center',
        marginLeft: width * 0.01,

    },
    allDoneView: {
        marginLeft: "40%",
        alignSelf: 'center'
    },
});

export default styles;
