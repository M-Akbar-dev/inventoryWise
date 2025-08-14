import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView
} from "react-native";
import React, { useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import styles from "./styles";
import VectorIconComponent from "../../Component";
import { AppStyles, Images, MetricsMod } from "../../themes";
import { ICON_TYPES } from "../../constants/constant";
import CustomButton from "../../Component/customButton.js";
import { MAIN_SCREENS } from "../../constants/screens.js";
   
  
function OTPScreen(props) {
    const { navigation } = props
  
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    // const { UserEmail } = props.route.params

    const handleOtpSubmit = () => {
        if (!otp || otp.length !== 6) {
            setError("Please enter the OTP.");
            // speakText("Please enter the OTP.")
            // dispatch(AlertMiddleware.showErrorAlert("Please enter the OTP."))
        } else {
            setError("");
            // VerifyOTP()
            navigation.navigate(MAIN_SCREENS.RESET_PASSWORD)

        }
    };

    const sendotpInEmail = async () => {
        

      
    };

    const VerifyOTP = async () => {
        const data = {
            otp: otp,
            phone: UserNo
        };
 

        // axios
        //     .post(`${URLS.LocalBaseURL}/v2/auth/verify-otp`, data, {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     })
        //     .then((response) => {
        //         console.log(response.data, "success otp resonse333");
        //         if (response.success) {
        //             dispatch(AlertMiddleware.showSuccess("OTP Verified"))
        //             dispatch(LoaderAction.LoaderFalse())
        //             navigation.navigate(MAIN_SCREENS.RESET_PASSWORD)
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error, "Error otp response55");
        //         dispatch(AlertMiddleware.showErrorAlert("Invalid OTP code"))
        //         dispatch(LoaderAction.LoaderFalse())
        //     });

    }
    const formatUserNo = (UserEmail) => {
        if (UserEmail.length < 10) return UserEmail;
        const areaCode = UserEmail.substring(0, 3);
        const firstTwoDigits = UserEmail.substring(3, 7);
        return `(${areaCode})-${firstTwoDigits}.....`;
    };

    const renderHeading = () => {
         return (
            <View style={styles.headingView}>
                <Text style={[styles.headingText, { fontSize: 25  }]}>Email verification.</Text>
                <Text style={[styles.instructionTxt, { fontSize: 15  }]}>Enter the verification code we send you on:
                  </Text>
            </View>
        );
    };

    const renderBack = () => {
        return (
            <View style={styles.rowView}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <View style={[styles.backCircleView, {
                        height: MetricsMod.thirty ,
                        width: MetricsMod.thirty ,
                        borderRadius: (MetricsMod.thirty ) / 2
                    }]}>
                        <VectorIconComponent
                            name="chevron-back-outline"
                            size={25}
                            color={AppStyles.colorSet.black}
                            style={styles.iconStyles}
                            type={ICON_TYPES.IonIcons}
                        />
                    </View>
                </TouchableOpacity>

                <Text style={[styles.title, { fontSize: 20 }]}>OTP</Text>
                <VectorIconComponent
                    name="chevron-back-outline"
                    size={25}
                    color={AppStyles.colorSet.white}
                    style={styles.iconStyles}
                    type={ICON_TYPES.IonIcons}
                />
            </View>
        )
    }
    const renderOTP = () => {
        return (
            <View style={styles.otpView}>
                <OTPTextInput
                    handleTextChange={setOtp}
                    tintColor={AppStyles.colorSet.appRed}
                    textInputStyle={styles.otpInput}
                    inputCount={6}
                    keyboardType="number-pad"
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
        )
    }

    const renderDidNot = () => {
        return (
            <View style={styles.codeNotRe}>
                <Text style={[styles.txt, { fontSize: 15 }]}>Didn’t receive code?</Text>
                <TouchableOpacity
                    onPress={() => { sendotpInEmail() }}
                >
                    <Text style={[styles.txt, { color: AppStyles.colorSet.appRed, fontSize: 15, fontFamily: AppStyles.fontFamily.LatoBlack }]}> Resend</Text>
                </TouchableOpacity>

            </View>
        )
    }

    const renderLogo = () => {
        return (
            <View style={{}}>
                <Image source={Images.appIcon} style={styles.logoImg} resizeMode='contain' />
            </View>
        )
    }

    const renderBtn = () => {
        return (
            <CustomButton
                title="Continue"
                buttonStyleWrapper={styles.btnStyle}
                customTitleStyle={{ fontSize: 15 }}
                onPress={handleOtpSubmit}
            />
        )
    }

    const renderPassTime = () => {
        return (
            <View style={[styles.codeNotRe, { alignItems: 'center' }]}>
                <VectorIconComponent
                    name="clockcircleo"
                    size={18}
                    color={AppStyles.colorSet.black}
                    style={[styles.iconStyles, { marginRight: 10 }]}
                    type={ICON_TYPES.AntDesign}
                />
            </View>
        )
    }

    const body = () => {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {renderBack()}
                    {renderLogo()}
                    {renderHeading()}
                    {renderOTP()}
                    {renderDidNot()}
                    {/* {renderPassTime()} */}
                    {renderBtn()}
                </ScrollView>
            </SafeAreaView>
        );
    };

    return body();
}

export default OTPScreen;
