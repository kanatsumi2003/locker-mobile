import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const handleRequestPermissionLocation = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      // Geolocation
      const grantedAlways = await Geolocation.requestAuthorization('always');
      const grantedInUse = await Geolocation.requestAuthorization('whenInUse');
      if (grantedAlways || grantedInUse) {
        return true;
      }
    } else {
      const isGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (isGranted) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
