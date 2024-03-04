import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useToast,
} from 'native-base';
import React, {useEffect} from 'react';
import QRCode from 'react-native-qrcode-svg';
import CustomButton from '../../../components/CustomButton';
import CustomToast from '../../../components/CustomToast';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {usePaymentQuery} from '../../../services/paymentService';
import {PAYMENT_STATUS} from '../../../types/bill/bill';
import {badgeRenderPaymentStatus} from '../../../utils/badgeRender';
import {formatDecimal} from '../../../utils/formatDecimal';
import {paymentImageRender} from '../../../utils/paymentRender';

const QR = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffOrderQrCode'>>();

  const toast = useToast();

  // QUERY
  const {data: dataPayment, isError} = usePaymentQuery(
    {id: Number(route.params?.id)},
    {
      skip: !route.params?.id,
      pollingInterval: 1000,
    },
  );

  useEffect(() => {
    if (dataPayment) {
      if (dataPayment?.status === PAYMENT_STATUS.COMPLETED) {
        // navigation.navigate('StaffOrderSuccess');
        toast.show({
          placement: 'top-left',
          render: () => (
            <CustomToast
              title="Thành công!"
              description={'Giao dịch thành công'}
              status="error"
            />
          ),
        });
      }

      if (!dataPayment || dataPayment?.status === PAYMENT_STATUS.FAILED) {
        toast.show({
          placement: 'top-left',
          render: () => (
            <CustomToast
              title="Thất bại!"
              description={'Giao dịch thất bại'}
              status="error"
            />
          ),
        });
      }
    }
  }, [dataPayment]);

  return (
    <Layout>
      {dataPayment?.qr ? (
        <Box
          w="full"
          borderColor="coolGray.200"
          borderWidth="1"
          rounded="lg"
          overflow="hidden">
          <VStack p="4" space={4}>
            <Center>
              <QRCode
                value={dataPayment?.qr}
                size={280}
                logo={paymentImageRender(dataPayment?.method)}
                logoBackgroundColor="transparent"
                logoSize={64}
              />
            </Center>
            <HStack alignItems="center" justifyContent="space-between">
              <Heading size="xs" color="gray.500" mr="2">
                Trạng thái:
              </Heading>

              {badgeRenderPaymentStatus(dataPayment?.status)}
            </HStack>

            <HStack alignItems="center" justifyContent="space-between">
              <Heading size="xs" color="gray.500" mr="2">
                Số tiền:
              </Heading>

              <Text>{formatDecimal(dataPayment?.amount)} VND</Text>
            </HStack>
          </VStack>
        </Box>
      ) : (
        <>
          {isError && (
            <>
              <Image
                maxH="56"
                w="full"
                source={require('../../../assets/error.jpg')}
                alt="image"
                resizeMode="contain"
              />
              <Text textAlign="center" color={'rose.500'} fontSize="xl">
                Có lỗi xảy ra
              </Text>
            </>
          )}
        </>
      )}
      <CustomButton
        position="relative"
        colorScheme="blue"
        onPress={() => navigation.goBack()}
        mt="4">
        Trở về
      </CustomButton>
    </Layout>
  );
};

export default QR;
