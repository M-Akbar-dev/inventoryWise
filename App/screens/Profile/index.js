import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import styles from "./styles"
import VectorIconComponent from "../../Component"
import { AppStyles, MetricsMod } from "../../themes"
import { ICON_TYPES } from "../../constants/constant"
import { MAIN_SCREENS } from "../../constants/screens"
import { useState } from "react"
import CustomAlertPermission from "../../Component/CustomAlertPermission"
import { useDispatch, useSelector } from "react-redux"
import AlertMiddleware from "../../redux/Middlewares/AlertMiddleware"
import { AuthAction, LoaderAction } from "../../redux/Actions"
import ProductListingMiddleware from "../../redux/Middlewares/ProductMiddleware"
import { clearCart } from "../../redux/Actions/cartActions"
import UserImage from "../../redux/Actions/UserImage"
import { speakText } from "../../Component/TTSHelper/TTSHelper"

function Profile(props) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.AuthReducer.user);
  const userImg = useSelector((state) => state.AuthReducer.userImg);
  const TTS = useSelector((state) => state.AuthReducer.TxtToSpeech);
  const { navigation } = props
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isAccountDelete, setIsAccountDelete] = useState(false);


  const handleShowAlert = () => {
    { TTS ? speakText("Ready to Sign Out? Confirm if you want to log out of your account") : null }
    setAlertVisible(true)
  };

  const handleHideAlert = () => setAlertVisible(false);

  const handleHideDeleteAccount = () => setIsAccountDelete(false);
  const textSize = useSelector((state) => state.AuthReducer.textSize);

  const handleShowDeleteAccoutnAlert = () => {

    { TTS ? speakText("Are You Sure , Deleting your account is permanent and cannot be undone") : null }
    setIsAccountDelete(true)
  };
  const handleHideDeleteAccoutnAlert = () => {
    delteAccountReq()
    // dispatch(AlertMiddleware.showErrorAlert("Error , Something went wrong"))
  }
  const delteAccountReq = async () => {
    dispatch(LoaderAction.LoaderTrue());
    const data = {
      type: "delete",
      request: "Please delete my account"
    }
    try {
      const response = await dispatch(ProductListingMiddleware.userRequests({ payload: data }));
      if (response?.success) {
        dispatch(LoaderAction.LoaderFalse());
        setIsAccountDelete(false);
        dispatch(AlertMiddleware.showSuccess("Request Sent Successfully"))
      }

    } catch (error) {
      console.log("Login Erasdasasdf", error);
      dispatch(LoaderAction.LoaderFalse());
      setIsAccountDelete(false);
      dispatch(AlertMiddleware.showErrorAlert(errorMessage));
    } finally {
      dispatch(LoaderAction.LoaderFalse());
      setIsAccountDelete(false);
    }
  }


  const handleLogout = () => {
    dispatch(AuthAction.Logout())
    dispatch(clearCart());
    dispatch(UserImage.fetchUserImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"))
    setAlertVisible(false)
    navigation.replace(MAIN_SCREENS.LOG_IN)
    dispatch(AlertMiddleware.showSuccess("Log out succcessfully"))

  }

  const renderBack = () => {
    return (
      <View style={styles.rowView}>
        <Text style={[styles.title, { fontSize: 20 + textSize }]}>Profile</Text>
      </View>
    )
  }

  const renderDetals = () => {

    return (
      <View style={styles.detailContainer}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.imageStyle}
            source={{ uri: user?.user?.customer?.photo === "" ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" : userImg }} />
        </View>
        <Text style={[styles.nameTxt, { fontSize: 18 + textSize }]}> {user?.user?.customer?.name
          ? `${user?.user?.customer?.name.split(' ').slice(-1)} ${user?.user?.customer?.name.split(' ').slice(0, -1).join(' ')}`
          : ''}</Text>
        {/* <Text style={styles.emailTxt}>{user?.AlternateContactPhone}</Text> */}

      </View>
    )
  }

  const renderCredsLeft = () => {
    return (
      <View style={styles.rowCreds}>
        <Text style={styles.textCreds}>Creds left</Text>
        <Text style={styles.txtTitle}>14</Text>
      </View>
    )
  }

  const renderPersonalInfo = () => {
    return (
      <View style={styles.PInfoContainer}>
        {/* <Text style={styles.mainTitle}>Profile</Text> */}
        <TouchableOpacity
          onPressIn={() => { TTS ? speakText("Personal Data") : null }}
          onPress={() => { navigation.navigate(MAIN_SCREENS.PROFILE_DETAIL) }}
          style={styles.infoRowContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <VectorIconComponent
                name="user"
                size={25 + textSize}
                color={AppStyles.colorSet.black}
                style={styles.iconStylesUser}
                type={ICON_TYPES.AntDesign}
              />
            </View>

            <Text style={[styles.dataTxt, { fontSize: 15 + textSize }]}>Personal Data</Text>
          </View>
          <VectorIconComponent
            name="chevron-right"
            size={25 + textSize}
            color={AppStyles.colorSet.black}
            style={styles.iconStylesUser}
            type={ICON_TYPES.Feather}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={() => { TTS ? speakText("Settings") : null }}
          onPress={() => { navigation.navigate(MAIN_SCREENS.SETTING) }}
          style={styles.infoRowContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <VectorIconComponent
                name="gear"
                size={25 + textSize}
                color={AppStyles.colorSet.black}
                style={styles.iconStylesUser}
                type={ICON_TYPES.Octicons}
              />
            </View>

            <Text style={[styles.dataTxt, { fontSize: 15 + textSize }]}>Settings</Text>
          </View>
          <VectorIconComponent
            name="chevron-right"
            size={25 + textSize}
            color={AppStyles.colorSet.black}
            style={styles.iconStylesUser}
            type={ICON_TYPES.Feather}
          />
        </TouchableOpacity>


        <TouchableOpacity
          onPressIn={() => { TTS ? speakText("Orders") : null }}
          onPress={() => { navigation.navigate(MAIN_SCREENS.PAST_ORDERS) }}
          style={styles.infoRowContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <VectorIconComponent
                name="fast-food"
                size={25 + textSize}
                color={AppStyles.colorSet.black}
                style={styles.iconStylesUser}
                type={ICON_TYPES.IonIcons}
              />
            </View>

            <Text style={[styles.dataTxt, { fontSize: 15 + textSize }]}>Orders</Text>
          </View>
          <VectorIconComponent
            name="chevron-right"
            size={25 + textSize}
            color={AppStyles.colorSet.black}
            style={styles.iconStylesUser}
            type={ICON_TYPES.Feather}
          />
        </TouchableOpacity>


        <TouchableOpacity
          onPressIn={() => { TTS ? speakText("Pause Service") : null }}
          onPress={() => { navigation.navigate(MAIN_SCREENS.PAUSE_SERVICE) }}
          style={styles.infoRowContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <VectorIconComponent
                name="pause"
                size={25 + textSize}
                color={AppStyles.colorSet.black}
                style={styles.iconStylesUser}
                type={ICON_TYPES.Feather}
              />
            </View>
            <Text style={[styles.dataTxt, { fontSize: 15 + textSize }]}>Pause Service</Text>
          </View>
          <VectorIconComponent
            name="chevron-right"
            size={25 + textSize}
            color={AppStyles.colorSet.black}
            style={styles.iconStylesUser}
            type={ICON_TYPES.Feather}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={() => { TTS ? speakText("Request Account Deletion") : null }}
          onPress={() => { handleShowDeleteAccoutnAlert() }}
          style={styles.infoRowContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <VectorIconComponent
                name="trash"
                size={25 + textSize}
                color={AppStyles.colorSet.black}
                style={styles.iconStylesUser}
                type={ICON_TYPES.EvilIcons}
              />
            </View>

            <Text style={[styles.dataTxt, { fontSize: 15 + textSize }]}>Request Account Deletion</Text>
          </View>
          <VectorIconComponent
            name="chevron-right"
            size={25 + textSize}
            color={AppStyles.colorSet.black}
            style={styles.iconStylesUser}
            type={ICON_TYPES.Feather}
          />
        </TouchableOpacity>

      </View>
    )
  }


  const renderSupport = () => {
    return (
      <View style={[styles.PInfoContainer, { marginTop: MetricsMod.baseMarginIII }]}>
        {/* <Text style={styles.mainTitle}>Support</Text> */}
        {/* 
        <TouchableOpacity style={styles.infoRowContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <VectorIconComponent
                name="information"
                size={25}
                color={AppStyles.colorSet.black}
                style={styles.iconStylesUser}
                type={ICON_TYPES.MaterialCommunityIcons}
              />
            </View>

            <Text style={styles.dataTxt}>Help Center</Text>
          </View>
          <VectorIconComponent
            name="chevron-right"
            size={25}
            color={AppStyles.colorSet.black}
            style={styles.iconStylesUser}
            type={ICON_TYPES.Feather}
          />
        </TouchableOpacity> */}




      </View>
    )
  }

  const renderBtn = () => {
    return (
      <TouchableOpacity
        onPress={handleShowAlert}
        style={styles.logoutBtn}
      >
        <VectorIconComponent
          name="logout"
          size={25 + textSize}
          color={AppStyles.colorSet.appRed}
          style={styles.iconlogout}
          type={ICON_TYPES.MaterialCommunityIcons}
        />
        <Text style={[styles.logoutTxt, { fontSize: 15 + textSize, fontFamily: AppStyles.fontFamily.LatoBlack }]}>Sign Out</Text>
      </TouchableOpacity>
    )
  }


  const body = () => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {renderBack()}
          {renderDetals()}
          {/* {renderCredsLeft()} */}
          {renderPersonalInfo()}
          {/* {renderSupport()} */}
        </ScrollView>


        <CustomAlertPermission
          visible={isAlertVisible}
          title="Ready to Sign Out?"
          description="Confirm if you want to log out of your account"
          buttons={[
            { text: 'Cancel', onPress: () => { handleHideAlert(), TTS ? speakText("cancel") : null } },
            { text: 'Sign Out', onPress: () => { handleLogout(), TTS ? speakText("Sign out") : null } },
            // { text: 'More Info', onPress: () => console.log('More Info pressed') }
          ]}
        />

        <CustomAlertPermission
          visible={isAccountDelete}
          title="Are You Sure?"
          description="Deleting your account is permanent and cannot be undone."
          buttons={[
            { text: 'Cancel', onPress: handleHideDeleteAccount },
            { text: 'Delete Account', onPress: () => { handleHideDeleteAccoutnAlert() } },
            // { text: 'More Info', onPress: () => console.log('More Info pressed') }
          ]}
        />
        {renderBtn()}

      </SafeAreaView>
    )
  }

  return body()
}

export default Profile