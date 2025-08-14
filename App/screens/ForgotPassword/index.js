
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Pressable,
    Alert,
    Clipboard,
    StyleSheet,
} from "react-native"
import styles from "./styles" // Assuming styles.js exists and contains your base styles
import CustomTextInput from "../../Component/customTextInput"
import { useState } from "react"
import { AppStyles, Images, MetricsMod } from "../../themes"
import CustomButton from "../../Component/customButton.js"
import VectorIconComponent from "../../Component/index.js"
import { ICON_TYPES } from "../../constants/constant.js"
import axios from "axios" // Import axios
import { useDispatch } from "react-redux"
import LoaderAction from "../../redux/Actions/LoaderAction.js"

function ForgotPassword(props) {
    const { navigation } = props
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false)
    const dispatch = useDispatch()

    const handlesubmit = () => {
        if (email === "") {
            setError("Enter your email address")
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address")
        } else {
            setError("")
            sendForgotPasswordRequest() // Changed to sendForgotPasswordRequest
        }
    }

    const sendForgotPasswordRequest = async () => {
        dispatch(LoaderAction.LoaderTrue());  
        try {
            const response = await axios.get(`https://api.inventorywise.co.uk/accounts/forgot-password?email=${email}`)
            // dispatch(LoaderAction.LoaderFalse()); // Uncomment if you have a loader

            if (response.data && response.data.new_password) {
        dispatch(LoaderAction.LoaderFalse());  
                setNewPassword(response.data.new_password)
                setIsModalVisible(true)
            } else {
                // Handle cases where API returns success but no new_password or a different message
                setError(response.data.message || "Failed to retrieve new password.")
        dispatch(LoaderAction.LoaderFalse());  
            }
        } catch (err) {
        dispatch(LoaderAction.LoaderFalse());  
            // dispatch(LoaderAction.LoaderFalse()); // Uncomment if you have a loader
            console.error("API Error:", err)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            } else {
                setError("An unexpected error occurred. Please try again.")
            }
        }
    }

    const copyPasswordToClipboard = () => {
        Clipboard.setString(newPassword)
        Alert.alert("Copied!", "New password copied to clipboard.")
    }

    const renderButtons = () => {
        return (
            <View style={styles.submitButton}>
                <CustomButton
                    title="Continue"
                    onPress={handlesubmit}
                    customTitleStyle={{ fontSize: 15 }}
                    iconType="FontAwesome"
                />
            </View>
        )
    }

    const renderHeading = () => {
        return (
            <View style={styles.headingView}>
                <Text style={[styles.headingText, { fontSize: 25 }]}>Forgot Your Password?</Text>
            </View>
        )
    }

    const renderTxtInputs = () => {
        return (
            <View>
                <TouchableOpacity>
                    <Text style={[styles.titleTxt, { marginTop: MetricsMod.thirty, fontSize: 15 }]}>Email Address</Text>
                </TouchableOpacity>
                <CustomTextInput
                    placeholder="e.g., example@domain.com"
                    value={email}
                    customInput={{ fontSize: 15 }}
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                    keyboardType="email-address"
                    isRequired={true}
                    customContainerInput={styles.textInput}
                />
                {error ? <Text style={[styles.errorText, { fontSize: 15 }]}>{error}</Text> : null}
            </View>
        )
    }

    const renderLogo = () => {
        return (
            <View style={{}}>
                <Image style={styles.logoImg} source={Images.appIcon} resizeMode="contain" />
            </View>
        )
    }

    const renderBack = () => {
        return (
            <View style={styles.rowView}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <View
                        style={[
                            styles.backCircleView,
                            {
                                height: MetricsMod.thirty,
                                width: MetricsMod.thirty,
                                borderRadius: MetricsMod.thirty / 2,
                            },
                        ]}
                    >
                        <VectorIconComponent
                            name="chevron-back-outline"
                            size={25}
                            color={AppStyles.colorSet.black}
                            style={styles.iconStyles}
                            type={ICON_TYPES.IonIcons}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.title, { fontSize: 20 }]}>Forgot Password</Text>
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

    const renderPasswordModal = () => {
        return (
            <Modal
                animationType="fade" // Changed to fade for a smoother transition
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <Pressable style={modalStyles.centeredView} onPress={() => setIsModalVisible(false)}>
                    <View style={modalStyles.modalView}>
                        <Text style={modalStyles.modalTitle}>Your New Password</Text>
                        <Text style={modalStyles.newPasswordText}>{newPassword}</Text>
                        <TouchableOpacity style={modalStyles.copyButton} onPress={copyPasswordToClipboard}>
                            <VectorIconComponent
                                name="copy"
                                size={20}
                                color={AppStyles.colorSet.white}
                                type={ICON_TYPES.Feather} // Assuming Feather for copy icon
                            />
                            <Text style={modalStyles.copyButtonText}>Copy Password</Text>
                        </TouchableOpacity>
                        <CustomButton title="Close" onPress={() => setIsModalVisible(false)} customTitleStyle={{ fontSize: 15 }} />
                    </View>
                </Pressable>
            </Modal>
        )
    }

    const body = () => {
        return (
            <SafeAreaView style={styles.contianer}>
                <StatusBar backgroundColor={AppStyles.colorSet.white} />
                <ScrollView>
                    {renderBack()}
                    {renderLogo()}
                    {renderHeading()}
                    {renderTxtInputs()}
                    {renderButtons()}
                </ScrollView>
                {renderPasswordModal()}
            </SafeAreaView>
        )
    }

    return body()
}

// Add modal specific styles here, or move them to your styles.js
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "80%", // Adjust width as needed
        maxWidth: 400,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: AppStyles.colorSet.black,
    },
    newPasswordText: {
        fontSize: 18,
        fontWeight: "600",
        color: AppStyles.colorSet.appPrimaryColor,
        marginBottom: 20,
        padding: 10,
        backgroundColor: AppStyles.colorSet.lightGray,
        borderRadius: 8,
        width: "100%",
        textAlign: "center",
    },
    copyButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: AppStyles.colorSet.appPrimaryColor,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 15,
    },
    copyButtonText: {
        color: AppStyles.colorSet.white,
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
})

export default ForgotPassword
