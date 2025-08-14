import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useEffect, useState } from "react";
import styles from "./styles";
import { AppStyles, Images, MetricsMod } from "../../themes";
import CustomTextInput from "../../Component/customTextInput";
import { MAIN_SCREENS } from "../../constants/screens";
import CustomButton from "../../Component/customButton.js";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import { useDispatch } from "react-redux";
import AlertMiddleware from "../../redux/Middlewares/AlertMiddleware.js";
import LoaderAction from "../../redux/Actions/LoaderAction.js";

function CreateAccount({ navigation }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyPhone: '',
    companyEmail: '',
    companyAddress: '',
    acceptTerms: true, // Default to true as per Postman
  });

  const [formErrors, setFormErrors] = useState({});
  const [companyLogo, setCompanyLogo] = useState(null);
  const [logoError, setLogoError] = useState('');
  const [apiError, setApiError] = useState('');

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    setFormErrors({ ...formErrors, [key]: '' });
    setApiError('');
  };

  const handleLogoUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        setCompanyLogo(response.assets[0]);
        setLogoError('');
      }
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last Name is required';
    // if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid Email';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (formData.confirmPassword !== formData.password) errors.confirmPassword = 'Passwords do not match';
    if (!formData.companyName.trim()) errors.companyName = 'Company Name is required';
    if (!formData.companyPhone.trim()) errors.companyPhone = 'Company Phone is required';
    // if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) errors.companyEmail = 'Invalid Company Email';
    if (!formData.companyAddress.trim()) errors.companyAddress = 'Company Address is required';
    if (!companyLogo) errors.logo = 'Company logo is required';

    setFormErrors(errors);
    setLogoError(errors.logo || '');
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      console.log(companyLogo ,">A>SASD>F?A>S?D>?ADS?")
      dispatch(LoaderAction.LoaderTrue())
      const formDataPayload = new FormData();
      formDataPayload.append('title', formData.firstName || '');
      formDataPayload.append('firstName', formData.firstName || '');
      formDataPayload.append('lastName', formData.lastName || '');
      formDataPayload.append('email', formData.email || '');
      formDataPayload.append('password', formData.password || '');
      formDataPayload.append('confirmPassword', formData.confirmPassword || '');
      formDataPayload.append('acceptTerms', formData.acceptTerms.toString());
      formDataPayload.append('company_name', formData.companyName || '');
      formDataPayload.append('company_email', formData.companyEmail || '');
      formDataPayload.append('company_address', formData.companyAddress || '');
      formDataPayload.append('company_phone', formData.companyPhone || '');
      // formDataPayload.append('image', companyLogo || '');
      // formDataPayload.append('company_logo', companyLogo || '');
 



      if (companyLogo) {
        formDataPayload.append('company_logo', {
          uri: companyLogo.uri,
          type: companyLogo.type || 'image/jpeg',
          name: companyLogo.fileName || `logo_${Date.now()}.jpg`,
        });
      }
      if (companyLogo) {
        formDataPayload.append('image', {
          uri: companyLogo.uri,
          type: companyLogo.type || 'image/jpeg',
          name: companyLogo.fileName || `logo_${Date.now()}.jpg`,
        });
      }

      const response = await axios.post(
        'https://api.inventorywise.co.uk/accounts/register',
        formDataPayload,
        {
          headers: {
            'Content-Type': 'multipart/form-data' 
          },
        }
      );

      console.log('Registration Successful:', response.data);
      dispatch(AlertMiddleware.showSuccess("Registered Successfully"));
      navigation.navigate(MAIN_SCREENS.LOG_IN);
      dispatch(LoaderAction.LoaderFalse())
    } catch (error) {
      dispatch(LoaderAction.LoaderFalse())
      console.error('Registration Error:', error.response?.data || error.message);
      setApiError(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
      dispatch(AlertMiddleware.showErrorAlert("Registration failed. Please try again."));
    }
  };

  const renderField = (label, key, placeholder, keyboardType = 'default', secure = false) => (
    <>
      <Text style={[styles.titleTxt, { marginTop: MetricsMod.thirty, fontSize: 15 }]}>{label}</Text>
      <CustomTextInput
        placeholder={placeholder}
        value={formData[key]}
        customInput={{ fontSize: 15 }}
        onChangeText={(text) => handleChange(key, text)}
        keyboardType={keyboardType}
        isRequired={true}
        secureTextEntry={secure}
        isPassword={secure}
        customContainerInput={styles.textInput}
      />
      {formErrors[key] && (
        <Text style={[styles.errorText, { fontSize: 14 }]}>{formErrors[key]}</Text>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.contianer}>
      <StatusBar backgroundColor={AppStyles.colorSet.white} />
      <ScrollView>
        <View style={{ marginTop: MetricsMod.thirtyEight }}>
          <Image style={styles.logoImg} source={Images.appIcon} resizeMode='contain' />
        </View>

        <View style={styles.headingView}>
          <Text style={[styles.headingText, { fontSize: 25 }]}>Register Your Account</Text>
          {/* <Text style={[styles.instructionTxt, { fontSize: 15 }]}>
            Enter your basic information to register your account.
          </Text> */}
        </View>

        {/* {renderField('Title', 'title', 'e.g., Mr./Ms.', 'default')} */}
        {renderField('First Name', 'firstName', 'e.g., John')}
        {renderField('Last Name', 'lastName', 'e.g., Doe')}
        {renderField('Email', 'email', 'e.g., john@example.com', 'email-address')}
        {renderField('Password', 'password', 'Enter your password', 'default', true)}
        {renderField('Confirm Password', 'confirmPassword', 'Confirm your password', 'default', true)}

        <Text style={[styles.titleTxt, {
          marginTop: MetricsMod.thirty,
          fontSize: 28,
          color: AppStyles.colorSet.appPrimaryColor
        }]}>
          Company Info
        </Text>

        <View style={styles.logoUploadContainer}>
          <Text style={[styles.titleTxt, { marginTop: MetricsMod.thirty, fontSize: 15 }]}>
            Company Logo
            <Text style={styles.mandatoryStar}> *</Text>
          </Text>

          <TouchableOpacity
            style={styles.logoContainer}
            onPress={handleLogoUpload}
          >
            {companyLogo ? (
              <Image
                source={{ uri: companyLogo.uri }}
                style={styles.logoImage}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={Images.camera}
                style={styles.placeholderIcon}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>

          {logoError && (
            <Text style={[styles.errorText, { fontSize: 14 }]}>{logoError}</Text>
          )}
        </View>

        {renderField('Company Name', 'companyName', 'e.g., ACME Corp')}
        {renderField('Company Phone', 'companyPhone', 'e.g., 1234567890', 'phone-pad')}
        {renderField('Company Email', 'companyEmail', 'e.g., hr@acme.com', 'email-address')}
        {renderField('Company Address', 'companyAddress', '123 Main St.')}

        {apiError && (
          <Text style={[styles.errorText, { fontSize: 14, textAlign: 'center', marginTop: 10 }]}>
            {apiError}
          </Text>
        )}

        <View style={styles.submitButton}>
          <CustomButton
            title="Register"
            onPress={handleRegister}
            customTitleStyle={{ fontSize: 15, fontFamily: AppStyles.fontFamily.LatoBlack }}
          />
        </View>

        <View style={styles.dontHaveAccount}>
          <Text style={styles.txtStyles}>Already have an account?
            <Text
              onPress={() => navigation.navigate(MAIN_SCREENS.LOG_IN)}
              style={[styles.txtStyles, {
                color: AppStyles.colorSet.appRed,
                fontWeight: 'bold'
              }]}>
              {" "}Login Here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateAccount;