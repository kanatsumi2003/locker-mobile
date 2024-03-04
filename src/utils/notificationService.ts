import messaging from '@react-native-firebase/messaging';
import AsyncStorageService from '../config/asyncStorageService';
import {setNewNotifications} from '../stores/global.store';
import {IProfile, ROLE} from '../types/auth/profile';
import {ENTITY_TYPE} from '../types/notification/notification';
import {
  getNotificationRedirectLinkStaff,
  getNotificationRedirectLinkUser,
} from './notificationRender';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFCMToken();
  }
}

export const notificationListener = async (
  navigation: NativeStackNavigationProp<any>,
  dispatch: React.Dispatch<any>,
  userInfo: IProfile | null,
) => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.data,
    );

    setTimeout(() => {
      const redirectLinkStaff = getNotificationRedirectLinkStaff(
        // remoteMessage.data?.entityType as ENTITY_TYPE,
        remoteMessage.data?.entityType as ENTITY_TYPE,
        Number(remoteMessage?.data?.referenceId),
      );

      const redirectLinkUser = getNotificationRedirectLinkUser(
        remoteMessage.data?.entityType as ENTITY_TYPE,
        Number(remoteMessage?.data?.referenceId),
      );

      // if (userInfo?.role === ROLE.STAFF) {
      redirectLinkStaff?.screen &&
        navigation?.navigate(redirectLinkStaff?.screen, {
          id: redirectLinkStaff?.id,
        });
      // }

      // if (userInfo?.role === ROLE.CUSTOMER) {
      redirectLinkUser?.screen &&
        navigation?.navigate(redirectLinkUser?.screen, {
          id: redirectLinkUser?.id,
        });
      // }
    }, 200);
  });

  // Check whether an initial notification is available
  await messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.data,
        );

        // navigation('StaffLocker');
      }
    })
    .catch(err => console.log(err));

  await messaging().onMessage(async remoteMessage => {
    if (userInfo?.role === ROLE.STAFF) {
      const redirectLinkStaff = getNotificationRedirectLinkStaff(
        // remoteMessage.data?.entityType as ENTITY_TYPE,
        remoteMessage.data?.entityType as ENTITY_TYPE,
        Number(remoteMessage?.data?.referenceId),
      );
      if (redirectLinkStaff?.screen) {
        dispatch(
          setNewNotifications({
            screen: redirectLinkStaff?.screen,
            content: String(remoteMessage?.notification?.body) || '',
            title: String(remoteMessage?.notification?.title) || '',
          }),
        );
      } else {
        dispatch(setNewNotifications(null));
      }
    }

    if (userInfo?.role === ROLE.CUSTOMER) {
      const redirectLinkUser = getNotificationRedirectLinkUser(
        remoteMessage.data?.entityType as ENTITY_TYPE,
        Number(remoteMessage?.data?.referenceId),
      );

      if (redirectLinkUser?.screen) {
        dispatch(
          setNewNotifications({
            screen: redirectLinkUser?.screen,
            content: String(remoteMessage?.notification?.body) || '',
            title: String(remoteMessage?.notification?.title) || '',
          }),
        );
      } else {
        dispatch(setNewNotifications(null));
      }
    }
  });
};

const getFCMToken = async () => {
  // Check if firebase messaging token is already in async storage
  let checkToken = await AsyncStorageService.getFcmToken();

  if (!checkToken) {
    try {
      const fcmToken = await messaging().getToken();

      if (!!fcmToken) {
        await AsyncStorageService.setFcmToken(fcmToken);
      }
    } catch (error) {
      console.log('error in fcmToken', error);
    }
  }
};
