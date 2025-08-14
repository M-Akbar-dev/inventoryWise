import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import styles from "./styles";
import CustomTextInput from "../../Component/customTextInput";
import { useEffect, useState } from "react";
import { AppStyles, Images, MetricsMod } from "../../themes";
import CustomButton from "../../Component/customButton.js";
import { MAIN_SCREENS } from "../../constants/screens.js";
import { useDispatch } from "react-redux";
import AlertMiddleware from "../../redux/Middlewares/AlertMiddleware.js";
import axios from "axios";
import LoaderAction from "../../redux/Actions/LoaderAction.js";
import AuthAction from "../../redux/Actions/AuthAction.js";

function LogIn(props) {
    const dispatch = useDispatch();
    const { navigation } = props

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState('')
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleLoginPress = () => {
        let isValid = true;

        if (!validatePassword(userName)) {
            setUserNameError('Please enter valid Username and');
            isValid = false;
        } else {
            setUserNameError('');
        }

        if (!validatePassword(password)) {
            if (userName != '') {
                setPasswordError('Enter your password');
            } else {
                setPasswordError('Password for login');
            }
            isValid = false;
        } else {
            setPasswordError('');
        }


        if (isValid) {
            console.log('Login Pressed');
            handleRegister()
        }
    };


    const handleRegister = async () => {
        dispatch(LoaderAction.LoaderTrue());
        try {
            const payload = {

                email: userName,
                password: password,

            };
            const response = await axios.post(
                'https://api.inventorywise.co.uk/accounts/authenticate',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Registration Successful:', response.data);
            const responseData = response.data;
            dispatch(AuthAction.Signin(responseData));
            dispatch(LoaderAction.LoaderFalse());
            dispatch(AlertMiddleware.showSuccess("Login Successfully"));
            navigation.navigate(MAIN_SCREENS.HOME);
        } catch (error) {
            dispatch(LoaderAction.LoaderFalse());
            dispatch(AlertMiddleware.showErrorAlert(error.response?.data?.message || 'Login failed. Please try again.'));
            console.error('Registration Error:', error.response?.data || error.message);
            setApiError(
                error.response?.data?.message || 'Login failed. Please try again.'
            );
            dispatch(AlertMiddleware.showErrorAlert("Login failed. Please try again."));
        }
    };


    const renderButtons = () => {
        return (
            <View style={styles.submitButton}>
                <CustomButton
                    title="Login"
                    onPress={handleLoginPress}
                    customTitleStyle={{ fontSize: 15, fontfamily: AppStyles.fontFamily.LatoBlack }}
                />
            </View>
        );
    };

    const renderRegisterHereTxt = () => {
        return (
            <View style={styles.dontHaveAccount}>
                <Text style={styles.txtStyles}>Don't have an account?
                    <Text onPress={() => { navigation.navigate(MAIN_SCREENS.CREATE_ACCOUNT) }} style={[styles.txtStyles, { color: AppStyles.colorSet.appRed, fontWeight: 'bold' }]}>Register Here</Text>
                </Text>
            </View>
        )
    }

    const renderForgotPasswordTxt = () => {
        return (
            <TouchableOpacity onPress={() => {
                // speakText('Forgot password?');
                navigation.navigate(MAIN_SCREENS.FORGOT_PASSWORD);
                setUserNameError('')
                setPasswordError('')
            }}>
                <Text style={[styles.forgotPasswordTxt, { fontSize: 15 }]}>Forgot password?</Text>
            </TouchableOpacity>
        )
    };

    const renderHeading = () => {
        return (
            <View style={styles.headingView}>
                <Text style={[styles.headingText, { fontSize: 25 }]}>Sign In to Your Account</Text>
                {/* <Text style={[styles.instructionTxt, { fontSize: 15 }]}>Enter your username and password to access your account.</Text> */}
            </View>
        );
    };

    const renderTxtInputs = () => {
        return (
            <View>
                <Text style={[styles.titleTxt, { marginTop: MetricsMod.thirty, fontSize: 15 }]}>Username</Text>
                <CustomTextInput
                    placeholder="e.g., johndoe123"
                    value={userName}
                    customInput={{ fontSize: 15 }}
                    onChangeText={(text) => {
                        const sanitizedText = text.trimStart();
                        setUserName(sanitizedText);
                        if (sanitizedText.length > 0) {
                            setUserNameError('');
                        }
                    }}
                    keyboardType="email-address"
                    isRequired={true}
                    customContainerInput={styles.textInput}
                />

                <Text style={[styles.titleTxt, { fontSize: 15 }]}>Password</Text>
                <CustomTextInput
                    placeholder="Your secure password"
                    value={password}
                    customInput={{ fontSize: 15 }}
                    onChangeText={(text) => {
                        const sanitizedText = text.trimStart();
                        setPassword(sanitizedText);
                        if (sanitizedText.length > 0) {
                            setPasswordError('');
                        }
                    }}
                    secureTextEntry={true}
                    isPassword={true}
                    isRequired={true}
                    editable
                    selectTextOnFocus={true}
                    customContainerInput={styles.textInput}
                />

                {passwordError ? <TouchableOpacity><Text style={[styles.errorText, { fontSize: 15 }]}>{userNameError}{" "}{passwordError}</Text></TouchableOpacity> : null}
            </View>
        );
    };

    const renderLogo = () => {
        return (
            <View style={{ marginTop: MetricsMod.thirtyEight }}>
                <Image style={styles.logoImg} source={Images.appIcon} resizeMode='contain' />
            </View>
        )
    }

    const body = () => {
        return (
            <SafeAreaView style={styles.contianer}>
                <StatusBar backgroundColor={AppStyles.colorSet.white} />
                <ScrollView>
                    {renderLogo()}
                    {renderHeading()}
                    {renderTxtInputs()}
                    {renderForgotPasswordTxt()}
                    {renderButtons()}
                    {renderRegisterHereTxt()}
                </ScrollView>
            </SafeAreaView>
        );
    };

    return body();
}

export default LogIn;
