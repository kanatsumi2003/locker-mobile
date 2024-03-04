import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import {Box, Text, VStack} from 'native-base';
import React from 'react';
import CustomButton from '../../../components/CustomButton';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';

const OrderSuccess = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeStackParamList, 'StaffOrderSuccess'>
    >();

  const handlePress = () => {
    navigation.navigate('StaffOrders');
  };

  return (
    <Layout>
      <VStack flex={1} h="full" alignItems="center">
        <Box>
          <LottieView
            style={{
              height: 200,
            }}
            source={require('../../../assets/payment-success.json')}
            autoPlay
          />
          <Text fontSize={20} marginBottom={16}>
            Thực hiện giao dịch thành công
          </Text>
          <CustomButton onPress={handlePress}>Trở lại đơn hàng</CustomButton>
        </Box>
      </VStack>
    </Layout>
  );
};

export default OrderSuccess;
