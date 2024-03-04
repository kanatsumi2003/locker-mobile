import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
  View,
  useToast,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {PermissionsAndroid, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import CustomSpinner from '../../../components/CustomSpinner';
import CustomTextArea from '../../../components/CustomTextArea';
import CustomToast from '../../../components/CustomToast';
import axiosClient from '../../../config/axiosClient';
import {BASE_URL_FILE} from '../../../constants/endpoints';
import ScrollViewLayout from '../../../layout/MainScreenLayout/ScrollViewLayout';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {useUpdateStaffProfileMutation} from '../../../services/authService';
import {selectUserInfo} from '../../../stores/global.store';
import {UpdateProfileParams} from '../../../types/auth/login';

const EditProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [updateProfile, {isLoading, isSuccess, isError, error}] =
    useUpdateStaffProfileMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const userInfo = useSelector(selectUserInfo);

  // HOOKS
  const toast = useToast();

  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<UpdateProfileParams>();

  const openImagePicker = async () => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        );
      }
    } catch (err) {
      console.log('err', err);
    }

    try {
      const res = await ImagePicker?.openPicker({
        multiple: false,
        waitAnimationEnd: false,
        includeExif: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
        maxFiles: 1,
        includeBase64: true,
      });

      const data = {
        uri: res.path,
        type: res?.mime,
        fileName: res.path.split('/')[res.path.split('/').length - 1],
        name: res.path.split('/')[res.path.split('/').length - 1],
      };

      if (res) {
        const formData = new FormData();
        formData.append('file', data);

        const finalRes = await axiosClient.post(`${BASE_URL_FILE}`, formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });

        if (finalRes) {
          setAvatarUrl(finalRes.data.url);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data: UpdateProfileParams) => {
    updateProfile({...data, avatar: avatarUrl});
  };

  useEffect(() => {
    setValue('fullName', userInfo?.fullName);
    setValue('username', userInfo?.username);
    setValue('phoneNumber', userInfo?.phoneNumber);
    setValue('description', userInfo?.description);
  }, [userInfo]);

  const handleRemoveSelectedImages = () => {
    setAvatarUrl('');
  };

  useEffect(() => {
    if (isSuccess) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thành công!"
            description="Chỉnh sửa thông tin cá nhân thành công"
            status="success"
          />
        ),
      });
      navigation.goBack();
    }

    if (isError) {
      toast.show({
        placement: 'top-left',
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={error?.message || 'Chỉnh sửa thông tin thất bại!'}
            status="error"
          />
        ),
      });
    }
  }, [isSuccess, isError]);

  return (
    <ScrollViewLayout>
      <VStack space={4}>
        <View>
          <Text fontWeight="semibold" mb={1} color="gray.500">
            Hình ảnh
          </Text>

          {avatarUrl && (
            <View
              position="relative"
              flexDirection="row"
              my="4"
              justifyContent="center">
              <Image source={{uri: avatarUrl}} rounded="full" w="48" h="48" />
              <IconButton
                variant="solid"
                rounded="full"
                size={6}
                position="absolute"
                top={0}
                right={20}
                colorScheme={'gray'}
                icon={<Icon as={<MaterialCommunityIcons name="close" />} />}
                onPress={() => handleRemoveSelectedImages()}
              />
            </View>
          )}

          <Button
            colorScheme="gray"
            variant="outline"
            rounded="lg"
            onPress={openImagePicker}>
            <HStack alignItems="items-center" space={1}>
              <Icon
                as={<MaterialCommunityIcons name="camera-outline" />}
                size="5"
              />

              <Text fontWeight="semibold" color="gray.500">
                Chọn hình ảnh
              </Text>
            </HStack>
          </Button>
        </View>

        <FormControl isRequired isInvalid={'fullName' in errors}>
          <CustomInput
            defaultValue={userInfo?.fullName}
            control={control}
            label="Họ và tên"
            name="fullName"
            rules={{required: 'Trường này là bắt buộc'}}
          />
        </FormControl>

        <FormControl isRequired isInvalid={'username' in errors}>
          <CustomInput
            defaultValue={userInfo?.username}
            control={control}
            label="Username"
            name="username"
            rules={{required: 'Trường này là bắt buộc'}}
          />
        </FormControl>

        <FormControl isRequired isInvalid={'phoneNumber' in errors}>
          <CustomInput
            defaultValue={userInfo?.phoneNumber}
            keyboardType="number-pad"
            control={control}
            label="Số điện thoại"
            name="phoneNumber"
            rules={{required: 'Trường này là bắt buộc'}}
          />
        </FormControl>

        <FormControl>
          <CustomTextArea
            defaultValue={userInfo?.description}
            control={control}
            label="Mô tả"
            name="description"
          />
        </FormControl>

        <CustomButton mt={2} onPress={handleSubmit(onSubmit)}>
          Cập nhật
        </CustomButton>
      </VStack>

      <CustomSpinner visible={isLoading} />
    </ScrollViewLayout>
  );
};

export default EditProfile;
