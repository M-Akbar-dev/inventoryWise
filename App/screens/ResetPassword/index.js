import { SafeAreaView, Text, TextInput, TouchableOpacity, Image, View } from "react-native";
import { useState } from "react";
import styles from "./styles";
import VectorIconComponent from "../../Component";
import { ICON_TYPES } from "../../constants/constant";
import { MAIN_SCREENS } from "../../constants/screens";
import { AppStyles, Images, MetricsMod } from "../../themes";
import CustomHeader from "../../Component/customHeader";

function ResetPassword(props) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");

    const handleSubmit = () => {
        let isValid = true;

        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (newPassword !== confirmPassword) {
            setConfirmError("Passwords do not match");
            isValid = false;
        } else {
            setConfirmError("");
        }

        if (isValid) {
            // Handle password reset logic here
            props.navigation.navigate(MAIN_SCREENS.LOG_IN);
        }
    };

    const renderBack = () => {
        return (
            <View style={styles.rowView}>
                <TouchableOpacity
                    onPress={() => {props.navigation.goBack() }}
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

                <Text style={[styles.title, { fontSize: 20 }]}>Reset Password</Text>
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

    const body = () => {
        return (
            <SafeAreaView style={styles.container}>
                {/* <CustomHeader title={props?.route?.name} /> */}
                {renderBack()}
                <View style={[styles.container, { padding: 20 }]} >
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>New Password</Text>
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter new password"
                                placeholderTextColor="#999"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry={!showNewPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                onPress={() => setShowNewPassword(!showNewPassword)}
                                style={styles.eyeIcon}
                            >
                                <VectorIconComponent
                                    name={showNewPassword ? "eye-off" : "eye"}
                                    size={24}
                                    color="#666"
                                    type={ICON_TYPES.Feather}
                                />
                            </TouchableOpacity>
                        </View>
                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm new password"
                                placeholderTextColor="#999"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={styles.eyeIcon}
                            >
                                <VectorIconComponent
                                    name={showConfirmPassword ? "eye-off" : "eye"}
                                    size={24}
                                    color="#666"
                                    type={ICON_TYPES.Feather}
                                />
                            </TouchableOpacity>
                        </View>
                        {confirmError ? <Text style={styles.errorText}>{confirmError}</Text> : null}
                    </View>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    };

    return body();
}

export default ResetPassword;