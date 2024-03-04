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
import {Icon, IconButton, Image} from 'native-base';
import {RootStackScreenProps} from '../StackNavigation';

import {Animated, Dimensions, Platform} from 'react-native';
import Home from '../../screens/customer/home/Home';
import Lockers from '../../screens/customer/locker/Lockers';
import LockerDetail from '../../screens/customer/lockerDetail/LockerDetail';
import LockerDetailDelivery from '../../screens/customer/lockerDetail/LockerDetailDelivery';
import LockerDetailReceiver from '../../screens/customer/lockerDetail/LockerDetailReceiver';
import LockerDetailServices from '../../screens/customer/lockerDetail/LockerDetailServices';
import Notification from '../../screens/customer/notification/Notification';
import Orders from '../../screens/customer/order/Orders';
import OrderDetail from '../../screens/customer/orderDetail/OrderDetail';
import Profile from '../../screens/customer/profile/Profile';

import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomerDrawerFilterLocker from '../../features/drawer/CustomerDrawerFilterLocker';
import CustomerDrawerFilterOrder from '../../features/drawer/CustomerDrawerFilterOrder';
import LockerMap from '../../screens/customer/locker/LockerMap';
import Payment from '../../screens/customer/payment/Payment';
import PaymentDetail from '../../screens/customer/paymentDetail/PaymentDetail';
import EditProfile from '../../screens/customer/profile/EditProfile';
import {IDetailItem} from '../../types/order/order';

import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {useUnreadCountQuery} from '../../services/notificationService';
import {
  selectNewNotifications,
  selectUnreadNotificationCount,
  setUnreadNotificationCount,
} from '../../stores/global.store';
import LockerDetailNote from '../../screens/customer/lockerDetail/LockerDetailNote';
import WalletScreen from '../../screens/customer/wallet/WalletScreen';
import WalletPolling from '../../features/wallet/WalletPolling';
import LockerDetailConfirmCreate from '../../screens/customer/lockerDetail/LockerDetailConfirmCreate';
import ListLockerFilter from '../../screens/customer/order/ListLockerFilter';
import Settings from '../../screens/customer/settings/Settings';
import CustomerCreateOrderSettings from '../../screens/customer/settings/CustomerCreateOrderSettings';
export type TabStackCustomerParamList = {
  CustomerHome: undefined;
  CustomerLockers: undefined;
  CustomerOrders: undefined;
  CustomerProfile: undefined;
  CustomerNotification: undefined;
};

export type HomeStackParamList = {
  CustomerHome: undefined;
  CustomerLockers: undefined;
  CustomerLockerDetail: {id: number | undefined};
  CustomerLockerMap: undefined;
  CustomerLockerDetailServices: {id: number | undefined};
  CustomerLockerDetailDelivery: {id: number | undefined};
  CustomerLockerDetailReceiver: {id: number | undefined};
  CustomerLockerDetailNote: {id: number | undefined};
  CustomerLockerDetailConfirmCreate: {id: number | undefined};
  CustomerOrders: undefined;
  CustomerOrderDetail: {id: number | undefined};
  CustomerServiceDetail: {
    id: number | undefined;
    detail: IDetailItem;
    detailId: number | undefined;
    allowAddDetail: boolean;
  };
  CustomerDrawerFilterDrawer: undefined;
  CustomerProfile: undefined;
  EditProfileCustomer: undefined;
  CustomerPayments: undefined;
  CustomerPaymentDetail: {id: number | undefined};
  CustomerNotification: undefined;
  CustomerWallet: undefined;
  CustomerWalletPolling: {id: number | undefined};
  CustomerLockerListFilter: undefined;
  CustomerSettings: undefined;
  CustomerCreateOrderSettings: undefined;
};

export type DrawerParamList = {
  CustomerDrawerFilterOrder: undefined;
  CustomerOrders: undefined;
  CustomerLockers: undefined;
  CustomerLockerListFilter: undefined;
};

const Tab = createBottomTabNavigator<TabStackCustomerParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const DrawerStack = createDrawerNavigator<DrawerParamList>();

export type TabsStackScreenProps<T extends keyof TabStackCustomerParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabStackCustomerParamList, T>,
    RootStackScreenProps<'TabStackCustomer'>
  >;

const HomeStackNavigation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <HomeStack.Screen
        name="CustomerHome"
        component={TabNavigation}
        options={{
          headerTitle: 'Trang chủ',
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
        name="CustomerLockers"
        component={DrawerStackNavigationLocker}
        options={{
          title: 'Đặt chỗ',
          headerShown: true,
          headerRight(props) {
            return (
              <Icon
                onPress={() => navigation.navigate('CustomerLockerMap')}
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
        }}
      />
      <HomeStack.Screen
        name="CustomerLockerDetail"
        component={LockerDetail}
        options={{title: 'Chi tiết locker', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerLockerMap"
        component={LockerMap}
        options={{title: 'Map', headerShown: false}}
      />
      <HomeStack.Screen
        name="CustomerLockerDetailServices"
        component={LockerDetailServices}
        options={{title: 'Chọn dịch vụ', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerLockerDetailDelivery"
        component={LockerDetailDelivery}
        options={{title: 'Hỗ trợ giao hàng', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerLockerDetailReceiver"
        component={LockerDetailReceiver}
        options={{title: 'Thông tin nhận hàng', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerLockerDetailNote"
        component={LockerDetailNote}
        options={{title: 'Ghi chú đơn hàng', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerLockerDetailConfirmCreate"
        component={LockerDetailConfirmCreate}
        options={{title: 'Xác nhận thông tin đơn hàng', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerOrders"
        component={TabNavigation}
        options={{title: 'Đơn hàng'}}
      />
      <HomeStack.Screen
        name="CustomerLockerListFilter"
        component={ListLockerFilter}
        options={{title: 'Chọn Locker', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerOrderDetail"
        component={OrderDetail}
        options={{title: 'Chi tiết đơn hàng', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerNotification"
        component={TabNavigation}
        options={{title: 'Thông báo'}}
      />
      <HomeStack.Screen
        name="CustomerProfile"
        component={TabNavigation}
        options={{title: 'Cá nhân'}}
      />
      <HomeStack.Screen
        name="CustomerWallet"
        component={WalletScreen}
        options={{title: 'Ví', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerWalletPolling"
        component={WalletPolling}
        options={{title: 'Nạp tiền vào ví', headerShown: true}}
      />
      <HomeStack.Screen
        name="EditProfileCustomer"
        component={EditProfile}
        options={{title: 'Chỉnh sửa thông tin cá nhân', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerPayments"
        component={Payment}
        options={{title: 'Lịch sử giao dịch', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerPaymentDetail"
        component={PaymentDetail}
        options={{title: 'Chi tiết giao dịch', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerSettings"
        component={Settings}
        options={{title: 'Thông tin ứng dụng', headerShown: true}}
      />
      <HomeStack.Screen
        name="CustomerCreateOrderSettings"
        component={CustomerCreateOrderSettings}
        options={{title: 'Thông tin ứng dụng', headerShown: true}}
      />
    </HomeStack.Navigator>
  );
};

const DrawerStackNavigationOrder = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={CustomerDrawerFilterOrder}>
      <DrawerStack.Screen
        name="CustomerOrders"
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
      drawerContent={CustomerDrawerFilterLocker}>
      <DrawerStack.Screen
        name="CustomerLockers"
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
          tabBarHideOnKeyboard: true,
          headerTitleAlign: 'center',
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
          name="CustomerHome"
          component={Home}
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
                <Icon
                  style={{
                    // centring Tab Button...
                    position: 'absolute',
                    top: 10,
                  }}
                  {...props}
                  as={<Feather name={'home'} />}
                  size="lg"
                />
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
          name="CustomerOrders"
          component={DrawerStackNavigationOrder}
          options={{
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Đơn hàng',
            headerTitle: 'Đơn hàng',
            tabBarIcon(props) {
              return (
                <Icon
                  style={{
                    // centring Tab Button...
                    position: 'absolute',
                    top: 10,
                  }}
                  {...props}
                  as={<Feather name={'package'} />}
                  size="lg"
                />
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
          name="CustomerCreateOrderSettings"
          component={DrawerStackNavigationLocker}
          options={{
            tabBarHideOnKeyboard: true,
            tabBarLabel: '',
            tabBarIcon(props) {
              return (
                <IconButton
                  style={{
                    borderRadius: 100,
                    marginBottom: Platform.OS === 'android' ? 30 : 20,
                    shadowColor: '#000',
                    shadowOpacity: 0.15,
                    shadowOffset: {
                      width: 0,
                      height: 6,
                    },
                  }}
                  icon={<Icon as={<MaterialCommunityIcons name={'plus'} />} />}
                  {...props}
                  size="lg"
                  variant="solid"
                  colorScheme="blue"
                  onPress={() =>
                    navigation.navigate('CustomerCreateOrderSettings')
                  }
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="CustomerNotification"
          component={Notification}
          options={{
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Thông báo',
            ...(unreadNotificationCount && {
              tabBarBadge:
                unreadNotificationCount >= 100
                  ? '99+'
                  : unreadNotificationCount,
            }),
            headerTitle: 'Thông báo',
            tabBarIcon(props) {
              return (
                <Icon
                  style={{
                    // centring Tab Button...
                    position: 'absolute',
                    top: 10,
                  }}
                  {...props}
                  as={<MaterialCommunityIcons name={'bell-outline'} />}
                  size="lg"
                />
              );
            },
          }}
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
          name="CustomerProfile"
          component={Profile}
          options={{
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Cá nhân',
            headerTitle: 'Cá nhân',
            tabBarIcon(props) {
              return (
                <Icon
                  style={{
                    // centring Tab Button...
                    position: 'absolute',
                    top: 10,
                  }}
                  {...props}
                  as={<Feather name={'user'} />}
                  size="lg"
                />
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
          bottom: 68,
          // Horizontal Padding = 20...
          left: 50,
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}
      /> */}
    </>
  );
};

const TabNavigationCustomer = () => {
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

export default TabNavigationCustomer;
