import {StyleSheet} from 'react-native';
import { AppStyles } from '../../themes';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
         position: 'absolute',
        // alignSelf: 'center',
        backgroundColor:AppStyles.colorSet.whiteBlur,
        left:0,
        right:0,
        top:0,
        bottom:0,
        alignItems:'center',
        justifyContent:'center',
        zIndex:10
    },
    indicatorStyle: {
        color:AppStyles.colorSet.appRed
    },
});
