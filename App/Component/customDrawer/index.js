import React, { useCallback, useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Linking
} from 'react-native';
import styles from './styles';
import Images from '../../themes/Images';
import { AppStyles, MetricsMod } from '../../themes';
import { MAIN_SCREENS } from '../../constants/screens';
import { isEmpty } from 'lodash';

import { useIsFocused } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomListItem from '../customListItem';
import { useDispatch, useSelector } from 'react-redux';
import { AuthAction, LoaderAction } from '../../redux/Actions';
import axios from 'axios';

const UserDetails = props => {
    const { navigation } = props.props;

    return (
        <View style={styles.userDetails}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.userImage}
                    source={
                        isEmpty(userData?.userimage)
                            ? Images.profile
                            : { uri: userData?.userimage }
                    }
                    // source={Images.profile}
                    resizeMode={'contain'}
                />
                <Text
                    style={
                        styles.userTitle
                    }>{`${userData?.first_name} ${userData?.last_name}`}</Text>
            </View>
        </View>
    );
};

const CustomDrawer = props => {
    const { navigation } = props;
    const [isShow, setIsShow] = useState(false);
    const [currentRequestData, setCurrentRequestData] = useState([]);
    const [activeScreen, setActiveScreen] = useState(null);
    const [active, setIsActive] = useState(false)
    const isFocused = useIsFocused();
    const [userImage, setUserImage] = useState(Images.UserImage);
    const user = useSelector(state => state.AuthReducer.user);
    const dispatch = useDispatch()
    // Handler to open URL
    const openWebsite = async () => {

        const url = 'https://inventorywise.co.uk/';
        try {
            const supported = await Linking.openURL(url);
            if (supported) {
                console.log(`Opening URL: ${url}`);
                await Linking.openURL(url);
            } else {
                console.log(`Cannot open URL: ${url}`);
                Alert.alert('Error', 'Unable to open the website. No browser available.');
            }
        } catch (error) {
            console.error('Error opening URL:', error);
            Alert.alert('Error', 'Failed to open the website. Please try again.');
        }

    }

    const deleteAccount = async (user, dispatch, navigation) => {
        console.log(user, 'user in delete account')
        dispatch(LoaderAction.LoaderTrue());
        try {
            const response = await axios.delete(
                `https://api.inventorywise.co.uk/accounts/${user?.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${user?.jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data, 'response from delete account')
            // After successful delete
            dispatch(AuthAction.Logout());
            navigation.navigate(MAIN_SCREENS.LOG_IN);
        } catch (error) {
            console.error('Delete error:', error.response?.data || error.message);
            // Alert.alert('Error', 'Unable to delete account. Please try again.');
            dispatch(AuthAction.Logout());
            navigation.navigate(MAIN_SCREENS.LOG_IN);
        } finally {
            dispatch(LoaderAction.LoaderFalse());
            dispatch(AuthAction.Logout());
            navigation.navigate(MAIN_SCREENS.LOG_IN);
        }
    };


    useEffect(() => {
        if (isFocused) {
            console.log('Drawer is focused, current state:', { isShow, activeScreen, active });
            setIsShow(false);
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.drawerItemContainer}>
            <Image style={styles.logoImgstyle} source={Images.PBIBText} />
            <View style={styles.userDetails}>
                <Image style={styles.userImage} source={userImage} />
                <Text style={styles.nameTxt}>{user?.firstName}{" "}{user?.lastName}</Text>
                <Text style={[styles.nameTxt, { fontSize: 15, fontFamily: AppStyles.fontFamily.LatoBold }]}>{user?.email}</Text>

            </View>
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}>
                <View>
                    <CustomListItem
                        containerStyle={[
                            styles.customContainerStyle,
                            {
                                marginTop: MetricsMod.marginFifteen,
                            },
                        ]}

                        isLeftImage
                        imageName={Images.Home}
                        text={'Home'}
                        textStyleContainer={[
                            styles.drawerTextStyle,
                            { color: AppStyles.colorSet.black, fontWeight: '600' },
                        ]}
                        leftImageStyle={styles.leftImageStyle}
                        onPress={() => navigation.navigate(MAIN_SCREENS.HOME)}
                        isDivider
                    />
                    <CustomListItem
                        containerStyle={[
                            styles.customContainerStyle,
                            {
                                marginTop: MetricsMod.marginFifteen,
                            },
                        ]}

                        isLeftImage
                        imageName={Images.messageImage}
                        text={'Contact Us'}
                        textStyleContainer={[
                            styles.drawerTextStyle,
                            { color: AppStyles.colorSet.black, fontWeight: '600' },
                        ]}
                        leftImageStyle={styles.leftImageStyle}
                        onPress={() => navigation.navigate(MAIN_SCREENS.CONTACT_US)}
                        isDivider
                    />


                    <CustomListItem
                        containerStyle={[
                            styles.customContainerStyle,
                            {
                                marginTop: MetricsMod.marginFifteen,
                            },
                        ]}

                        isLeftImage
                        imageName={Images.shareIcon}
                        text={'Visit Our site'}
                        textStyleContainer={[
                            styles.drawerTextStyle,
                            { color: AppStyles.colorSet.black, fontWeight: '600' },
                        ]}
                        leftImageStyle={styles.leftImageStyle}
                        onPress={() => { openWebsite() }}
                        isDivider
                    />



                    <CustomListItem
                        containerStyle={[
                            styles.customContainerStyle,
                            {
                                marginTop: MetricsMod.marginFifteen,
                            },
                        ]}

                        isLeftImage
                        imageName={Images.termsImage}
                        text={'Terms & Conditions'}
                        textStyleContainer={[
                            styles.drawerTextStyle,
                            { color: AppStyles.colorSet.black, fontWeight: '600' },
                        ]}
                        leftImageStyle={styles.leftImageStyle}
                        onPress={() => navigation.navigate(MAIN_SCREENS.TERMS_AND_CONDITIONS)}
                        isDivider
                    />


                </View>
            </ScrollView>
            <CustomListItem
                containerStyle={[
                    styles.customContainerStyle1,
                    {
                        backgroundColor: AppStyles.colorSet.blue,
                        marginBottom: MetricsMod.section,
                    },
                ]}
                // isLeftImage
                // imageName={Images.}
                text={'Delete Account'}
                textStyleContainer={[
                    styles.drawerLogoutTextStyle2,
                    { color: AppStyles.colorSet.white, fontWeight: 'bold' },
                ]}

                leftImageStyle={[
                    styles.leftImageStyle,
                    // { tintColor:  AppStyles.colorSet.white },
                ]}
                onPress={() => {
                    Alert.alert(
                        'Account Delete',
                        'Are you sure you want to Delete Account?',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => deleteAccount(user, dispatch, navigation),
                            },
                        ],
                        { cancelable: false }
                    );
                    // navigation.closeDrawer()

                }}
            />


            <CustomListItem
                containerStyle={[
                    styles.customContainerStyle1,
                    {
                        backgroundColor: AppStyles.colorSet.blue,
                        marginBottom: MetricsMod.section,
                    },
                ]}
                // isLeftImage
                // imageName={Images.}
                text={'Logout'}
                textStyleContainer={[
                    styles.drawerLogoutTextStyle,
                    { color: AppStyles.colorSet.white, fontWeight: 'bold' },
                ]}
                leftImageStyle={[
                    styles.leftImageStyle,
                    // { tintColor:  AppStyles.colorSet.white },
                ]}
                onPress={() => {
                    Alert.alert(
                        'Logout',
                        'Are you sure you want to logout?',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => {
                                    // Handle logout logic here
                                    dispatch(AuthAction.Logout())
                                    navigation.navigate(MAIN_SCREENS.LOG_IN);
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                    // navigation.closeDrawer()

                }}
            />
        </SafeAreaView>
    );
};

export default CustomDrawer;