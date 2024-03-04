import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HStack, Icon, IconButton, Text, VStack} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import OrderCard from '../../../features/order/OrderCard';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {useOrderQuery} from '../../../services/orderService';
import {selectUserInfo, setOpenModal} from '../../../stores/global.store';
import {ROLE} from '../../../types/auth/profile';
import {
  IOrderDetailItem,
  ORDER_STATUS,
  ORDER_TYPE,
} from '../../../types/order/order';
import LockerSection from './LockerSection';
import TimelineSection from './TimelineSection';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import CustomSkeletonCard from '../../../components/skeleton/CustomSkeletonCard';
import CustomSkeletonItem from '../../../components/skeleton/CustomSkeletonItem';
import CustomBadge from '../../../components/CustomBadge';

interface Props extends IOrderDetailItem {
  excludedIds: number[];
  isLoading: boolean;
}

const OrderDetailSection: React.FC<Partial<Props>> = ({
  excludedIds,
  isLoading,
  ...data
}) => {
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffOrderDetail'>>();
  const userInfo = useSelector(selectUserInfo);

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const dispatch = useDispatch();

  const handleAddService = () => {
    dispatch(
      setOpenModal({
        type: 'addService',
        data: {lockerId: data?.locker?.id, orderId: route.params!.id},
        params: excludedIds,
      }),
    );
  };

  const isOrderProcessingVerified = data?.updatedInfo;

  return (
    <VStack space={4}>
      <CustomSectionTitle text="Đơn hàng" />
      {isLoading ? (
        <>
          {/*Skeleton for order section*/}
          <CustomSkeletonCard />
          {/*Skeleton for locker section*/}
          <CustomSkeletonCard />
          <CustomSkeletonItem />
        </>
      ) : (
        <>
          <OrderCard
            {...data}
            handlePress={() =>
              navigation.navigate('StaffOrderDetail', {id: data?.id})
            }
          />
          <LockerSection data={data?.locker} />

          <TimelineSection data={data?.timelines} />
        </>
      )}

      {data?.type === ORDER_TYPE.LAUNDRY && (
        <HStack alignItems="center" space={2} mb={4}>
          <HStack w="full" justifyContent="space-between" alignItems="center">
            <HStack space={2} alignItems="center">
              <Text fontSize={'md'} fontWeight={'semibold'}>
                Dịch vụ ({data.details?.length})
              </Text>
              {(data?.status === ORDER_STATUS.PROCESSING ||
                data?.status === ORDER_STATUS.COLLECTED) &&
                userInfo?.role === ROLE.LAUNDRY_ATTENDANT && (
                  <IconButton
                    onPress={handleAddService}
                    size="sm"
                    colorScheme="blue"
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

            {userInfo?.role === ROLE.LAUNDRY_ATTENDANT &&
              (isOrderProcessingVerified ? (
                <CustomBadge colorScheme="success" text="Đã cập nhật" />
              ) : (
                <CustomBadge colorScheme="danger" text="Chưa cập nhật" />
              ))}
          </HStack>
        </HStack>
      )}
    </VStack>
  );
};

export default React.memo(OrderDetailSection);
