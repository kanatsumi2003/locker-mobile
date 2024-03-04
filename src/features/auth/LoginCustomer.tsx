import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  Box,
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomSpinner from '../../components/CustomSpinner';
import CustomToast from '../../components/CustomToast';
import AsyncStorageService from '../../config/asyncStorageService';
import {ERROR_CODE_MISSING_OTP} from '../../constants/common';
import {useFCMToken} from '../../hooks/useFCMToken';
import Layout from '../../layout/AuthScreenLayout/Layout';
import {RootStackParamList} from '../../navigation/StackNavigation';
import {
  useAddDeviceTokenMutation,
  useCustomerProfileQuery,
  useLoginCustomerMutation,
} from '../../services/authService';
import {
  selectCustomerPhoneNumber,
  setUserInfo,
} from '../../stores/global.store';

const LoginCustomer: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // STATE
  const [otp, setOtp] = useState<string>('');

  // REDUX
  const dispatch = useDispatch();
  const phoneNumber = useSelector(selectCustomerPhoneNumber);

  // HOOKS
  const toast = useToast();
  const [deviceToken, deviceType] = useFCMToken(navigation);

  // MUTATION
  const [login, {isSuccess, isError, error, data, isLoading}] =
    useLoginCustomerMutation();

  const {data: dataProfile, isLoading: isLoadingProfile} =
    useCustomerProfileQuery(undefined, {
      skip: !isSuccess,
    });

  const [registerDevice] = useAddDeviceTokenMutation();

  const onSubmit = () => {
    login({phoneNumber, otp});
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
      setOtp('');

      if (deviceToken) {
        registerDevice({
          deviceToken,
          deviceType,
        });
      }
    }

    if (isError && error?.code !== ERROR_CODE_MISSING_OTP) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={error?.message || 'Đăng nhập thất bại!'}
            status="error"
          />
        ),
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (dataProfile) {
      dispatch(setUserInfo(dataProfile));
      navigation.navigate('TabStackCustomer');
    }
  }, [dataProfile]);

  return (
    <Layout label="Xác thực OTP" center>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center flex="1">
          <Box safeArea p="2">
            <Center>
              <Image
                source={require('../../assets/otp.jpg')}
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

            <VStack space={4} mt="4" w="full">
              <Center>
                <Text>Vui lòng nhập mã OTP để xác thực tài khoản của bạn!</Text>
              </Center>
              <OTPInputView
                style={{height: 100, width: '100%'}}
                pinCount={6}
                autoFocusOnLoad={false}
                onCodeFilled={code => {
                  setOtp(code);
                }}
                keyboardType="number-pad"
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                codeInputFieldStyle={styles.fieldStyle}
              />

              {error?.code === ERROR_CODE_MISSING_OTP && (
                <Text color="rose.500">Bạn cần nhập đầy đủ mã OTP!</Text>
              )}

              <CustomButton onPress={onSubmit} mt="2">
                Đăng nhập
              </CustomButton>
            </VStack>
          </Box>
        </Center>

        <CustomSpinner visible={isLoading} />
      </ScrollView>
    </Layout>
  );
};

export default LoginCustomer;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
    color: 'black',
  },

  borderStyleHighLighted: {
    borderColor: '#2563eb',
  },

  fieldStyle: {
    marginHorizontal: 2,
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: '#2563eb',
  },
});
