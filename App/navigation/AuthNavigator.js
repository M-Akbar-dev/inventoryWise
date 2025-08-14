import React from "react";
import { View } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    CreateAccount,
    ForgotPassword,
    LogIn,
    OnBordingScreen,
    OTPScreen,
    ResetPassword,
} from "../screens";
import { MAIN_SCREENS } from "../constants/screens";
import DrawerNavigator from "./DrawerNavigator";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();


function AuthNavigator() {
    // const user = useSelector(state => state.AuthReducer.user);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name={MAIN_SCREENS.SPLASH_SCREEN}
                component={SplashScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name={MAIN_SCREENS.ON_BORDING_SCREEN}
                component={OnBordingScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={MAIN_SCREENS.LOG_IN}
                component={LogIn}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name={MAIN_SCREENS.CREATE_ACCOUNT}
                component={CreateAccount}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name={MAIN_SCREENS.FORGOT_PASSWORD}
                component={ForgotPassword}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name={MAIN_SCREENS.OTP_SCREEN}
                component={OTPScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name={MAIN_SCREENS.RESET_PASSWORD}
                component={ResetPassword}
                options={{
                    headerShown: false
                }}
            />

            {/* <Stack.Screen
                name={MAIN_SCREENS.HOME}
                component={MainStackNavigator}
                options={{ headerShown: false }}
            /> */}


            <Stack.Screen
                name={MAIN_SCREENS.HOME}
                component={DrawerNavigator}
                options={{
                    headerShown: false
                }}
            />


        </Stack.Navigator>
    )
}

export default AuthNavigator