import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HStack, Icon, Skeleton, VStack} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import CustomIconButton from '../../../components/CustomIconButton';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import OrderCard from '../../../features/order/OrderCard';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {useOrderQuery} from '../../../services/orderService';
import {setOpenModal} from '../../../stores/global.store';
import {ORDER_STATUS} from '../../../types/order/order';
import LockerSection from './LockerSection';
import CustomSkeletonCard from '../../../components/skeleton/CustomSkeletonCard';

interface Props {
  excludedIds: number[];
}

const OrderDetailSection: React.FC<Partial<Props>> = ({excludedIds}) => {
  const route =
    useRoute<RouteProp<HomeStackParamList, 'CustomerOrderDetail'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const dispatch = useDispatch();

  const {data, isFetching, isLoading} = useOrderQuery(
    {id: Number(route.params!.id)},
    {skip: !route.params?.id},
  );

  const handleAddService = () => {
    dispatch(
      setOpenModal({
        type: 'addService',
        data: data?.locker?.id,
        params: excludedIds,
      }),
    );
  };

  return (
    <VStack space={4}>
      <CustomSectionTitle text="Đơn hàng" />
      {isLoading ? (
        <CustomSkeletonCard />
      ) : (
        <OrderCard
          {...data}
          handlePress={() =>
            navigation.navigate('CustomerOrderDetail', {id: data?.id})
          }
        />
      )}

      <LockerSection data={data?.locker} />

      <HStack alignItems="center" space={2} mb="4">
        <CustomSectionTitle text="Chi tiết" />
        {(data?.status === ORDER_STATUS.PROCESSING ||
          data?.status === ORDER_STATUS.COLLECTED) && (
          <CustomIconButton
            onPress={handleAddService}
            size="sm"
            variant="solid"
            icon={
              <Icon
                as={<MaterialCommunityIcons name="tag-plus-outline" />}
                color="white"
              />
            }
          />
        )}
      </HStack>
    </VStack>
  );
};

export default React.memo(OrderDetailSection);
