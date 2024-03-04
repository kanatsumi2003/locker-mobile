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
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomSpinner from '../../components/CustomSpinner';
import CustomToast from '../../components/CustomToast';
import Layout from '../../layout/AuthScreenLayout/Layout';
import {RootStackParamList} from '../../navigation/StackNavigation';
import {useResetPasswordStaffMutation} from '../../services/authService';
import {
  selectResetPassFormData,
  setResetPassFormData,
} from '../../stores/global.store';
import {IResetPassRequest} from '../../types/auth/login';

const ResetPassword: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const resetPassFormData = useSelector(selectResetPassFormData);

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<IResetPassRequest>();

  // HOOKS
  const toast = useToast();

  // STATE
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // MUTATION
  const [resetPass, {isSuccess, isError, error, data, isLoading}] =
    useResetPasswordStaffMutation();

  const onSubmit: SubmitHandler<IResetPassRequest> = data => {
    resetPass({...resetPassFormData, ...data});
  };

  useEffect(() => {
    if (isSuccess) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thành công!"
            description="Đổi mật khẩu thành công"
            status="success"
          />
        ),
      });
      dispatch(setResetPassFormData(null));
      navigation.goBack();
    }

    if (isError) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={error?.message || 'Đổi mật khẩu thất bại!'}
            status="error"
          />
        ),
      });
    }
  }, [isSuccess, isError]);

  return (
    <Layout label="Đổi mật khẩu" center>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center>
          <Box safeArea p="2">
            <Center>
              <Image
                source={require('../../assets/resetPassword.jpg')}
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

              <FormControl isRequired isInvalid={'confirmPassword' in errors}>
                <CustomInput
                  control={control}
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  rules={{
                    required: 'Trường này là bắt buộc',
                    validate: value =>
                      value === watch('password') ||
                      'Mật khẩu xác nhận không khớp!',
                  }}
                  InputRightElement={
                    <Pressable onPress={() => setShowConfirm(!showConfirm)}>
                      <Icon
                        as={
                          <MaterialCommunityIcons
                            name={
                              showConfirm ? 'eye-outline' : 'eye-off-outline'
                            }
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
                Đổi mật khẩu
              </CustomButton>
            </VStack>
          </Box>
        </Center>

        <CustomSpinner visible={isLoading} />
      </ScrollView>
    </Layout>
  );
};

export default ResetPassword;
