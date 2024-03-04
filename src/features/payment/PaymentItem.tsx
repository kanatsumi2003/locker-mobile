import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import {
  Box,
  HStack,
  Heading,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from 'native-base';
import React from 'react';
import {FULL_TIME_FORMAT} from '../../constants/common';
import {HomeStackParamList} from '../../navigation/customer/TabNavigationCustomer';
import {IPaymentItem} from '../../types/bill/bill';
import {badgeRenderPaymentStatus} from '../../utils/badgeRender';
import {formatDecimal} from '../../utils/formatDecimal';
import {
  paymentImageRender,
  paymentStatusColorRender,
} from '../../utils/paymentRender';
import {mapPaymentType} from '../../utils/textMapper';

interface Props extends Partial<IPaymentItem> {}

const PaymentItem: React.FC<Props> = ({
  method,
  amount,
  content,
  status,
  createdAt,
  id,
  type,
}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeStackParamList, 'CustomerPayments'>
    >();

  const handlePress = () => {
    navigation.navigate('CustomerPaymentDetail', {id});
  };

  return (
    <Pressable onPress={handlePress}>
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor={paymentStatusColorRender(status)}
        borderWidth="1"
        mb="2">
        <HStack alignItems="center">
          <View h="full" w="0.5" bg={paymentStatusColorRender(status)} />
          <HStack space={4} alignItems="center" p="4">
            <Image
              w={8}
              h={8}
              resizeMode="cover"
              source={paymentImageRender(method)}
            />

            <VStack flex={1}>
              <HStack justifyContent="space-between">
                <Heading size="sm" fontSize="md" maxW="150" isTruncated>
                  {content}
                </Heading>
                {badgeRenderPaymentStatus(status)}
              </HStack>

              <Text fontSize="xs" color="gray.500">
                {dayjs(createdAt).format(FULL_TIME_FORMAT)}
              </Text>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="xs" color="gray.500">
                  Loại giao dịch: {mapPaymentType(type)}
                </Text>
                <Text fontWeight="semibold">
                  {amount >= 0
                    ? `+${formatDecimal(amount)}`
                    : `${formatDecimal(amount)}`}{' '}
                  VND
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default PaymentItem;
