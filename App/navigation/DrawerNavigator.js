import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DEFAULT_SCREEN_OPTIONS } from './HeaderStyles';
import MainStackNavigator from './MainStackNavigator';
import CustomDrawer from '../Component/customDrawer';
import { AllUsers, ContactUs, CreateOffer, FavoriteProperties, InspectionPDFGenerator, LatestProperty, LatestRequest, Notification, OfferDetailPage, Profile, PropertyDetailPage, Requests, ResetPassword, Setting, SignatureScreen, TermsAndConditions } from '../screens';
import { MAIN_SCREENS } from '../constants/screens';
// import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        ...DEFAULT_SCREEN_OPTIONS,
        drawerPosition: "left",
        drawerStyle: {
          // position:'absolute',
          // top:10,
          // bottom:10,
          // right:10,
          width: '75%',
          // marginVertical: MetricsMod.hundred,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          overlayColor: 'transparent',
          // marginVertical: MetricsMod.fifty,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={'Home'}
        component={MainStackNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name={'ResetPassword'}
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name={MAIN_SCREENS.SIGNATURE_SCREEN}
        component={SignatureScreen}
        options={{
          // headerShown: false,

        }}

      />

      <Drawer.Screen
        name={MAIN_SCREENS.CONTACT_US}
        component={ContactUs}
        options={{
          // headerShown: false,

        }}

      />

      <Drawer.Screen
        name={MAIN_SCREENS.TERMS_AND_CONDITIONS}
        component={TermsAndConditions}
        options={{
          // headerShown: false,

        }}

      />


      <Drawer.Screen
        name={MAIN_SCREENS.INSPECTION_PDF_GENERATOR}
        component={InspectionPDFGenerator}
        options={{
          headerShown: false,

        }}

      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;