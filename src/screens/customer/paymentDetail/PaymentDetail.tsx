import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import {Box, HStack, Heading, Image, Stack, Text} from 'native-base';
import React, {useEffect} from 'react';
import CustomSpinner from '../../../components/CustomSpinner';
import {FULL_TIME_FORMAT} from '../../../constants/common';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {usePaymentQuery} from '../../../services/paymentService';
import {badgeRenderPaymentStatus} from '../../../utils/badgeRender';
import {formatDecimal} from '../../../utils/formatDecimal';
import {
  paymentImageRender,
  paymentStatusColorRender,
} from '../../../utils/paymentRender';
import {mapPaymentMethod, mapPaymentType} from '../../../utils/textMapper';

const PaymentDetail = () => {
  const route = useRoute<RouteProp<HomeStackParamList>>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeStackParamList, 'CustomerPaymentDetail'>
    >();

  // QUERY
  const {
    data: dataPayment,
    isFetching,
    refetch,
  } = usePaymentQuery({
    id: Number(route.params?.id),
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  return (
    <Layout>
      {isFetching ? (
        <CustomSpinner visible={isFetching} />
      ) : (
        <Box
          w="full"
          rounded="lg"
          overflow="hidden"
          borderColor={paymentStatusColorRender(dataPayment?.status)}
          borderWidth="1">
          <Stack p="4" space={4} bgColor={'white'}>
            <HStack alignItems="center" space="2">
              <Image
                w={12}
                h={12}
                resizeMode="cover"
                source={paymentImageRender(dataPayment?.method)}
              />

              <Heading size="md">
                Giao dịch {mapPaymentMethod(dataPayment?.method)}
              </Heading>
            </HStack>

            <HStack alignItems="center" justifyContent="space-between">
              <Heading size="xs" color="gray.500" mr="2">
                Trạng thái:
              </Heading>

              {badgeRenderPaymentStatus(dataPayment?.status)}
            </HStack>

            <HStack alignItems="center" justifyContent="space-between">
              <Heading size="xs" color="gray.500" mr="2">
                Loại giao dịch:
              </Heading>
              <Text>{mapPaymentType(dataPayment?.type)}</Text>
            </HStack>

            <HStack alignItems="center" justifyContent="space-between">
              <Heading size="xs" color="gray.500" mr="2">
                Thời gian:
              </Heading>

              <Text>
                {dayjs(dataPayment?.createdAt).format(FULL_TIME_FORMAT)}
              </Text>
            </HStack>

            <HStack alignItems="center" justifyContent="space-between">
              <Heading size="xs" color="gray.500" mr="2">
                Số tiền:
              </Heading>

              <Text fontWeight="semibold">
                {dataPayment?.amount >= 0
                  ? `+${formatDecimal(dataPayment?.amount)}`
                  : `${formatDecimal(dataPayment?.amount)}`}{' '}
                VND
              </Text>
            </HStack>

            <HStack alignItems="center" justifyContent="space-between">
              <Heading size="xs" color="gray.500" mr="2">
                Mã giao dịch:
              </Heading>

              <Text flex="0.8">{dataPayment?.referenceId}</Text>
            </HStack>

            <HStack alignItems="center" justifyContent="space-between">
              <Heading size="xs" color="gray.500" mr="2">
                Nội dung:
              </Heading>

              <Text>{dataPayment?.content}</Text>
            </HStack>
          </Stack>
        </Box>
      )}
    </Layout>
  );
};

export default PaymentDetail;
