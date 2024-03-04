import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  AspectRatio,
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useMemo} from 'react';
import {ListRenderItemInfo, RefreshControl} from 'react-native';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {HomeStackParamList} from '../../navigation/staff/TabNavigationStaff';
import OrderDetailSection from '../../screens/staff/orderDetail/OrderDetailSection';
import {useOrderQuery} from '../../services/orderService';
import {selectUserInfo, setOpenModal} from '../../stores/global.store';
import {ROLE} from '../../types/auth/profile';
import {IDetailItem, ORDER_STATUS, OrderType} from '../../types/order/order';
import {formatDecimal} from '../../utils/formatDecimal';
import CustomerOrderNoteDetailSection from '../order/CustomerOrderNoteDetailSection';
import OrderNoteDetailSection from '../order/OrderNoteDetailSection';
import OrderNoteSection from '../order/OrderNoteSection';
import ButtonAction from '../order/buttonAction/ButtonAction';
import Empty from '../../components/Empty';

const ServiceSwipeList = () => {
  const userInfo = useSelector(selectUserInfo);
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffOrderDetail'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const dispatch = useDispatch();

  // QUERY
  const {data, isFetching, isLoading, refetch} = useOrderQuery(
    {id: Number(route.params!.id)},
    {skip: !route.params?.id || isNaN(route.params?.id)},
  );

  const closeRow = (rowMap: RowMap<IDetailItem>, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log('This row opened', rowKey);
  };

  const onRefresh = () => {
    refetch();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  const allowAddDetail =
    (data?.status === ORDER_STATUS.COLLECTED ||
      data?.status === ORDER_STATUS.PROCESSING) &&
    userInfo?.role === ROLE.LAUNDRY_ATTENDANT;

  const allowAddNote =
    (data?.status === ORDER_STATUS.COLLECTED ||
      data?.status === ORDER_STATUS.PROCESSING) &&
    userInfo?.role === ROLE.LAUNDRY_ATTENDANT;

  const allowCancelOrder =
    data?.status === ORDER_STATUS.RESERVED && userInfo?.role === ROLE.CUSTOMER;

  const handlePress = (item: IDetailItem) => {
    // ADD ORDER ID AND SERVICE DETAIL TO ROUTER PARAMS WHEN NAVIGATE TO ADD DETAIL ITEM
    navigation.navigate('StaffServiceDetail', {
      id: data?.id,
      detail: item,
      detailId: item?.id,
      allowAddDetail,
    });
  };

  const renderItem = ({item, index}: {item: IDetailItem; index: number}) => (
    <Box
      w="full"
      rounded="sm"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}
      mt={2}
      mb={2}
      borderRadius="lg">
      <Pressable
        onPress={() => handlePress(item)}
        _dark={{
          bg: 'coolGray.800',
        }}
        _light={{
          bg: 'white',
        }}>
        <Box>
          <HStack alignItems="center" space={3}>
            <AspectRatio w="24" ratio={4 / 3}>
              <Image
                resizeMode="cover"
                source={{
                  uri: item.service.image,
                }}
                alt="image"
                w="full"
                h="full"
              />
            </AspectRatio>
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                bold>
                {item.service.name}
              </Text>

              <HStack space={1}>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  Giá cả:
                </Text>
                <Text>
                  {formatDecimal(item.price)} VND / {item.service.unit}
                </Text>
              </HStack>

              <HStack space={1}>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  Số lượng:
                </Text>
                <Text>{item.quantity}</Text>
              </HStack>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const handleEditService = (
    detailId: number,
    quantity: number,
    rowMap: RowMap<IDetailItem>,
  ) => {
    dispatch(
      setOpenModal({
        type: 'editServiceQuantity',
        data: {detailId, orderId: route.params!.id, quantity},
      }),
    );
    closeRow(rowMap, detailId.toString());
  };

  const handleDeleteService = (
    detailId: number,
    rowMap: RowMap<IDetailItem>,
  ) => {
    dispatch(
      setOpenModal({
        type: 'deleteService',
        data: {detailId, orderId: route.params!.id},
      }),
    );
    closeRow(rowMap, detailId.toString());
  };

  const renderHiddenItem = (
    data: ListRenderItemInfo<IDetailItem>,
    rowMap: RowMap<IDetailItem>,
  ) => (
    <HStack flex="1" pl="2" my={2} rounded="lg" overflow="hidden">
      <Pressable
        w="70"
        ml="auto"
        bg="info.400"
        justifyContent="center"
        onPress={() =>
          handleEditService(data.item.id, data.item.quantity, rowMap)
        }
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon
            as={<MaterialCommunityIcons name="pencil-outline" />}
            size="xs"
            color="white"
          />
          <Text fontSize="xs" fontWeight="medium" color="white">
            Sửa
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        bg="red.500"
        justifyContent="center"
        onPress={() => handleDeleteService(data.item.id, rowMap)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon
            as={<MaterialCommunityIcons name="delete" />}
            color="white"
            size="xs"
          />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Xoá
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  const renderListFooterComponent = () => {
    if (!data?.status) {
      return null;
    }

    if (data.status === ORDER_STATUS.PROCESSED && !data?.deliverySupported) {
      return null;
    }

    if (data.status === ORDER_STATUS.RETURNED && !data?.deliverySupported) {
      return null;
    }

    return (
      <>
        {/* View staff note */}
        {data?.staffNote && (
          <OrderNoteDetailSection staffNote={data.staffNote} />
        )}

        {/* View customer note */}
        {data?.customerNote && (
          <CustomerOrderNoteDetailSection description={data.customerNote} />
        )}

        {/* Allow staff to add note */}
        {allowAddNote && <OrderNoteSection />}

        {/* Allow customer to cancel order */}
        {allowCancelOrder && (
          <ButtonAction status={orderStatusMapper(data?.status)} />
        )}

        {userInfo?.role === ROLE.LAUNDRY_ATTENDANT && !allowCancelOrder && (
          <>
            {data?.updatedInfo ? (
              <ButtonAction status={orderStatusMapper(data?.status)} />
            ) : (
              <Text mt="2" fontStyle="italic">
                Bạn cần cập nhật số lượng các dịch vụ trước khi tiếp tục
              </Text>
            )}
          </>
        )}
      </>
    );
  };

  const orderStatusMapper = (status: ORDER_STATUS): OrderType => {
    switch (status) {
      case ORDER_STATUS.COLLECTED:
      case ORDER_STATUS.PROCESSING:
        return ORDER_STATUS.PROCESSING;
      case ORDER_STATUS.PROCESSED:
        return ORDER_STATUS.PROCESSED;
      case ORDER_STATUS.RETURNED:
        return ORDER_STATUS.RETURNED;
      case ORDER_STATUS.RESERVED:
        return ORDER_STATUS.RESERVED;
      case ORDER_STATUS.OVERTIME_PROCESSING:
        return ORDER_STATUS.OVERTIME_PROCESSING;
      default:
        return undefined;
    }
  };

  const excludedIds = useMemo(() => {
    return data?.details?.map(item => item.service.id);
  }, [data]);

  if (!data) {
    return <Empty text="Không tìm thấy đơn hàng" />;
  }

  return (
    <>
      <SwipeListView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        data={data?.details}
        renderItem={renderItem}
        {...(allowAddDetail && {
          renderHiddenItem: renderHiddenItem,
          rightOpenValue: -130,
          previewOpenValue: -40,
          previewOpenDelay: 3000,
          onRowDidOpen: onRowDidOpen,
        })}
        removeClippedSubviews={false}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <OrderDetailSection {...data} excludedIds={excludedIds} />
        }
        ListFooterComponent={renderListFooterComponent}
      />
    </>
  );
};

export default ServiceSwipeList;
