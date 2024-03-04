import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Select,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {IOrderParams, ORDER_STATUS, ORDER_TYPE} from '../../types/order/order';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {SubmitHandler, useForm} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomSelect from '../../components/CustomSelect';
import {DATE_FORMAT} from '../../constants/common';
import {DrawerParamList} from '../../navigation/customer/TabNavigationCustomer';
import {setOpenModal} from '../../stores/global.store';
import {
  selectOrderLockerParams,
  selectRangePicker,
  setOrderLockerParams,
  setOrderParams,
  setRangePicker,
} from '../../stores/order.store';
import {mapOrderStatus, mapOrderType} from '../../utils/textMapper';

const CustomerDrawerFilterOrder = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IOrderParams>();

  const rangePicker = useSelector(selectRangePicker);
  const orderLockerParams = useSelector(selectOrderLockerParams);

  const handleOpenCalendar = () => {
    dispatch(
      setOpenModal({
        type: 'calendar',
      }),
    );
  };

  const handleFilterListLocker = () => {
    navigation.navigate('CustomerLockerListFilter');
  };

  const onClose = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const resetFilter = () => {
    onClose();
    setValue('type', '');
    setValue('status', '');
    dispatch(setRangePicker({from: undefined, to: undefined}));
    dispatch(
      setOrderParams({
        pageNumber: 1,
        pageSize: 5,
        from: undefined,
        to: undefined,
        lockerId: undefined,
        type: undefined,
        status: undefined,
      }),
    );
    dispatch(
      setOrderLockerParams({lockerId: undefined, lockerName: undefined}),
    );
  };

  const onSubmit: SubmitHandler<IOrderParams> = data => {
    onClose();
    dispatch(
      setOrderParams({
        ...data,
        ...rangePicker,
        ...orderLockerParams,
        pageNumber: 1,
        pageSize: 5,
      }),
    );
  };

  return (
    <Box p="4" h="full" position="relative">
      <VStack space="4">
        <FormControl isReadOnly isInvalid={'type' in errors}>
          <CustomSelect name="type" control={control} label="Loại đơn hàng">
            {Object.values(ORDER_TYPE).map(type => (
              <Select.Item key={type} label={mapOrderType(type)} value={type} />
            ))}
            <Select.Item label="" value="" opacity={0} isDisabled={true} />
          </CustomSelect>
        </FormControl>

        <FormControl isReadOnly isInvalid={'status' in errors}>
          <CustomSelect
            name="status"
            control={control}
            label="Trạng thái đơn hàng">
            {Object.values(ORDER_STATUS).map((status: ORDER_STATUS) => (
              <Select.Item
                key={status}
                value={status}
                label={mapOrderStatus(status)}
              />
            ))}
            <Select.Item label="" value="" opacity={0} isDisabled={true} />
          </CustomSelect>
        </FormControl>

        <Text fontWeight="medium" color="gray.500" mb="0">
          Ngày tạo
        </Text>
        <Button
          onPress={() => handleOpenCalendar()}
          variant="outline"
          colorScheme="blue"
          color="black">
          <HStack alignItems="center">
            <Icon
              mr="3"
              size="6"
              color="gray.400"
              as={<MaterialCommunityIcons name="calendar-month-outline" />}
            />
            <Text>
              {rangePicker?.from
                ? dayjs(rangePicker.from).format(DATE_FORMAT)
                : '  Chọn từ lịch'}
              {rangePicker?.to &&
                ` - ${dayjs(rangePicker.from).format(DATE_FORMAT)}`}
            </Text>
          </HStack>
        </Button>

        <Text fontWeight="medium" color="gray.500" mb="0">
          Locker
        </Text>
        <CustomButton
          onPress={() => handleFilterListLocker()}
          variant="outline"
          colorScheme="blue"
          color="black">
          <HStack alignItems="center">
            <Icon
              mr="3"
              size="6"
              color="gray.400"
              as={<Feather name="grid" />}
            />
            <Text>{orderLockerParams?.lockerName ?? 'Chọn locker'}</Text>
          </HStack>
        </CustomButton>

        <Button.Group>
          <CustomButton flex="1" variant="outline" onPress={resetFilter}>
            Đặt lại
          </CustomButton>

          <CustomButton flex="1" onPress={handleSubmit(onSubmit)}>
            Lọc
          </CustomButton>
        </Button.Group>
      </VStack>
    </Box>
  );
};

export default CustomerDrawerFilterOrder;
