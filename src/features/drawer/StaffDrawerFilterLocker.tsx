import {DrawerActions, useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Box, Button, FormControl, Select, VStack} from 'native-base';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import CustomSelect from '../../components/CustomSelect';
import {DrawerParamList} from '../../navigation/staff/TabNavigationStaff';
import {useAddressesQuery} from '../../services/addressService';
import {setLockerParams} from '../../stores/order.store';
import {ILockerParams, LOCKER_STATUS} from '../../types/locker/locker';
import {mapLockerStatus} from '../../utils/textMapper';
import CustomButton from '../../components/CustomButton';

const StaffDrawerFilterLocker = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
  } = useForm<ILockerParams>();

  // QUERY
  const {data: provinces, isLoading: isLoadingProvince} = useAddressesQuery();

  const {data: districts, isLoading: isLoadingDistrict} = useAddressesQuery(
    {
      parentCode: watch('provinceCode'),
    },
    {
      skip: !watch('provinceCode'),
    },
  );

  const {data: wards, isLoading: isLoadingWard} = useAddressesQuery(
    {
      parentCode: watch('districtCode'),
    },
    {
      skip: !watch('districtCode'),
    },
  );

  const onClose = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const resetFilter = () => {
    onClose();
    setValue('provinceCode', '');
    setValue('districtCode', '');
    setValue('wardCode', '');
    setValue('status', '');
    dispatch(
      setLockerParams({
        pageNumber: 1,
        pageSize: 5,
        provinceCode: undefined,
        districtCode: undefined,
        wardCode: undefined,
        status: undefined,
      }),
    );
  };

  const onSubmit: SubmitHandler<ILockerParams> = data => {
    onClose();
    dispatch(
      setLockerParams({
        ...data,
        pageNumber: 1,
        pageSize: 5,
      }),
    );
  };

  return (
    <Box p="4" h="full" position="relative">
      <VStack space="4">
        <FormControl isReadOnly isInvalid={'status' in errors}>
          <CustomSelect label="Trạng thái" control={control} name="status">
            {Object.values(LOCKER_STATUS).map((status: LOCKER_STATUS) => (
              <Select.Item
                key={status}
                value={status}
                label={mapLockerStatus(status)}
              />
            ))}
            <Select.Item label="" value="" opacity={0} isDisabled={true} />
          </CustomSelect>
        </FormControl>

        <FormControl isReadOnly isInvalid={'provinceCode' in errors}>
          <CustomSelect
            label="Tỉnh / Thành phố"
            control={control}
            name="provinceCode">
            {provinces?.map(item => (
              <Select.Item
                key={item.code}
                label={item.name}
                value={item.code}
              />
            ))}
            <Select.Item label="" value="" opacity={0} isDisabled={true} />
          </CustomSelect>
        </FormControl>

        <FormControl isReadOnly isInvalid={'districtCode' in errors}>
          <CustomSelect
            isDisabled={!watch('provinceCode')}
            label="Quận / Huyện"
            control={control}
            name="districtCode">
            {districts?.map(item => (
              <Select.Item
                key={item.code}
                label={item.name}
                value={item.code}
              />
            ))}
            <Select.Item label="" value="" opacity={0} isDisabled={true} />
          </CustomSelect>
        </FormControl>

        <FormControl isReadOnly isInvalid={'wardCode' in errors}>
          <CustomSelect
            isDisabled={!watch('districtCode')}
            label="Phường / xã"
            control={control}
            name="wardCode">
            {wards?.map(item => (
              <Select.Item
                key={item.code}
                label={item.name}
                value={item.code}
              />
            ))}
            <Select.Item label="" value="" opacity={0} isDisabled={true} />
          </CustomSelect>
        </FormControl>

        <Button.Group>
          <CustomButton
            flex="1"
            variant="outline"
            colorScheme="blue"
            onPress={resetFilter}>
            Đặt lại
          </CustomButton>

          <CustomButton
            flex="1"
            variant="solid"
            colorScheme="blue"
            onPress={handleSubmit(onSubmit)}>
            Lọc
          </CustomButton>
        </Button.Group>
      </VStack>
    </Box>
  );
};

export default StaffDrawerFilterLocker;
