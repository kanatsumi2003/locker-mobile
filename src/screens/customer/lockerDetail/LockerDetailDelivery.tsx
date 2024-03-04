import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FormControl, Hidden, Select, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import CustomSelect from '../../../components/CustomSelect';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {
  useAddressesQuery,
  useLazyMapQuery,
} from '../../../services/addressService';
import {setCreateOrderRequest} from '../../../stores/order.store';
import {ICreateOrderRequest} from '../../../types/order/order';

const LockerDetailDelivery = () => {
  const [first, setFirst] = useState<boolean>(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList>>();

  const dispatch = useDispatch();

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
  } = useForm<ICreateOrderRequest>();

  // QUERY
  const {data: provinces, isLoading: isLoadingProvince} = useAddressesQuery();

  const {data: districts, isLoading: isLoadingDistrict} = useAddressesQuery(
    {
      parentCode: watch('deliveryAddress.provinceCode'),
    },
    {
      skip: !watch('deliveryAddress.provinceCode'),
    },
  );

  const {data: wards, isLoading: isLoadingWard} = useAddressesQuery(
    {
      parentCode: watch('deliveryAddress.districtCode'),
    },
    {
      skip: !watch('deliveryAddress.districtCode'),
    },
  );

  const [trigger, {data: dataMap, isFetching: isMapLoading}] =
    useLazyMapQuery();

  const onSubmit: SubmitHandler<ICreateOrderRequest> = data => {
    const provinceName = provinces?.find(
      province => province?.code === data?.deliveryAddress?.provinceCode,
    )?.name;

    const districtName = districts?.find(
      district => district?.code === data?.deliveryAddress?.districtCode,
    )?.name;

    const wardName = wards?.find(
      ward => ward?.code === data?.deliveryAddress?.wardCode,
    )?.name;

    const deliveryJoinedAddress = [
      provinceName,
      districtName,
      wardName,
      data?.deliveryAddress?.address,
    ]
      .filter(item => item)
      .join(', ');
    dispatch(setCreateOrderRequest({...data, deliveryJoinedAddress}));
    navigation.navigate('CustomerLockerDetailReceiver', {
      id: route?.params?.id,
    });
  };

  const handlePass = () => {
    navigation.navigate('CustomerLockerDetailReceiver', {
      id: route.params?.id,
    });
  };

  useEffect(() => {
    const provinceName = provinces?.find(
      province => province?.code === watch('deliveryAddress.provinceCode'),
    )?.name;

    const districtName = districts?.find(
      district => district?.code === watch('deliveryAddress.districtCode'),
    )?.name;

    const wardName = wards?.find(
      ward => ward?.code === watch('deliveryAddress.wardCode'),
    )?.name;

    const queryLocation = [provinceName, districtName, wardName]
      .filter(item => item)
      .join(', ');

    if ((provinceName || districtName || wardName) && !first) {
      trigger({q: queryLocation});
    }

    setFirst(false);
  }, [
    watch('deliveryAddress.provinceCode'),
    watch('deliveryAddress.districtCode'),
    watch('deliveryAddress.wardCode'),
  ]);

  useEffect(() => {
    if (dataMap && dataMap?.features?.at(0)?.geometry?.coordinates) {
      setValue(
        'deliveryAddress.latitude',
        dataMap?.features?.at(0)?.geometry?.coordinates?.[1],
      );
      setValue(
        'deliveryAddress.longitude',
        dataMap?.features?.at(0)?.geometry?.coordinates?.[0],
      );
    }
  }, [dataMap]);

  return (
    <Layout>
      <VStack space={4}>
        <FormControl
          isReadOnly
          isRequired
          isInvalid={'deliveryAddress' in errors}>
          <CustomSelect
            rules={{required: 'Trường này là bắt buộc'}}
            label="Tỉnh / Thành phố"
            control={control}
            name="deliveryAddress.provinceCode">
            {provinces?.map(item => (
              <Select.Item
                isLoading={isLoadingProvince}
                key={item.code}
                label={item.name}
                value={item.code}
              />
            ))}
          </CustomSelect>
        </FormControl>

        <FormControl
          isReadOnly
          isRequired
          isInvalid={'deliveryAddress' in errors}>
          <CustomSelect
            rules={{required: 'Trường này là bắt buộc'}}
            isDisabled={!watch('deliveryAddress.provinceCode')}
            label="Quận / Huyện"
            control={control}
            name="deliveryAddress.districtCode">
            {districts?.map(item => (
              <Select.Item
                isLoading={isLoadingDistrict}
                key={item.code}
                label={item.name}
                value={item.code}
              />
            ))}
          </CustomSelect>
        </FormControl>

        <FormControl
          isReadOnly
          isRequired
          isInvalid={'deliveryAddress' in errors}>
          <CustomSelect
            rules={{required: 'Trường này là bắt buộc'}}
            isDisabled={!watch('deliveryAddress.districtCode')}
            label="Phường / xã"
            control={control}
            name="deliveryAddress.wardCode">
            {wards?.map(item => (
              <Select.Item
                isLoading={isLoadingWard}
                key={item.code}
                label={item.name}
                value={item.code}
              />
            ))}
          </CustomSelect>
        </FormControl>

        <FormControl isRequired isInvalid={'deliveryAddress' in errors}>
          <CustomInput
            rules={{required: 'Trường này là bắt buộc'}}
            control={control}
            label="Địa chỉ"
            name="deliveryAddress.address"
          />
        </FormControl>

        <VStack w="full" space={4} justifyContent="flex-end" mt={2}>
          <CustomButton onPress={handlePass} variant="outline">
            Bỏ qua
          </CustomButton>
          <CustomButton variant="solid" onPress={handleSubmit(onSubmit)}>
            Tiếp theo
          </CustomButton>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default LockerDetailDelivery;
