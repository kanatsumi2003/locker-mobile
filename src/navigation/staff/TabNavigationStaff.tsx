import React, {useEffect, useRef} from 'react';

import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {Icon, Image} from 'native-base';
import Lockers from '../../screens/staff/locker/Lockers';
import {RootStackScreenProps} from '../StackNavigation';

import {Animated, Dimensions, Platform} from 'react-native';
import HomeScreen from '../../screens/staff/home/Home';
import LockerDetail from '../../screens/staff/lockerDetail/LockerDetail';
import Notification from '../../screens/staff/notification/Notification';
import Orders from '../../screens/staff/order/Orders';
import OrderDetail from '../../screens/staff/orderDetail/OrderDetail';
import Profile from '../../screens/staff/profile/Profile';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import StaffDrawerFilterLocker from '../../features/drawer/StaffDrawerFilterLocker';
import StaffDrawerFilterOrder from '../../features/drawer/StaffDrawerFilterOrder';
import ChangePassword from '../../screens/staff/ChangePassword';
import BoxDetail from '../../screens/staff/boxDetail/BoxDetail';
import LockerMap from '../../screens/staff/locker/LockerMap';
import BoxEmergencyOpen from '../../screens/staff/lockerDetail/BoxEmergencyOpen';
import EditProfile from '../../screens/staff/profile/EditProfile';
import AddServiceDetail from '../../screens/staff/serviceDetail/AddServiceDetail';
import ServiceDetail from '../../screens/staff/serviceDetail/ServiceDetail';
import {useUnreadCountQuery} from '../../services/notificationService';
import {
  selectNewNotifications,
  selectUnreadNotificationCount,
  setUnreadNotificationCount,
} from '../../stores/global.store';
import {IBoxOrder} from '../../types/box/box';
import {IDetailItem} from '../../types/order/order';
import BoxEmergencyOpenQRScan from '../../screens/staff/lockerDetail/BoxEmergencyOpenQRScan';
import QR from '../../screens/staff/qr/QR';
import OrderSuccess from '../../screens/staff/order/OrderSuccess';
import ListLockerFilter from '../../screens/staff/order/ListLockerFilter';
import Settings from '../../screens/staff/settings/Settings';

export type TabStackStaffParamList = {
  StaffHome: undefined;
  StaffLockers: undefined;
  StaffOrders: undefined;
  StaffProfile: undefined;
  StaffNotification: undefined;
};

export type HomeStackParamList = {
  StaffHome: undefined;
  StaffLockers: undefined;
  StaffLockerDetail: {id: number | undefined};
  StaffLockerMap: undefined;
  StaffBoxEmergencyOpenQRScan: {
    id: number | undefined;
  };
  StaffBoxEmergencyOpen: {id: number | undefined; token: string | undefined};
  StaffOrders: undefined;
  StaffOrderDetail: {id: number | undefined};
  StaffServiceDetail: {
    id: number | undefined;
    detail: IDetailItem;
    detailId: number | undefined;
    allowAddDetail: boolean;
  };
  StaffAddServiceDetail: {
    id: number | undefined;
    detail: IDetailItem;
  };
  StaffOrderSuccess: undefined;
  StaffDrawerFilterDrawer: undefined;
  StaffOrderQrCode: {
    id: number | undefined;
  };
  StaffNotification: undefined;
  StaffProfile: undefined;
  ChangePassStaff: undefined;
  EditProfileStaff: undefined;
  StaffBoxDetail: {
    number: number | undefined;
    description: string | undefined;
    lastOrder: IBoxOrder | undefined;
    isAvailable: boolean | undefined;
  };
  StaffLockerListFilter: undefined;
  StaffSettings: undefined;
};

export type DrawerParamList = {
  StaffDrawerFilterOrder: undefined;
  StaffOrders: undefined;
  StaffLockers: undefined;
  StaffLockerListFilter: undefined;
};

const Tab = createBottomTabNavigator<TabStackStaffParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const DrawerStack = createDrawerNavigator<DrawerParamList>();

export type TabsStackScreenProps<T extends keyof TabStackStaffParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabStackStaffParamList, T>,
    RootStackScreenProps<'TabStackStaff'>
  >;

const HomeStackNavigation = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <HomeStack.Screen
        name="StaffHome"
        component={TabNavigation}
        options={{
          headerTitle: 'Trang chủ',
          headerTitleStyle: {
            fontSize: 8,
          },
          headerLeft(props) {
            return (
              <Image
                position="absolute"
                w="20"
                h="5"
                left={0}
                source={require('../../assets/headerLogo.png')}
                alt="headerLogo"
              />
            );
          },
        }}
      />
      <HomeStack.Screen
        name="StaffLockers"
        component={TabNavigation}
        options={{title: 'Lockers'}}
      />
      <HomeStack.Screen
        name="StaffLockerDetail"
        component={LockerDetail}
        options={{title: 'Chi tiết locker', headerShown: true}}
      />

      <HomeStack.Screen
        name="StaffBoxDetail"
        component={BoxDetail}
        options={{title: 'Chi tiết ô tủ', headerShown: true}}
      />
      <HomeStack.Screen
        name="StaffBoxEmergencyOpenQRScan"
        component={BoxEmergencyOpenQRScan}
        options={{title: 'Scan QR mở tủ'}}
      />
      <HomeStack.Screen
        name="StaffBoxEmergencyOpen"
        component={BoxEmergencyOpen}
        options={{title: 'Mở tủ khẩn cấp', headerShown: true}}
      />
      <HomeStack.Screen
        name="StaffLockerMap"
        component={LockerMap}
        options={{title: 'Map', headerShown: false}}
      />
      <HomeStack.Screen
        name="StaffOrders"
        component={TabNavigation}
        options={{title: 'Đơn hàng'}}
      />
      <HomeStack.Screen
        name="StaffLockerListFilter"
        component={ListLockerFilter}
        options={{title: 'Chọn Locker', headerShown: true}}
      />
      <HomeStack.Screen
        name="StaffOrderDetail"
        component={OrderDetail}
        options={{title: 'Chi tiết đơn hàng', headerShown: true}}
      />
      <HomeStack.Screen
        name="StaffOrderQrCode"
        component={QR}
        options={{title: 'Chi tiết đơn hàng', headerShown: true}}
      />
      <HomeStack.Screen
        name="StaffAddServiceDetail"
        component={AddServiceDetail}
        options={{title: 'Thêm chi tiết dịch vụ', headerShown: true}}
      />
      <HomeStack.Screen
        name="StaffServiceDetail"
        component={ServiceDetail}
        options={{title: 'Chi tiết dịch vụ', headerShown: true}}
      />
      <HomeStack.Screen
        name="StaffOrderSuccess"
        component={OrderSuccess}
        options={{title: 'Thông báo'}}
      />
      <HomeStack.Screen
        name="StaffNotification"
        component={TabNavigation}
        options={{title: 'Thông báo'}}
      />
      <HomeStack.Screen
        name="StaffProfile"
        component={TabNavigation}
        options={{title: 'Cá nhân'}}
      />
      <HomeStack.Screen
        name="EditProfileStaff"
        component={EditProfile}
        options={{title: 'Chỉnh sửa thông tin cá nhân', headerShown: true}}
      />
      <HomeStack.Screen
        name="StaffSettings"
        component={Settings}
        options={{title: 'Thông tin ứng dụng', headerShown: true}}
      />
      <HomeStack.Screen
        name="ChangePassStaff"
        component={ChangePassword}
        options={{title: 'Đổi mật khẩu', headerShown: true}}
      />
    </HomeStack.Navigator>
  );
};

const DrawerStackNavigationOrder = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={StaffDrawerFilterOrder}>
      <DrawerStack.Screen
        name="StaffOrders"
        component={Orders}
        options={{
          headerShown: false,
          drawerPosition: 'right',
          drawerStyle: {
            backgroundColor: 'white',
            width: Dimensions.get('window').width - 32,
          },
        }}
      />
    </DrawerStack.Navigator>
  );
};

const DrawerStackNavigationLocker = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={StaffDrawerFilterLocker}>
      <DrawerStack.Screen
        name="StaffLockers"
        component={Lockers}
        options={{
          headerShown: false,
          drawerPosition: 'right',
          drawerStyle: {
            backgroundColor: 'white',
            width: Dimensions.get('window').width - 32,
          },
        }}
      />
    </DrawerStack.Navigator>
  );
};

const TabNavigation = () => {
  const dispatch = useDispatch();
  const unreadNotificationCount = useSelector(selectUnreadNotificationCount);
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const newNotifications = useSelector(selectNewNotifications);

  const {data: unread, refetch} = useUnreadCountQuery();

  useEffect(() => {
    newNotifications && refetch();
  }, [newNotifications]);

  useEffect(() => {
    dispatch(setUnreadNotificationCount(unread?.count || 0));
  }, [unread]);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          tabBarHideOnKeyboard: true,
          headerShown: true,
          // tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'white',
            position: 'absolute',
            // bottom: 20,
            borderWidth: 1,
            borderColor: '#cccccc55',
            // marginHorizontal: 20,
            // Max Height...
            height: Platform.OS === 'android' ? 60 : 70,
            paddingBottom: Platform.OS === 'android' ? 8 : 20,
            // borderRadius: 10,
            // Shadow...
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            // paddingHorizontal: 20,
          },
        }}>
        <Tab.Screen
          name="StaffHome"
          component={HomeScreen}
          options={{
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Trang chủ',
            headerTitle: 'Trang chủ',
            headerLeft(props) {
              return (
                <Image
                  position="absolute"
                  w="20"
                  h="5"
                  left={4}
                  source={require('../../assets/headerLogo.png')}
                  alt="headerLogo"
                />
              );
            },
            tabBarIcon(props) {
              return (
                <Icon {...props} as={<Feather name={'home'} />} size="lg" />
              );
            },
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="StaffLockers"
          component={DrawerStackNavigationLocker}
          options={{
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Lockers',
            title: 'Lockers',
            headerTitle: 'Lockers',
            headerRight(props) {
              return (
                <Icon
                  onPress={() => navigation.navigate('StaffLockerMap')}
                  colorScheme="gray"
                  as={<Feather name={'map-pin'} />}
                  style={{
                    // centring Tab Button...
                    position: 'absolute',
                    right: 30,
                  }}
                  {...props}
                  size="lg"
                />
              );
            },
            tabBarIcon(props) {
              return (
                <Icon {...props} as={<Feather name={'grid'} />} size="lg" />
              );
            },
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="StaffOrders"
          component={DrawerStackNavigationOrder}
          options={{
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Đơn hàng',
            title: 'Đơn hàng',
            tabBarIcon(props) {
              return (
                <Icon {...props} as={<Feather name={'package'} />} size="lg" />
              );
            },
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="StaffNotification"
          component={Notification}
          options={({route}) => ({
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Thông báo',
            ...(unreadNotificationCount && {
              tabBarBadge:
                unreadNotificationCount >= 100
                  ? '99+'
                  : unreadNotificationCount,
            }),
            title: 'Thông báo',
            tabBarIcon(props) {
              return (
                <Icon
                  {...props}
                  as={<MaterialCommunityIcons name={'bell-outline'} />}
                  size="lg"
                />
              );
            },
          })}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="StaffProfile"
          component={Profile}
          options={{
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Cá nhân',
            title: 'Cá nhân',
            tabBarIcon(props) {
              return (
                <Icon {...props} as={<Feather name={'user'} />} size="lg" />
              );
            },
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      {/* <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: '#2563eb',
          position: 'absolute',
          bottom: 70,
          // Horizontal Padding = 20...
          left: 20,
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}
      /> */}
    </>
  );
};

const TabNavigationStaff = () => {
  return (
    <>
      <HomeStackNavigation />
    </>
  );
};

function getWidth() {
  let width = Dimensions.get('window').width;

  // Horizontal Padding = 20...
  width = width - 30;

  // Total five Tabs...
  return width / 5;
}

export default TabNavigationStaff;
