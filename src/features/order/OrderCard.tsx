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
import {IOrderItem} from '../../types/order/order';

import CustomButton from '../../components/CustomButton';
import {badgeRenderOrderStatus} from '../../utils/badgeRender';
import {callNumber} from '../../utils/dialPhoneCall';
import {formatDecimal} from '../../utils/formatDecimal';
import {
  orderStatusColorRender,
  orderTypeImageRender,
} from '../../utils/orderRender';
import {mapOrderType} from '../../utils/textMapper';
import {useSelector} from 'react-redux';
import {selectUserInfo} from '../../stores/global.store';
import {ROLE} from '../../types/auth/profile';

interface Props extends IOrderItem {
  handlePress: () => void;
  maxW?: number;
}

const OrderCard: React.FC<Partial<Props>> = ({
  id,
  status,
  sender,
  receiver,
  totalPrice,
  sendBox,
  receiveBox,
  shippingFee,
  type,
  pinCode,
  maxW = 'full',
  locker,
  deliverySupported,
  deliveryAddress,
  reservationFee,
  handlePress,
}) => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <Pressable alignItems="center" onPress={handlePress}>
      <Box alignItems="center">
        <Box
          w="full"
          borderColor={orderStatusColorRender(status)}
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
              <HStack
                justifyContent="space-between"
                alignItems="center"
                flex="1">
                <Heading size="sm" ml="-1">
                  #{id} {pinCode && `- Pin Code: ${pinCode}`}
                </Heading>

                {badgeRenderOrderStatus(status)}
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

              {sender && (
                <HStack alignItems="flex-start">
                  <Icon as={<Feather name={'user'} />} mr="1" />

                  <HStack alignItems="center">
                    <Heading size="xs" color="gray.500" mr="2">
                      Người gửi:
                    </Heading>
                    <Text>
                      {sender?.fullName || sender?.username
                        ? (sender?.fullName || sender?.username) +
                          ' - ' +
                          sender?.phoneNumber
                        : sender?.phoneNumber}
                    </Text>
                  </HStack>
                </HStack>
              )}

              {receiver && (
                <HStack alignItems="flex-start">
                  <Icon as={<Feather name={'user'} />} mr="1" />

                  <HStack alignItems="center">
                    <Heading size="xs" color="gray.500" mr="2">
                      Người nhận:
                    </Heading>
                    <Text>
                      {receiver?.fullName || receiver?.username
                        ? (receiver?.fullName || receiver?.username) +
                          ' - ' +
                          receiver?.phoneNumber
                        : receiver?.phoneNumber}
                    </Text>
                  </HStack>
                </HStack>
              )}

              {sendBox && (
                <HStack alignItems="center">
                  <Icon as={<Feather name={'lock'} />} mr="1" />

                  <HStack alignItems="center">
                    <Heading size="xs" color="gray.500" mr="2">
                      Tủ gửi:
                    </Heading>
                    <Text>#{sendBox?.number}</Text>
                  </HStack>
                </HStack>
              )}

              {receiveBox?.number && (
                <HStack alignItems="center">
                  <Icon as={<Feather name={'lock'} />} mr="1" />

                  <HStack alignItems="center">
                    <Heading size="xs" color="gray.500" mr="2">
                      Tủ nhận:
                    </Heading>
                    <Text>#{receiveBox?.number}</Text>
                  </HStack>
                </HStack>
              )}

              {deliverySupported && deliveryAddress && (
                <>
                  <HStack alignItems="center">
                    <Icon as={<Feather name={'truck'} />} mr="1" />

                    <Heading size="xs" color="gray.500" mr="2">
                      Địa chỉ giao hàng:
                    </Heading>
                  </HStack>
                  <Text flex="1">
                    {[
                      deliveryAddress?.province?.name,
                      deliveryAddress?.district?.name,
                      deliveryAddress?.ward?.name,
                      deliveryAddress?.address,
                    ]
                      ?.filter(item => item)
                      ?.join(', ')}
                  </Text>
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

              {shippingFee !== null && (
                <HStack alignItems="center">
                  <Icon as={<Feather name={'truck'} />} mr="1" />

                  <HStack alignItems="center">
                    <Heading size="xs" color="gray.500" mr="2">
                      Phí giao hàng:
                    </Heading>
                    <Heading size="xs">
                      {formatDecimal(shippingFee)} VND
                    </Heading>
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
            </Stack>
            {userInfo?.role === ROLE.CUSTOMER &&
              locker?.store?.contactPhone && (
                <CustomButton
                  onPress={() => callNumber(locker?.store?.contactPhone)}
                  borderRadius="lg"
                  variant={'solid'}>
                  <HStack alignItems="center" space={2}>
                    <Icon
                      color="white"
                      as={<Feather name="phone" />}
                      size="sm"
                    />
                    <Text color="white">Liên hệ với cửa hàng</Text>
                  </HStack>
                </CustomButton>
              )}

            {userInfo?.role === ROLE.LAUNDRY_ATTENDANT && (
              <>
                {receiver?.phoneNumber ? (
                  <CustomButton
                    onPress={() => callNumber(receiver?.phoneNumber)}
                    borderRadius="lg"
                    variant={'solid'}>
                    <HStack alignItems="center" space={2}>
                      <Icon
                        color="white"
                        as={<Feather name="phone" />}
                        size="sm"
                      />
                      <Text color="white">Liên hệ với người nhận</Text>
                    </HStack>
                  </CustomButton>
                ) : (
                  <>
                    {sender?.phoneNumber && (
                      <CustomButton
                        onPress={() => callNumber(sender?.phoneNumber)}
                        borderRadius="lg"
                        variant={'solid'}>
                        <HStack alignItems="center" space={2}>
                          <Icon
                            color="white"
                            as={<Feather name="phone" />}
                            size="sm"
                          />
                          <Text color="white">Liên hệ với người gửi</Text>
                        </HStack>
                      </CustomButton>
                    )}
                  </>
                )}
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </Pressable>
  );
};

export default OrderCard;
