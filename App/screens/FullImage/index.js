import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import VectorIconComponent from "../../Component"
import { ICON_TYPES } from "../../constants/constant"
import { AppStyles, MetricsMod } from "../../themes"
import styles from "./styles"
import { MAIN_SCREENS } from "../../constants/screens"

function FullImage(props) {
    const image = props.route.params
    const {navigation} = props
 
    const body = () => {

        return (
            <SafeAreaView style={{flex:1}}>
                     <TouchableOpacity 
                     onPress={()=>{navigation.goBack()}}
                        style={[
                            styles.backCircleView,
                            {
                                height: MetricsMod.thirty ,
                                width: MetricsMod.thirty ,
                                borderRadius: (MetricsMod.thirty) / 2,
                            },
                        ]}
                    >
                        <VectorIconComponent
                            name="close"
                            size={25}
                            color={AppStyles.colorSet.black}
                            style={styles.iconStyles}
                            type={ICON_TYPES.IonIcons}
                        />
                    </TouchableOpacity>
               <Image  style={{flex:1 }} source={{uri : image?.image}} />
            </SafeAreaView>
        )
    }

    return body()
}

export default FullImage