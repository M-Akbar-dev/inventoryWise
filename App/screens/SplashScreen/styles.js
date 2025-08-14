import { StyleSheet } from "react-native";
import { AppStyles, MetricsMod } from "../../themes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.colorSet.white,
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 210,
        marginTop: MetricsMod.hundredFifty,

    }
})

export default styles