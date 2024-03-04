import {
  Box,
  Button,
  Center,
  FormControl,
  Icon,
  Image,
  Pressable,
  VStack,
  useToast,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomToast from '../../components/CustomToast';
import ScrollViewLayout from '../../layout/MainScreenLayout/ScrollViewLayout';
import {RootStackScreenProps} from '../../navigation/StackNavigation';
import {useChangePasswordStaffMutation} from '../../services/authService';
import {IChangePassRequest} from '../../types/auth/login';

const ChangePassword: React.FC<RootStackScreenProps<'ChangePassStaff'>> = ({
  navigation,
}) => {
  const dispatch = useDispatch();

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<IChangePassRequest>();

  // HOOKS
  const toast = useToast();

  // STATE
  const [showCurrent, setShowCurrent] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // MUTATION
  const [changePass, {isSuccess, isError, error, data, isLoading}] =
    useChangePasswordStaffMutation();

  const onSubmit: SubmitHandler<IChangePassRequest> = data => {
    changePass(data);
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
    <ScrollViewLayout>
      <Center w="100%" h="100%">
        <Box safeArea w="90%">
          <Center>
            <Image
              source={require('../../assets/changePassword.jpg')}
              alt="login"
              w="80"
              h="80"
              zIndex={'-99'}
            />
          </Center>

          <VStack space={4} mt="4">
            <FormControl isRequired isInvalid={'currentPassword' in errors}>
              <CustomInput
                control={control}
                label="Mật khẩu hiện tại"
                name="currentPassword"
                type={showCurrent ? 'text' : 'password'}
                rules={{required: 'Trường này là bắt buộc'}}
                InputRightElement={
                  <Pressable onPress={() => setShowCurrent(!showCurrent)}>
                    <Icon
                      as={
                        <MaterialCommunityIcons
                          name={showCurrent ? 'eye-outline' : 'eye-off-outline'}
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

            <FormControl isRequired isInvalid={'newPassword' in errors}>
              <CustomInput
                control={control}
                label="Mật khẩu mới"
                name="newPassword"
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
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                rules={{
                  required: 'Trường này là bắt buộc',
                  validate: value =>
                    value === watch('newPassword') ||
                    'Mật khẩu xác nhận không khớp!',
                }}
                InputRightElement={
                  <Pressable onPress={() => setShowConfirm(!showConfirm)}>
                    <Icon
                      as={
                        <MaterialCommunityIcons
                          name={showConfirm ? 'eye-outline' : 'eye-off-outline'}
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
    </ScrollViewLayout>
  );
};

export default ChangePassword;
