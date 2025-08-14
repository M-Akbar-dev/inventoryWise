// import React, { useState, useRef, useEffect } from "react";
// import { Animated, Text, View, TouchableOpacity, ImageBackground, StatusBar, Image, PermissionsAndroid, Alert } from "react-native";
// import { AppStyles, Images } from "../../themes";
// import styles from "./styles";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import VectorIconComponent from "../../Component";
// import { ICON_TYPES } from "../../constants/constant";
// import { MAIN_SCREENS } from "../../constants/screens";
// import { useSelector } from "react-redux";
// // import messaging from '@react-native-firebase/messaging'

import { SafeAreaView, Text, View } from "react-native"


// function OnBordingScreen(props) {
//     const { navigation } = props
//     const [currentStep, setCurrentStep] = useState(0);
//     const animation = useRef(new Animated.Value(0)).current;
//     const textSize = useSelector((state) => state.AuthReducer.textSize);

//     // useEffect(() => {
//     //     const requestUserPermission = async () => {
//     //         try {
//     //             const authStatus = await messaging().requestPermission();
//     //             const enabled =
//     //                 authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     //                 authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     //             if (enabled) {
//     //                 console.log('Authorization status:', authStatus);
//     //                 const token = await messaging().getToken();
//     //                 console.log('FCM token:', token);
//     //             }
//     //         } catch (error) {
//     //             console.log(error, "ASDFSFDASDFASDF")
//     //         }

//     //     };

//     //     requestUserPermission();
//     // }, [])

//     // messaging().setBackgroundMessageHandler(async remoteMessage => {
//     //     console.log('Message handled in the background!', remoteMessage);
//     // });

//     // useEffect(() => {
//     //     const unsubscribe = messaging().onMessage(async remoteMessage => {
//     //         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//     //     });

//     //     return unsubscribe;


//     // }, []);



//     const steps = [
//         {
//             heading: "We Deliver Meals",
//             instruction: "Freshly prepared meals delivered weekly to your doorstep.",
//         },
//         {
//             heading: "We Provide Variety",
//             instruction: "A wide range of healthy meals to choose from.",
//         },
//         {
//             heading: "We Adjust Schedules",
//             instruction: "Adjust or pause your plan according to the schedule.",
//         },
//     ];
//     const backgroundImages = [Images.BGImg2, Images.BGImg, Images.BGImg3];

//     const handleNext = () => {
//         if (currentStep < steps.length - 1) {
//             Animated.timing(animation, {
//                 toValue: 1,
//                 duration: 200,
//                 useNativeDriver: true,
//             }).start(() => {
//                 setCurrentStep(currentStep + 1);
//                 animation.setValue(0);
//             });
//         }
//     };

//     const handleSkip = () => {
//         navigation.replace(MAIN_SCREENS.LOG_IN)
//     };

//     const renderStepIndicator = () => {
//         return (
//             <View style={styles.progressContainer}>
//                 {steps.map((_, index) => (
//                     <TouchableOpacity
//                         hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
//                         onPress={() => setCurrentStep(index)}
//                         key={index} style={[
//                             styles.progressStep,
//                             index === currentStep ? styles.activeStep : styles.inactiveStep,
//                         ]}>
//                         {/* {index === currentStep && (
//                             <Text style={styles.stepText}>{index + 1}</Text>
//                         )} */}
//                     </TouchableOpacity>
//                 ))}
//             </View>
//         );
//     };

//     const renderButtons = () => {
//         return (
//             <View style={styles.buttonContainer}>
//                 {currentStep === steps.length - 1 ? (
//                     null
//                 ) : (
//                     <TouchableOpacity onPress={handleSkip}>
//                         <Text style={styles.buttonText}>Skip</Text>
//                     </TouchableOpacity>
//                 )}

//                 <TouchableOpacity onPress={handleNext}>
//                     {currentStep === steps.length - 1 ? (
//                         <TouchableOpacity
//                             onPress={() => { navigation.replace(MAIN_SCREENS.LOG_IN) }}
//                             style={styles.allDoneView}
//                         >
//                             <Image style={{ height: 80, width: 80, }} source={Images.ProgressImg} />
//                             {/* <VectorIconComponent
//                                 name="arrowright"
//                                 size={20}
//                                 color={"#0E6D99"}
//                                 style={styles.iconStyles}
//                                 type={ICON_TYPES.AntDesign}
//                             /> */}
//                         </TouchableOpacity>
//                     ) : (
//                         <View style={styles.nextTxtView}>
//                             <Text style={styles.buttonText}>Next</Text>
//                             <VectorIconComponent
//                                 name="arrowright"
//                                 size={25}
//                                 color={AppStyles.colorSet.white}
//                                 style={[styles.iconStyles, { marginTop: 2 }]}
//                                 type={ICON_TYPES.AntDesign}
//                             />
//                         </View>
//                     )}
//                 </TouchableOpacity>
//             </View>
//         );
//     };

//     const instructionView = () => {
//         const translateX = animation.interpolate({
//             inputRange: [0, 1],
//             outputRange: [0, -300],
//         });

//         return (
//             <View style={styles.constructionView}>
//                 <Animated.View style={{ transform: [{ translateX }] }}>
//                     <Text style={styles.headingText}>{steps[currentStep].heading}</Text>
//                     <Text style={styles.instructionText}>{steps[currentStep].instruction}</Text>
//                 </Animated.View>
//                 {renderStepIndicator()}
//                 {renderButtons()}
//             </View>
//         );
//     };

//     const body = () => {
//         return (
//             <View style={{ flex: 1, }}>
//                 <ImageBackground
//                     style={styles.container}
//                     source={backgroundImages[currentStep]}
//                     resizeMode='stretch'
//                 >
//                     {instructionView()}
//                 </ImageBackground>
//             </View>
//         );
//     };

//     return body();
// }

// export default OnBordingScreen;\


function OnBordingScreen(props){

    const body = () =>{
        return(
            <SafeAreaView>
                <Text>werqwerqwer</Text>
            </SafeAreaView>
        )
    }


    return body()
}

export default OnBordingScreen