import dayjs from 'dayjs';
import {
  AspectRatio,
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {DATE_TIME_FORMAT} from '../../constants/common';
import {IOrderItem} from '../../types/order/order';
import {badgeRenderOrderStatus} from '../../utils/badgeRender';
import {formatDecimal} from '../../utils/formatDecimal';
import {
  orderStatusColorRender,
  orderTypeImageRender,
} from '../../utils/orderRender';
import {mapOrderType} from '../../utils/textMapper';

interface Props extends IOrderItem {
  handlePress: () => void;
}

const OrderItem: React.FC<Partial<Props>> = ({
  id,
  status,
  pinCode,
  totalPrice,
  type,
  locker,
  deliverySupported,
  createdAt,
  handlePress,
}) => {
  return (
    <Pressable alignItems="center" onPress={handlePress}>
      <Box
        minW={80}
        w="full"
        rounded="lg"
        overflow="hidden"
        borderColor={orderStatusColorRender(status)}
        borderWidth="1"
        background="white"
        borderRadius="lg">
        <HStack space={3} alignItems="center">
          <View h="full" w="0.5" bg={orderStatusColorRender(status)} />
          <VStack alignItems="center" justifyContent="center">
            <AspectRatio w="20" alignItems={'center'} ratio={4 / 3}>
              <Image
                resizeMode="contain"
                source={orderTypeImageRender(type)}
                alt="image"
                w="full"
                h="full"
              />
            </AspectRatio>
            {badgeRenderOrderStatus(status)}
          </VStack>

          <VStack py={4} justifyContent="center" space={2}>
            <HStack justifyContent="space-between" alignItems="center">
              <Heading size="sm" ml="-1">
                #{id} {pinCode && `- Pin Code: ${pinCode}`}
              </Heading>
            </HStack>

            {deliverySupported && (
              <HStack alignItems="center">
                <Icon as={<Feather name={'truck'} />} mr="1" color="blue.500" />

                <HStack alignItems="center">
                  <Heading size="xs" color="blue.500" mr="2" fontStyle="italic">
                    Hỗ trợ giao hàng
                  </Heading>
                </HStack>
              </HStack>
            )}

            <HStack alignItems="center">
              <Icon as={<Feather name={'tag'} />} mr="1" />

              <HStack alignItems="center">
                <Heading size="xs" color="gray.500" mr="2">
                  Loại dịch vụ:
                </Heading>
                <Text>{mapOrderType(type)}</Text>
              </HStack>
            </HStack>

            <HStack alignItems="center">
              <Icon as={<Feather name={'grid'} />} mr="1" />

              <HStack alignItems="center">
                <Heading size="xs" color="gray.500" mr="2">
                  Locker:
                </Heading>
                <Text isTruncated>{locker?.name}</Text>
              </HStack>
            </HStack>

            {createdAt && (
              <HStack alignItems="center">
                <Icon as={<Feather name={'calendar'} />} mr="1" />

                <HStack alignItems="center">
                  <Heading size="xs" color="gray.500" mr="2">
                    Ngày tạo:
                  </Heading>
                  <Text>{dayjs(createdAt).format(DATE_TIME_FORMAT)}</Text>
                </HStack>
              </HStack>
            )}

            <HStack alignItems="center">
              <Icon as={<Feather name={'credit-card'} />} mr="1" />

              <HStack alignItems="center">
                <Heading size="xs" color="gray.500" mr="2">
                  Tổng tiền:
                </Heading>
                <Heading size="xs">{formatDecimal(totalPrice)} VND</Heading>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default OrderItem;
