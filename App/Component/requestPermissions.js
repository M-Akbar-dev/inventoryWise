import { PermissionsAndroid, Platform, Alert } from 'react-native';

export const requestPermissions = async () => {
  if (Platform.OS !== 'android') return true;

  try {
    const androidVersion = Platform.Version;

    if (androidVersion >= 33) {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);

      const allGranted = Object.values(granted).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED
      );

      if (!allGranted) {
        Alert.alert(
          'Storage Permission Required',
          'Please allow access to media files to save the PDF.'
        );
      }

      return allGranted;
    }

    // Fallback for Android 12 or lower
    const legacyGranted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    return Object.values(legacyGranted).every(
      result => result === PermissionsAndroid.RESULTS.GRANTED
    );
  } catch (err) {
    console.warn('Permission request error:', err);
    return false;
  }
};
