import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Avatar, Center, VStack, useToast, View} from 'native-base';
import React, {useEffect} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import CustomToast from '../../../components/CustomToast';
import AsyncStorageService from '../../../config/asyncStorageService';
import ProfileCard from '../../../features/profile/ProfileCard';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {
  useCustomerProfileQuery,
  useLogoutMutation,
} from '../../../services/authService';
import {setUserInfo} from '../../../stores/global.store';
import ScrollViewLayout from '../../../layout/MainScreenLayout/ScrollViewLayout';
import {useFCMToken} from '../../../hooks/useFCMToken';
import CustomSpinner from '../../../components/CustomSpinner';
import ButtonLayout from './ButtonLayout';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {data: dataProfileCustomer, refetch} =
    useCustomerProfileQuery(undefined);
  const [logout, {isSuccess, isError, error, isLoading}] = useLogoutMutation();

  // HOOKS
  const toast = useToast();
  const [deviceToken] = useFCMToken(navigation);

  const handleLogout = () => {
    logout({deviceToken});
  };

  const handleClearToken = async () => {
    try {
      await AsyncStorageService.clearToken();
    } catch (error) {
      console.log(error);
    }
    dispatch(setUserInfo(null));
  };
  const handleEditProfile = () => {
    navigation.navigate('EditProfileCustomer');
  };

  const handleViewPayments = () => {
    navigation.navigate('CustomerPayments');
  };

  const handleViewWallet = () => {
    navigation.navigate('CustomerWallet');
  };

  const handleViewSettings = () => {
    navigation.navigate('CustomerSettings');
  };

  useEffect(() => {
    if (isSuccess) {
      handleClearToken();
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thành công!"
            description="Đăng xuất thành công"
            status="success"
          />
        ),
      });
    }

    if (isError) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={error?.message || 'Đăng xuất thất bại!'}
            status="error"
          />
        ),
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollViewLayout>
      <Center>
        <VStack space={3} w="full" alignItems={'center'}>
          <View bg="blue.200" p="4" rounded="full">
            <Avatar
              source={
                dataProfileCustomer?.avatar
                  ? {uri: dataProfileCustomer?.avatar}
                  : require('../../../assets/customer.png')
              }
              bg="blue.400"
              size="xl"
            />
          </View>

          <ProfileCard {...dataProfileCustomer} />

          <ButtonLayout
            handlePress={handleEditProfile}
            icon={
              <MaterialCommunityIcons name="circle-edit-outline" size={16} />
            }
            text="Chỉnh sửa trang cá nhân"
          />

          <ButtonLayout
            handlePress={handleViewPayments}
            icon={<FontAwesome6 name="cash-register" size={16} />}
            text="Lịch sử giao dịch"
          />

          <ButtonLayout
            handlePress={handleViewWallet}
            icon={<MaterialCommunityIcons name="wallet-outline" size={16} />}
            text="Ví"
          />

          <ButtonLayout
            handlePress={handleViewSettings}
            icon={<Feather name="settings" size={16} />}
            text="Thông tin ứng dụng"
          />

          <ButtonLayout
            handlePress={handleLogout}
            icon={<MaterialCommunityIcons name="logout" size={16} />}
            text="Đăng xuất"
            bg="red.500"
            color="red.500"
            borderColor="red.500"
            textColor="white"
          />
        </VStack>
      </Center>

      {isLoading && <CustomSpinner visible={isLoading} />}
    </ScrollViewLayout>
  );
};

export default Profile;
