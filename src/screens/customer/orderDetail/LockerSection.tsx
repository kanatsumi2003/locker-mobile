import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {VStack} from 'native-base';
import React from 'react';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import LockerCard from '../../../features/locker/LockerCard';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {ILockerItem} from '../../../types/locker/locker';

interface Props {
  data?: ILockerItem;
}

const LockerSection: React.FC<Props> = ({data}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <VStack space={4}>
      <CustomSectionTitle text="Locker" />
      <LockerCard
        {...data}
        handlePress={() =>
          navigation.navigate('CustomerOrderDetail', {id: data?.id})
        }
      />
    </VStack>
  );
};

export default LockerSection;
