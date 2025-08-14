import { Alert, PermissionsAndroid, Platform } from 'react-native';

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const requestCameraPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app needs camera access to take photos',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    } catch (err) {
        console.warn(err);
        return false;
    }
};

export const requestGalleryPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const permission =
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

            const granted = await PermissionsAndroid.requestMultiple(permission, {
                title: 'Gallery Permission',
                message: 'This app needs access to your media files to upload photos and videos.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            });

            return Object.values(granted).every(result => result === PermissionsAndroid.RESULTS.GRANTED);
        }
        return true;
    } catch (err) {
        console.warn(err);
        return false;
    }
};


export const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                {
                    title: 'Notification Permission',
                    message: 'This app needs access to send you notifications.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (error) {
            console.error("Notification Permission Error: ", error);
            return false;
        }
    }
    return true;
};

// Add to your permissions.js
export const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to save PDF files.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
// export const requestLocationPermission = async () => {
//   try {
//       if (Platform.OS === 'android') {
//           const granted = await PermissionsAndroid.request(
//               PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//               {
//                   title: 'Location Permission',
//                   message: 'This app needs access to your location to fetch your current address.',
//                   buttonNeutral: 'Ask Me Later',
//                   buttonNegative: 'Cancel',
//                   buttonPositive: 'OK',
//               },
//           );
//           return granted === PermissionsAndroid.RESULTS.GRANTED;
//       }
//       return true;
//   } catch (err) {
//       console.warn(err);
//       return false;
//   }
// };