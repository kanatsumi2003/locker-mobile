import {RouteProp, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setOpenModal} from '../../../stores/global.store';
import CustomButton from '../../../components/CustomButton';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';

const ButtonCheckout = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffOrderDetail'>>();

  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(
      setOpenModal({
        type: 'confirmCheckout',
        data: route,
      }),
    );
  };

  return (
    <CustomButton flex={1} mt={3} colorScheme="blue" onPress={handleCheckout}>
      Thanh toán
    </CustomButton>
  );
};

export default ButtonCheckout;
