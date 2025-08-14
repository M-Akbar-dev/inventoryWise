import { Platform, StyleSheet } from "react-native";
import { AppStyles, MetricsMod } from "../../themes";

const styles = StyleSheet.create({
    backCircleView: {
        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:AppStyles.colorSet.white,
        // marginVertical:10,
        // marginLeft:10,
        position:'absolute',
        zIndex:1,
        right:20,
        top : Platform.OS === "android" ? 20 : 80
    },
})

export default styles