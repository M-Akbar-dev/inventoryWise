import { StyleSheet } from "react-native";
import { AppStyles, MetricsMod } from "../../themes";

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertBox: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: MetricsMod.baseMargin,
        textAlign: 'center',
        color: AppStyles.colorSet.appBlack,
        fontFamily: AppStyles.fontFamily.LatoBlack
        // fontWeight:'bold'
    },
    description: {
        fontSize: 16,
        color: AppStyles.colorSet.appBlack,
        marginBottom: MetricsMod.twenty,
        fontFamily: AppStyles.fontFamily.LatoBold,
        // fontWeight:'600',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 3
    },
    button: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonPrimary: {
        backgroundColor: AppStyles.colorSet.transparent,
        borderWidth: 1,
        borderColor: AppStyles.colorSet.black,
        borderRadius: 8,
 
        
     },
    buttonSecondary: {
        backgroundColor: AppStyles.colorSet.appRed,
        borderRadius:8,
     },
    buttonTertiary: {
        backgroundColor: AppStyles.colorSet.appFontColor,
        borderRadius:8,
    },
    buttonText: {
        color: AppStyles.colorSet.appBlack,
        fontSize: 14,
        alignSelf: 'center',
        fontFamily:AppStyles.fontFamily.LatoBlack
        // fontWeight:'bold'
    },

    buttonTextPrimary: {
        color: AppStyles.colorSet.appBlack,  

    },
    buttonTextSecondary: {
        color: AppStyles.colorSet.white,  
    },
    buttonTextTertiary: {
        color: AppStyles.colorSet.white, 
    },
});

export default styles