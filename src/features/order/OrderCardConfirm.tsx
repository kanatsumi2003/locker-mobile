import dayjs from 'dayjs';
import {
  AspectRatio,
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {FULL_TIME_FORMAT} from '../../constants/common';
import {ICreateOrderRequest, ORDER_STATUS} from '../../types/order/order';

import {badgeRenderOrderStatus} from '../../utils/badgeRender';
import {formatDecimal} from '../../utils/formatDecimal';
import {
  orderStatusColorRender,
  orderTypeImageRender,
} from '../../utils/orderRender';
import {mapOrderType} from '../../utils/textMapper';

interface Props extends ICreateOrderRequest {
  handlePress: () => void;
  maxW?: number;
}

const OrderCardConfirm: React.FC<Partial<Props>> = ({
  id,
  maxW = 'full',
  deliveryJoinedAddress,
  type,
  senderPhone,
  receiverPhone,
  totalPrice,
  intendedReceiveAt,
  reservationFee,
  handlePress,
}) => {
  return (
    <Pressable alignItems="center" onPress={handlePress}>
      <Box alignItems="center">
        <Box
          w="full"
          borderColor={orderStatusColorRender(ORDER_STATUS.RESERVED)}
          borderWidth="1"
          maxW={maxW}
          rounded="lg"
          overflow="hidden"
          borderRadius="lg">
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                w="full"
                h="full"
                resizeMode="cover"
                source={orderTypeImageRender(type)}
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <HStack justifyContent="flex-end" alignItems="center" flex="1">
                {badgeRenderOrderStatus(ORDER_STATUS.RESERVED)}
              </HStack>
            </Stack>

            <Stack space={2}>
              <HStack alignItems="center">
                <Icon as={<Feather name={'tag'} />} mr="1" />

                <HStack alignItems="center">
                  <Heading size="xs" color="gray.500" mr="2">
                    Loại dịch vụ:
                  </Heading>
                  <Text>{mapOrderType(type)}</Text>
                </HStack>
              </HStack>

              {senderPhone && (
                <HStack alignItems="flex-start">
                  <Icon as={<Feather name={'user'} />} mr="1" />

                  <HStack alignItems="center">
                    <Heading size="xs" color="gray.500" mr="2">
                      Người gửi:
                    </Heading>
                    <Text>{senderPhone}</Text>
                  </HStack>
                </HStack>
              )}

              {receiverPhone && (
                <HStack alignItems="flex-start">
                  <Icon as={<Feather name={'user'} />} mr="1" />

                  <HStack alignItems="center">
                    <Heading size="xs" color="gray.500" mr="2">
                      Người nhận:
                    </Heading>
                    <Text>{receiverPhone}</Text>
                  </HStack>
                </HStack>
              )}

              {intendedReceiveAt && (
                <HStack alignItems="flex-start">
                  <Icon as={<Feather name={'calendar'} />} mr="1" />

                  <HStack alignItems="center">
                    <Heading size="xs" color="gray.500" mr="2">
                      Thời gian:
                    </Heading>
                    <Text>
                      {dayjs(intendedReceiveAt).format(FULL_TIME_FORMAT)}
                    </Text>
                  </HStack>
                </HStack>
              )}

              {deliveryJoinedAddress && (
                <>
                  <HStack alignItems="center">
                    <Icon as={<Feather name={'truck'} />} mr="1" />

                    <Heading size="xs" color="gray.500" mr="2">
                      Địa chỉ giao hàng:
                    </Heading>
                  </HStack>
                  <Text flex="1">{deliveryJoinedAddress}</Text>
                </>
              )}

              {reservationFee !== null && (
                <HStack alignItems="center">
                  <Icon as={<Feather name={'box'} />} mr="1" />

                  <HStack alignItems="center">
                    <Heading size="xs" color="gray.500" mr="2">
                      Phí đặt chỗ:
                    </Heading>
                    <Heading size="xs">
                      {formatDecimal(reservationFee)} VND
                    </Heading>
                  </HStack>
                </HStack>
              )}

              {totalPrice != null && (
                <HStack alignItems="center">
                  <Icon as={<Feather name={'credit-card'} />} mr="1" />

                  <HStack alignItems="center">
                    <Heading size="xs" color="gray.500" mr="2">
                      Tổng tiền dịch vụ:
                    </Heading>
                    <Heading size="xs">{formatDecimal(totalPrice)} VND</Heading>
                  </HStack>
                </HStack>
              )}
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Pressable>
  );
};

export default OrderCardConfirm;
