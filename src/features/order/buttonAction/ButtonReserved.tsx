import {View, Text} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {setOpenModal} from '../../../stores/global.store';
import CustomButton from '../../../components/CustomButton';
import {RouteProp, useRoute} from '@react-navigation/native';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';

const ButtonReserved = () => {
  const route = useRoute<RouteProp<HomeStackParamList>>();
  const dispatch = useDispatch();

  const handleCancelOrder = () => {
    dispatch(
      setOpenModal({
        type: 'confirmReserved',
        data: route,
      }),
    );
  };

  return (
    <CustomButton colorScheme="danger" onPress={handleCancelOrder}>
      Huỷ đơn hàng
    </CustomButton>
  );
};

export default ButtonReserved;
