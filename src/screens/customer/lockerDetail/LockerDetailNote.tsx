import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FormControl, VStack} from 'native-base';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import CustomTextArea from '../../../components/CustomTextArea';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {setCreateOrderRequest} from '../../../stores/order.store';
import {ICreateOrderRequest} from '../../../types/order/order';

const LockerDetailNote = () => {
  const route = useRoute<RouteProp<HomeStackParamList>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const dispatch = useDispatch();

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ICreateOrderRequest>();

  const onSubmit: SubmitHandler<ICreateOrderRequest> = data => {
    dispatch(setCreateOrderRequest(data));
    navigation.navigate('CustomerLockerDetailConfirmCreate', {
      id: route?.params?.id,
    });
  };

  return (
    <Layout>
      <VStack space={4}>
        <CustomSectionTitle text="Ghi chú" />

        <FormControl isInvalid={'customerNote' in errors}>
          <CustomTextArea control={control} name="customerNote" />
        </FormControl>

        <CustomButton onPress={handleSubmit(onSubmit)}>Tiếp theo</CustomButton>
      </VStack>
    </Layout>
  );
};

export default LockerDetailNote;
