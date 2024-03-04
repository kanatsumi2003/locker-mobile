import React from 'react';
import {useDispatch} from 'react-redux';
import {setOpenModal} from '../../../stores/global.store';
import CustomButton from '../../../components/CustomButton';
import {RouteProp, useRoute} from '@react-navigation/native';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';

const ButtonReturn = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffOrderDetail'>>();
  const dispatch = useDispatch();

  const handleReturnOrder = () => {
    dispatch(
      setOpenModal({
        type: 'confirmReturn',
        data: route,
      }),
    );
  };

  return (
    <CustomButton colorScheme="blue" onPress={handleReturnOrder}>
      Xác nhận đã giao
    </CustomButton>
  );
};

export default ButtonReturn;
