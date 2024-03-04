import {Button} from 'native-base';
import React from 'react';
import {useDispatch} from 'react-redux';
import {setOpenModal} from '../../../stores/global.store';
import CustomButton from '../../../components/CustomButton';
import {RouteProp, useRoute} from '@react-navigation/native';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';

const ButtonProcess = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffOrderDetail'>>();
  const dispatch = useDispatch();

  const handleProcessOrder = () => {
    dispatch(
      setOpenModal({
        type: 'confirmProcessed',
        data: route,
      }),
    );
  };

  return (
    <CustomButton colorScheme="blue" onPress={handleProcessOrder}>
      Đã xử lý
    </CustomButton>
  );
};

export default ButtonProcess;
