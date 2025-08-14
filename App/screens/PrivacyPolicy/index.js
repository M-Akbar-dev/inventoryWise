import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import {WebView} from 'react-native-webview'
import { AppStyles, MetricsMod } from "../../themes";
import VectorIconComponent from "../../Component";
import { ICON_TYPES } from "../../constants/constant";
import { useSelector } from "react-redux";
import styles from "./styles";

function PrivacyPolicy(props){
    const {navigation} = props
    const textSize = useSelector((state) => state.AuthReducer.textSize);


    const body = () =>{
        const renderBack = () => (
            <View style={styles.rowView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View
                        style={[
                            styles.backCircleView,
                            {
                                height: MetricsMod.thirty + textSize,
                                width: MetricsMod.thirty + textSize,
                                borderRadius: (MetricsMod.thirty + textSize) / 2,
                            },
                        ]}
                    >
                        <VectorIconComponent
                            name="chevron-back-outline"
                            size={25 + textSize}
                            color={AppStyles.colorSet.black}
                            style={styles.iconStyles}
                            type={ICON_TYPES.IonIcons}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.title, { fontSize: 20 + textSize }]}></Text>

                <VectorIconComponent
                    name="chevron-back-outline"
                    size={25}
                    color={AppStyles.colorSet.gradientColorII}
                    style={styles.iconStyles}
                    type={ICON_TYPES.IonIcons}
                />
            </View>
        );


        return(
            <SafeAreaView style={styles.container}>
                {renderBack()}
                <WebView
                 source={{ uri: 'https://yana.physicianmarketing.us/privacy-policy' }} 
                 javaScriptEnabled={true}
                 userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

                 />
            </SafeAreaView>
        )
    }

    return body()
}

export default PrivacyPolicy