import React, {useEffect} from 'react';
import {Pressable, HStack, Image, Text, View} from 'native-base';
import {useSelector} from 'react-redux';
import {selectUserInfo} from '../../stores/global.store';
import {formatDecimal} from '../../utils/formatDecimal';
import {CURRENCY_UNIT, DATE_TIME_FORMAT} from '../../constants/common';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCustomerProfileQuery} from '../../services/authService';
import {HomeStackParamList} from '../../navigation/customer/TabNavigationCustomer';
import dayjs from 'dayjs';

interface Props {
  handlePress?: () => void;
}

const BalanceCard: React.FC<Props> = ({handlePress}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {refetch} = useCustomerProfileQuery(undefined);

  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  return (
    <Pressable onPress={handlePress}>
      <HStack
        bg="blue.500"
        alignItems="center"
        rounded="lg"
        p="4"
        shadow="4"
        space="4">
        <View h="12" p="2" bg="white" rounded="lg">
          <Image
            source={require('../../assets/wallet.png')}
            maxH="8"
            maxW="8"
          />
        </View>
        <View>
          <Text fontSize="sm" color="white">
            {userInfo?.fullName || userInfo?.phoneNumber}
          </Text>
          <Text fontSize="md" color="white">
            Số dư: {formatDecimal(userInfo?.wallet?.balance || '0')}{' '}
            {CURRENCY_UNIT.VI}
          </Text>
          {userInfo?.wallet?.lastDepositAt && (
            <Text color="white">
              Nạp tiền lần cuối:{' '}
              {dayjs(userInfo?.wallet?.lastDepositAt).format(DATE_TIME_FORMAT)}
            </Text>
          )}
        </View>
      </HStack>
    </Pressable>
  );
};

export default BalanceCard;
