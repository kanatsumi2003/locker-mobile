import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Center,
  FormControl,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomSpinner from '../../components/CustomSpinner';
import CustomToast from '../../components/CustomToast';
import {PHONE_NUMBER_REGEX} from '../../constants/common';
import Layout from '../../layout/AuthScreenLayout/Layout';
import {RootStackParamList} from '../../navigation/StackNavigation';
import {useVerifyCustomerMutation} from '../../services/authService';
import {setCustomerPhoneNumber} from '../../stores/global.store';
import {IVerifyCustomerParams} from '../../types/auth/login';

const VerifyCustomer: React.FC = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<IVerifyCustomerParams>();

  // HOOKS
  const toast = useToast();

  // STATE

  // MUTATION
  const [verify, {isSuccess, isError, error, data, isLoading}] =
    useVerifyCustomerMutation();

  const onSubmit: SubmitHandler<IVerifyCustomerParams> = data => {
    verify(data);
    reset();
    dispatch(setCustomerPhoneNumber(data.phoneNumber));
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('LoginCustomer');
    }

    if (isError) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={error?.message || 'Lấy OTP thất bại!'}
            status="error"
          />
        ),
      });
    }
  }, [isSuccess, isError]);

  const handleNavigateStaff = () => {
    navigation.navigate('LoginStaff');
  };

  return (
    <Layout label="Đăng nhập" center preventGoBack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center flex="1">
          <Box safeArea p="2">
            <Center>
              <Image
                source={require('../../assets/loginCustomer.jpg')}
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
              <FormControl isRequired isInvalid={'phoneNumber' in errors}>
                <CustomInput
                  rules={{
                    required: 'Trường này là bắt buộc',
                    pattern: {
                      value: PHONE_NUMBER_REGEX,
                      message: 'Định dạng số điện thoại không đúng',
                    },
                  }}
                  control={control}
                  label="Số điện thoại"
                  name="phoneNumber"
                  keyboardType="number-pad"
                />
              </FormControl>

              <TouchableOpacity
                className="flex flex-row items-center"
                onPress={handleNavigateStaff}>
                <Text color="blue.400">Đăng nhập với vai trò nhân viên</Text>
                <Icon
                  as={<Entypo name="chevron-right" size={16} />}
                  color="blue.400"
                />
              </TouchableOpacity>

              <CustomButton onPress={handleSubmit(onSubmit)} mt="2">
                Lấy OTP
              </CustomButton>
            </VStack>
          </Box>
        </Center>

        <CustomSpinner visible={isLoading} />
      </ScrollView>
    </Layout>
  );
};

export default VerifyCustomer;
