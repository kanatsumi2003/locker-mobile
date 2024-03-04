import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text, VStack} from 'native-base';
import React from 'react';
import LockerCard from '../../../features/locker/LockerCard';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {ILockerItem} from '../../../types/locker/locker';
import CustomSectionTitle from '../../../components/CustomSectionTitle';

interface Props {
  data?: ILockerItem;
}

const LockerSection: React.FC<Props> = ({data}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <VStack space={4} mb="4">
      <CustomSectionTitle text="Locker" />
      <LockerCard
        {...data}
        handlePress={() =>
          navigation.navigate('StaffLockerDetail', {id: data?.id})
        }
      />
    </VStack>
  );
};

export default LockerSection;
