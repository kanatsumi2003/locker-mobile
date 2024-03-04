import React, {useEffect} from 'react';
import {
  AspectRatio,
  Box,
  FlatList,
  HStack,
  Image,
  Pressable,
  Spacer,
  Text,
  useToast,
  VStack,
} from 'native-base';
import {useSelector} from 'react-redux';
import {selectCreateOrderRequest} from '../../../stores/order.store';
import {IAddOrderDetailItem} from '../../../types/order/order';
import {formatDecimal} from '../../../utils/formatDecimal';
import Layout from '../../../layout/MainScreenLayout/Layout';
import OrderDetailConfirmSection from './OrderDetailConfirmSection';
import CustomerOrderNoteDetailSection from '../../../features/order/CustomerOrderNoteDetailSection';
import CustomButton from '../../../components/CustomButton';
import {useCreateOrderMutation} from '../../../services/orderService';
import CustomSpinner from '../../../components/CustomSpinner';
import CustomToast from '../../../components/CustomToast';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';

const LockerDetailConfirmCreate = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const createOrderRequest = useSelector(selectCreateOrderRequest);

  // MUTATION
  const [
    createOrder,
    {
      isSuccess,
      isError,
      error,
      data: dataOrderCreated,
      isLoading: isLoadingCreateOrder,
    },
  ] = useCreateOrderMutation();

  // HOOKS
  const toast = useToast();

  const handleCreateOrder = () => {
    createOrderRequest &&
      createOrder({
        ...createOrderRequest,
        lockerId: Number(createOrderRequest?.locker?.id),
      });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thành công!"
            description="Tạo đơn hàng thành công"
            status="success"
          />
        ),
      });
      navigation.popToTop();
      navigation.navigate('CustomerOrderDetail', {id: dataOrderCreated?.id});
    }

    if (isError) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={error?.message || 'Tạo đơn hàng thất bại'}
            status="error"
          />
        ),
      });
    }
  }, [isSuccess, isError]);

  const renderItem = ({
    item,
    index,
  }: {
    item: IAddOrderDetailItem;
    index?: number;
  }) => (
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
        // onPress={() => handlePress(item)}
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
                  uri: item?.image,
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
                {item?.name}
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
                  {formatDecimal(item?.price)} VND / {item?.unit}
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
                <Text>{item?.quantity}</Text>
              </HStack>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderListFooterComponent = () => (
    <>
      <CustomerOrderNoteDetailSection
        description={createOrderRequest?.customerNote}
      />
      <CustomButton onPress={handleCreateOrder}>
        <Text color="white">
          Xác nhận đặt chỗ (-{formatDecimal(createOrderRequest?.reservationFee)}{' '}
          VND)
        </Text>
      </CustomButton>
    </>
  );

  return (
    <Layout>
      <FlatList
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        data={createOrderRequest?.details || []}
        renderItem={renderItem}
        keyExtractor={item => item?.serviceId?.toString()}
        ListHeaderComponent={
          <OrderDetailConfirmSection {...createOrderRequest} />
        }
        ListFooterComponent={renderListFooterComponent}
      />
      {isLoadingCreateOrder && <CustomSpinner visible={isLoadingCreateOrder} />}
    </Layout>
  );
};

export default LockerDetailConfirmCreate;
