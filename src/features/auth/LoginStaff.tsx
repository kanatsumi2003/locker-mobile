import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Center,
  FormControl,
  Heading,
  Icon,
  Image,
  Pressable,
  ScrollView,
  VStack,
  useToast,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomSpinner from '../../components/CustomSpinner';
import CustomToast from '../../components/CustomToast';
import AsyncStorageService from '../../config/asyncStorageService';
import {ERROR_CODE_UPDATE_PASS} from '../../constants/common';
import {useFCMToken} from '../../hooks/useFCMToken';
import Layout from '../../layout/AuthScreenLayout/Layout';
import {RootStackParamList} from '../../navigation/StackNavigation';
import {
  useAddDeviceTokenMutation,
  useLoginStaffMutation,
  useStaffProfileQuery,
} from '../../services/authService';
import {setResetPassFormData, setUserInfo} from '../../stores/global.store';
import {ILoginStaffParams} from '../../types/auth/login';

const LoginStaff: React.FC = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
    resetField,
  } = useForm<ILoginStaffParams>();

  // HOOKS
  const toast = useToast();
  const [deviceToken, deviceType] = useFCMToken(navigation);

  // STATE
  const [show, setShow] = useState(false);

  // MUTATION
  const [login, {isSuccess, isError, error, data, isLoading}] =
    useLoginStaffMutation();

  const {data: dataProfile, isLoading: isLoadingProfile} = useStaffProfileQuery(
    undefined,
    {
      skip: !isSuccess,
    },
  );

  const [registerDevice] = useAddDeviceTokenMutation();

  const onSubmit: SubmitHandler<ILoginStaffParams> = data => {
    login(data);
  };

  const handleSetDataAsyncStorage = async () => {
    await AsyncStorageService.setAccessToken(data!.accessToken);
    await AsyncStorageService.setRefreshToken(data!.refreshToken);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thành công!"
            description="Đăng nhập thành công"
            status="success"
          />
        ),
      });
      handleSetDataAsyncStorage();

      if (deviceToken) {
        registerDevice({
          deviceToken,
          deviceType,
        });
      }
    }

    if (isError) {
      if (error?.code === ERROR_CODE_UPDATE_PASS) {
        toast.show({
          placement: 'top-left',
          render: () => (
            <CustomToast
              title="Thông báo!"
              description={
                'Hãy đổi lại mật khẩu của bạn để đăng nhập vào hệ thống!'
              }
              status="info"
            />
          ),
        });
        resetField('password');
        dispatch(
          setResetPassFormData({
            username: getValues('username'),
            token: error.message,
          }),
        );
        navigation.navigate('ResetPassStaff');
      } else {
        toast.show({
          placement: 'top-left',
          render: () => (
            <CustomToast
              title="Thất bại!"
              description={error?.message || 'Đăng nhập thất bại!'}
              status="error"
            />
          ),
        });
      }
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (dataProfile) {
      dispatch(setUserInfo(dataProfile));
    }
  }, [dataProfile]);

  return (
    <Layout label="Đăng nhập" center>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center flex="1">
          <Box safeArea p="2">
            <Center>
              <Image
                source={require('../../assets/loginStaff.jpg')}
                alt="login"
                w="80"
                h="80"
                zIndex={'-99'}
              />
              <VStack>
                <Heading size="lg" fontWeight="600" color="coolGray.800">
                  Chào mừng
                </Heading>
                <Heading
                  mt="1"
                  color="coolGray.600"
                  fontWeight="medium"
                  size="xs">
                  Đăng nhập để tiếp tục vào hệ thống!
                </Heading>
              </VStack>
            </Center>

            <VStack space={4} mt="4">
              <FormControl isRequired isInvalid={'username' in errors}>
                <CustomInput
                  control={control}
                  label="Username"
                  name="username"
                  rules={{required: 'Trường này là bắt buộc'}}
                />
              </FormControl>
              <FormControl isRequired isInvalid={'password' in errors}>
                <CustomInput
                  control={control}
                  label="Mật khẩu"
                  name="password"
                  type={show ? 'text' : 'password'}
                  rules={{required: 'Trường này là bắt buộc'}}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialCommunityIcons
                            name={show ? 'eye-outline' : 'eye-off-outline'}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
              </FormControl>

              <CustomButton onPress={handleSubmit(onSubmit)} mt="2">
                Đăng nhập
              </CustomButton>

              <CustomSpinner visible={isLoading || isLoadingProfile} />
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </Layout>
  );
};

export default LoginStaff;
