import React from "react";
import { Image } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    AddPropertyScreen,
    EditProperty,
    Home,
    InspectionPDFGenerator,
    PropertyDetailPage,
    ResetPassword,
    SignatureScreen,
} from "../screens";
import { MAIN_SCREENS } from "../constants/screens";
import { useNavigation } from '@react-navigation/native';



const Stack = createNativeStackNavigator();


function MainStackNavigator() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator

            // initialRouteName={MAIN_SCREENS.SPLASH_SCREEN}
            screenOptions={{
                // ...DEFAULT_SCREEN_OPTIONS,
                // headerShown: false
            }}
        >
            <Stack.Screen
                name={MAIN_SCREENS.HOME}
                component={Home}
                options={{
                    headerShown: false,

                }}

            />

            <Stack.Screen
                name={MAIN_SCREENS.ADD_PROPERTY_SCREEN}
                component={AddPropertyScreen}
                options={{
                    headerShown: false,

                }}

            />

            <Stack.Screen
                name={MAIN_SCREENS.SIGNATURE_SCREEN}
                component={SignatureScreen}
                options={{
                    // headerShown: false,

                }}

            />

            <Stack.Screen
                name={MAIN_SCREENS.PROPERTY_DETAIL_PAGE}
                component={PropertyDetailPage}
                options={{
                    headerShown: false,

                }}

            />

            <Stack.Screen
                name={MAIN_SCREENS.INSPECTION_PDF_GENERATOR}
                component={InspectionPDFGenerator}
                options={{
                    headerShown: false,

                }}
            />

            <Stack.Screen
                name={MAIN_SCREENS.EDIT_PROPERTY}
                component={EditProperty}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}

export default MainStackNavigator