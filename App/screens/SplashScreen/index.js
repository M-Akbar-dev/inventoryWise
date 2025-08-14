import React, { useEffect, useState } from "react";
import { Image, StatusBar, View } from "react-native";
import styles from "./styles";
import { AppStyles, Images, MetricsMod } from "../../themes";
import AutoTypingText from 'react-native-auto-typing-text';
 import { MAIN_SCREENS } from "../../constants/screens";
import { useSelector } from "react-redux";

function SplashScreen(props) {
    const { navigation } = props
    const user = useSelector(state => state.AuthReducer.user);


    
    const handleTypingComplete = () => {
        if(user != null && user != undefined && user != '') {
            navigation.replace(MAIN_SCREENS.HOME);
        }else{
            navigation.replace(MAIN_SCREENS.LOG_IN);

        }
         
    };
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={AppStyles.colorSet.gradientColorII} />
            <Image style={styles.logo} source={Images.SplashLogo} />


            {/* <View style={{ height: 50, marginTop: MetricsMod.baseMarginIII , backgroundColor:'red' ,}}> */}
            <AutoTypingText
                text={`Welcome to Inventory wise j`}
                charMovingTime={120}
                delay={0}
                style={{
                    fontSize: 30,
                    color: AppStyles.colorSet.appPrimaryColor,
                    fontFamily: AppStyles.fontFamily.LatoBlack,
                    // fontWeight: "bold"

                }}
                onComplete={handleTypingComplete}

            />
            {/* </View> */}

        </View>
    )
}

export default SplashScreen