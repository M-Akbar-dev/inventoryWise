import React, { useRef } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";

function RootNavigator(props) {

    const routeNameRef = useRef();
    // const navigationRef = useRef();

    const renderBody = () => {
        return (
            <NavigationContainer
            // linking={{
            //     prefixes :[]
            // }}
                // ref={navigationRef}
                >
                <AuthNavigator />
            </NavigationContainer>
        );

    };
    return renderBody()
}

export default RootNavigator