import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Image,
  Select,
  Text,
  View,
  useToast,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {PermissionsAndroid, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../../components/CustomButton';
import CustomSelect from '../../../components/CustomSelect';
import CustomTextArea from '../../../components/CustomTextArea';
import CustomToast from '../../../components/CustomToast';
import axiosClient from '../../../config/axiosClient';
import {BASE_URL_FILE} from '../../../constants/endpoints';
import ScrollViewLayout from '../../../layout/MainScreenLayout/ScrollViewLayout';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {useAddOrderDetailServiceItemMutation} from '../../../services/orderService';
import {IDetailItemServiceItem, LAUNDRY_ITEM} from '../../../types/order/order';
import {mapClothType} from '../../../utils/textMapper';

const AddServiceDetail = () => {
  const [image, setImage] = useState<string>('');
  const [isTouchImage, setIsTouchImage] = useState<boolean>(false);

  const route =
    useRoute<RouteProp<HomeStackParamList, 'StaffAddServiceDetail'>>();

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // HOOKS
  const toast = useToast();

  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<Omit<IDetailItemServiceItem, 'id'>>();

  const handleRemoveSelectedImages = () => {
    setImage('');
  };

  // MUTATION
  const [addOrderDetailServiceItem, {isSuccess, isError, error}] =
    useAddOrderDetailServiceItemMutation();

  const openImagePicker = async () => {
    setIsTouchImage(true);
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
      const res = await ImagePicker?.openCamera({
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
          setImage(finalRes.data.url);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data: Omit<IDetailItemServiceItem, 'id'>) => {
    addOrderDetailServiceItem({
      ...data,
      image,
      orderId: Number(route.params.id),
      detailId: Number(route.params.detail.id),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.show({
        placement: 'top-left',
        render: () => (
          <CustomToast
            title="Thành công!"
            description={'Thêm chi tiết cho dịch vụ thành công!'}
            status="success"
          />
        ),
      });
      navigation.goBack();
      setImage('');
      setIsTouchImage(false);
    }

    if (isError) {
      toast.show({
        placement: 'top-left',
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={
              error?.message || 'Thêm chi tiết cho dịch vụ thất bại!'
            }
            status="error"
          />
        ),
      });
    }
  }, [isSuccess, isError]);

  return (
    <ScrollViewLayout>
      <View mb="4" p="4">
        <View mb="4">
          <Text fontWeight="semibold" mb="2">
            Hình ảnh
          </Text>

          {image && (
            <View
              position="relative"
              flexDirection="row"
              my="4"
              justifyContent="center">
              <Image source={{uri: image}} rounded="full" w="48" h="48" />

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

          {!(isTouchImage && image) && (
            <Text color="rose.500" mt="1">
              Hãy chọn hình ảnh trước khi tiếp tục!
            </Text>
          )}
        </View>

        <FormControl isReadOnly isRequired isInvalid={'type' in errors}>
          <CustomSelect
            rules={{required: 'Trường này là bắt buộc'}}
            label="Loại đồ"
            control={control}
            name="type">
            {Object.values(LAUNDRY_ITEM)?.map(item => (
              <Select.Item key={item} label={mapClothType(item)} value={item} />
            ))}
          </CustomSelect>
        </FormControl>

        <FormControl isInvalid={'description' in errors}>
          <CustomTextArea control={control} label="Mô tả" name="description" />
        </FormControl>

        <CustomButton
          mt="4"
          colorScheme="blue"
          // className="bg-primary-500 py-4 rounded-2xl"
          onPress={handleSubmit(onSubmit)}>
          Cập nhật
        </CustomButton>
      </View>

      {/* <CustomSpinner visible={isLoading} /> */}
    </ScrollViewLayout>
  );
};

export default AddServiceDetail;
