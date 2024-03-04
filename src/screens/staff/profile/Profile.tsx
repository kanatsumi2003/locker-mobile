import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Avatar, VStack, useToast, View} from 'native-base';
import React, {useEffect} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import CustomSpinner from '../../../components/CustomSpinner';
import CustomToast from '../../../components/CustomToast';
import AsyncStorageService from '../../../config/asyncStorageService';
import ProfileCard from '../../../features/profile/ProfileCard';
import {useFCMToken} from '../../../hooks/useFCMToken';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {
  useLogoutMutation,
  useStaffProfileQuery,
} from '../../../services/authService';
import {setUserInfo} from '../../../stores/global.store';
import ButtonLayout from '../../customer/profile/ButtonLayout';

const Profile = () => {
  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {data: dataProfileStaff, refetch} = useStaffProfileQuery(undefined);
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

  const handleChangePassword = () => {
    navigation.navigate('ChangePassStaff');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfileStaff');
  };

  const handleViewSettings = () => {
    navigation.navigate('StaffSettings');
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
    <Layout>
      <VStack space={4} w="full" alignItems={'center'}>
        <View bg="blue.200" p="4" rounded="full">
          <Avatar
            source={
              dataProfileStaff?.avatar
                ? {uri: dataProfileStaff?.avatar}
                : require('../../../assets/cleaning-staff.png')
            }
            bg="blue.400"
            size="xl"
          />
        </View>

        <ProfileCard {...dataProfileStaff} />

        <ButtonLayout
          handlePress={handleEditProfile}
          icon={<MaterialCommunityIcons name="circle-edit-outline" size={16} />}
          text="Chỉnh sửa trang cá nhân"
        />

        <ButtonLayout
          handlePress={handleChangePassword}
          icon={<FontAwesome6 name="unlock" />}
          text="Đổi mật khẩu"
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

      {isLoading && <CustomSpinner visible={isLoading} />}
    </Layout>
  );
};

export default Profile;
