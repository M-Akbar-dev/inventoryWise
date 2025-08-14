import { StyleSheet } from "react-native";
import { AppStyles, MetricsMod, MetricsVertical } from "../../themes";

const styles = StyleSheet.create({
    container :{
        flex :1,
        backgroundColor: AppStyles.colorSet.gradientColorII

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
        // fontFamily: AppStyles.fontFamily.InterBold
        fontWeight: 'bold'
    },
})

export default styles