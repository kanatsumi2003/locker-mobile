import {Heading, HStack, Stack, Text} from 'native-base';
import React from 'react';
import {Settings} from '../../types/setting';
import {formatDecimal} from '../../utils/formatDecimal';

interface Props extends Settings {}

const SettingCard: React.FC<Partial<Props>> = ({orderSettings}) => {
  return (
    <Stack p="4" space={3} bgColor="blue.500" rounded="lg" shadow="2">
      <HStack alignItems="center" justifyContent="space-between">
        <Text color="white">Phí đặt chỗ:</Text>
        <Heading size="sm" color="white">
          {formatDecimal(orderSettings?.reservationFee)} VND
        </Heading>
      </HStack>

      <HStack alignItems="center" justifyContent="space-between">
        <Text color="white">Phí dịch vụ giữ đồ:</Text>
        <Heading size="sm" color="white">
          {formatDecimal(orderSettings?.storagePrice)} VND
        </Heading>
      </HStack>

      <HStack alignItems="center" justifyContent="space-between">
        <Text color="white">Thời gian chờ đặt hàng:</Text>
        <Heading size="sm" color="white">
          {orderSettings?.reservationInitTimeoutInMinutes} phút
        </Heading>
      </HStack>

      <HStack alignItems="center" justifyContent="space-between">
        <Text color="white">Số lượng đơn hàng tối đa:</Text>
        <Heading size="sm" color="white">
          {orderSettings?.maxActiveOrderCount} đơn/khách hàng
        </Heading>
      </HStack>

      <HStack alignItems="center" justifyContent="space-between">
        <Text color="white">Thời gian tối thiểu xử lý đơn hàng giặt sấy:</Text>
        <Heading size="sm" color="white">
          {orderSettings?.minTimeProcessLaundryOrderInHours} giờ
        </Heading>
      </HStack>
    </Stack>
  );
};

export default SettingCard;
