import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import {Box, Center, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../components/CustomButton';
import Layout from '../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../navigation/customer/TabNavigationCustomer';
import {usePaymentQuery} from '../../services/paymentService';
import {PAYMENT_STATUS} from '../../types/bill/bill';

const WalletPolling = () => {
  const [isPaymentEnd, setIsPaymentEnd] = useState(false);
  const route =
    useRoute<RouteProp<HomeStackParamList, 'CustomerWalletPolling'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // QUERY
  const {data: dataPayment} = usePaymentQuery(
    {id: Number(route.params?.id)},
    {
      skip: !route.params?.id || isPaymentEnd,
      pollingInterval: 1000,
    },
  );

  const handlePress = () => {
    setIsPaymentEnd(true);
    navigation.goBack();
  };

  useEffect(() => {
    if (dataPayment?.status === PAYMENT_STATUS.COMPLETED) {
      setIsPaymentEnd(true);
    }

    if (dataPayment?.status === PAYMENT_STATUS.FAILED) {
      setIsPaymentEnd(true);
    }
  }, [dataPayment]);

  return (
    <Layout>
      <VStack flex={1} h="full" alignItems="center">
        <Box>
          {!isPaymentEnd && (
            <>
              <LottieView
                style={{
                  height: 200,
                }}
                source={require('../../assets/loading-transaction.json')}
                autoPlay
              />

              <Center>
                <Text fontSize="14" textAlign="justify" marginBottom={4} mt="4">
                  Giao dịch đang được xử lý, vui lòng chờ trong giây lát
                </Text>
              </Center>
            </>
          )}

          {dataPayment?.status === PAYMENT_STATUS.COMPLETED && (
            <>
              <LottieView
                style={{
                  height: 200,
                }}
                source={require('../../assets/payment-success.json')}
                autoPlay
              />
              <Center>
                <Text fontSize="14" textAlign="justify" marginBottom={4} mt="4">
                  Thực hiện giao dịch thành công
                </Text>
              </Center>
            </>
          )}

          {dataPayment?.status === PAYMENT_STATUS.FAILED && (
            <>
              <LottieView
                style={{
                  height: 200,
                }}
                source={require('../../assets/failed-transaction.json')}
                autoPlay
              />
              <Center>
                <Text fontSize="14" textAlign="justify" marginBottom={4} mt="4">
                  Giao dịch thất bại, vui lòng thử lại sau
                </Text>
              </Center>
            </>
          )}

          {isPaymentEnd && (
            <CustomButton minW="full" onPress={handlePress}>
              Trở lại
            </CustomButton>
          )}
        </Box>
      </VStack>
    </Layout>
  );
};

export default WalletPolling;
