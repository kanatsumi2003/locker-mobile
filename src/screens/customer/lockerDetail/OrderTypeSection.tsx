import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FormControl, HStack, Radio, Text, VStack} from 'native-base';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import CustomRadio from '../../../components/CustomRadio';
import OrderTypeView from '../../../features/orderType/OrderTypeView';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {setCreateOrderRequest} from '../../../stores/order.store';
import {ICreateOrderRequest, ORDER_TYPE} from '../../../types/order/order';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import CustomButton from '../../../components/CustomButton';
import {ILockerItem} from '../../../types/locker/locker';

interface Props {
  orderTypes?: ORDER_TYPE[];
  locker?: Partial<ILockerItem>;
}

const OrderTypeSection: React.FC<Props> = ({orderTypes, locker}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList>>();

  const dispatch = useDispatch();

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ICreateOrderRequest>();

  const onSubmit: SubmitHandler<ICreateOrderRequest> = data => {
    dispatch(setCreateOrderRequest({...data, locker}));
    data.type === ORDER_TYPE.LAUNDRY
      ? navigation.navigate('CustomerLockerDetailServices', {
          id: route?.params?.id,
        })
      : navigation.navigate('CustomerLockerDetailReceiver', {
          id: route.params?.id,
        });
  };

  return (
    <VStack space="4">
      <CustomSectionTitle text="Loại đơn hàng" />

      <FormControl w="full" isRequired isInvalid={'type' in errors}>
        <CustomRadio
          control={control}
          name="type"
          w="full"
          rules={{required: 'Chọn loại dịch vụ để tiếp tục'}}>
          <HStack justifyContent="space-evenly" w="full">
            <VStack alignItems="center" space={3}>
              <OrderTypeView type="Laundry" />
              {!orderTypes?.includes(ORDER_TYPE.LAUNDRY) ? (
                <Text color="rose.500">Không hỗ trợ</Text>
              ) : (
                <Radio aria-label="Laundry" value={ORDER_TYPE.LAUNDRY} />
              )}
            </VStack>

            <VStack alignItems="center" space={3}>
              <OrderTypeView type="Storage" />
              {!orderTypes?.includes(ORDER_TYPE.STORAGE) ? (
                <Text color="rose.500">Không hỗ trợ</Text>
              ) : (
                <Radio aria-label="Storage" value={ORDER_TYPE.STORAGE} />
              )}
            </VStack>
          </HStack>
        </CustomRadio>
      </FormControl>

      {(orderTypes?.includes(ORDER_TYPE.LAUNDRY) ||
        orderTypes?.includes(ORDER_TYPE.STORAGE)) && (
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          mt="2"
          isDisabled={locker?.availableBoxCount === 0}>
          Tiếp theo
        </CustomButton>
      )}
    </VStack>
  );
};

export default OrderTypeSection;
