import { StyleSheet } from "react-native";
import { AppStyles, MetricsMod, MetricsVertical } from "../../themes";

const styles = StyleSheet.create({ 

    container: {
        flex: 1,
        // padding: 20,
        backgroundColor: '#fff',
    },
    logo: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        // marginVertical: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: AppStyles.colorSet.black,
        fontFamily: AppStyles.fontFamily.LatoBold,
    },
    passwordInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    input: {
        flex: 1,
        padding: 12,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 10,
    },
    submitButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
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
    backCircleView: {
        height: MetricsMod.thirty,
        width: MetricsMod.thirty,
        borderRadius: MetricsMod.thirty / 2,
        borderWidth: 1,
        borderColor: AppStyles.colorSet.gray,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default styles