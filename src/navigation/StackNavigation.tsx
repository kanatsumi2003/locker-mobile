import {NavigatorScreenParams, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {useToast} from 'native-base';
import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomToast from '../components/CustomToast';
import {useAuth} from '../hooks/useAuth';
import Starter from '../screens/Starter';
import LoginCustomerScreen from '../screens/customer/LoginCustomerScreen';
import VerifyCustomerScreen from '../screens/customer/VerifyCustomerScreen';
import LoginStaffScreen from '../screens/staff/LoginStaffScreen';
import ResetPasswordScreen from '../screens/staff/ResetPasswordScreen';
import {
  useCustomerProfileQuery,
  useStaffProfileQuery,
} from '../services/authService';
import {
  selectNewNotifications,
  selectUserInfo,
  setUserInfo,
} from '../stores/global.store';
import {IProfile, ROLE} from '../types/auth/profile';
import {
  notificationListener,
  requestUserPermission,
} from '../utils/notificationService';
import TabNavigationCustomer, {
  TabStackCustomerParamList,
} from './customer/TabNavigationCustomer';
import TabNavigationStaff, {
  TabStackStaffParamList,
} from './staff/TabNavigationStaff';

export type RootStackParamList = {
  Starter: undefined;
  Public: undefined;
  Protected: undefined;
  LoginStaff: undefined;
  VerifyCustomer: undefined;
  LoginCustomer: undefined;
  ChangePassStaff: undefined;
  ResetPassStaff: undefined;
  TabStackStaff: NavigatorScreenParams<TabStackStaffParamList> | undefined;
  TabStackCustomer:
    | NavigatorScreenParams<TabStackCustomerParamList>
    | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const ProtectedNavigation = ({userInfo}: {userInfo: IProfile | null}) => {
  return (
    <>
      {userInfo?.role === ROLE.CUSTOMER && (
        <Stack.Screen
          name="TabStackCustomer"
          component={TabNavigationCustomer}
        />
      )}
      {userInfo?.role === ROLE.LAUNDRY_ATTENDANT && (
        <Stack.Screen name="TabStackStaff" component={TabNavigationStaff} />
      )}
      <Stack.Screen name="Starter" component={Starter} />
    </>
  );
};

const PublicNavigation = () => {
  return (
    <>
      <Stack.Screen name="Starter" component={Starter} />
      <Stack.Screen name="VerifyCustomer" component={VerifyCustomerScreen} />
      <Stack.Screen name="LoginStaff" component={LoginStaffScreen} />
      <Stack.Screen name="LoginCustomer" component={LoginCustomerScreen} />
      <Stack.Screen name="ResetPassStaff" component={ResetPasswordScreen} />
    </>
  );
};

const StackNavigation = () => {
  const isAuth = useAuth();
  const dispatch = useDispatch();
  const newNotifications = useSelector(selectNewNotifications);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const userInfo = useSelector(selectUserInfo);

  // QUERY
  const {data: dataProfileCustomer} = useCustomerProfileQuery(undefined);
  const {data: dataProfileStaff} = useStaffProfileQuery(undefined);

  const toast = useToast();

  useEffect(() => {
    if (dataProfileCustomer) {
      dispatch(setUserInfo(dataProfileCustomer));
    }
  }, [dataProfileCustomer]);

  useEffect(() => {
    if (dataProfileStaff) {
      dispatch(setUserInfo(dataProfileStaff));
    }
  }, [dataProfileStaff]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).then(res => {
        requestUserPermission();
        notificationListener(navigation, dispatch, userInfo);
      });
    } else {
      requestUserPermission();
      notificationListener(navigation, dispatch, userInfo);
    }
  }, []);

  useEffect(() => {
    if (newNotifications) {
      console.log('newNotifications', newNotifications);
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title={newNotifications?.title || 'Thông báo mới'}
            description={newNotifications?.content || ''}
            status="info"
            onTouchStart={() => navigation.navigate(newNotifications?.screen)}
          />
        ),
      });
    }
  }, [newNotifications]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuth ? ProtectedNavigation({userInfo}) : PublicNavigation()}
    </Stack.Navigator>
  );
};

export default StackNavigation;
