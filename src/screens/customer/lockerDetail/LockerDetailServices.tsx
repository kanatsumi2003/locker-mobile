import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Box, Checkbox, FlatList, FormControl, VStack} from 'native-base';
import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import CustomCheckbox from '../../../components/CustomCheckbox';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import CustomSpinner from '../../../components/CustomSpinner';
import Empty from '../../../components/Empty';
import ServiceItemCustomer from '../../../features/service/ServiceItemCustomer';
import {useOrderSelectedServices} from '../../../hooks/useOrderSelectedServices';
import {useTotalServicesPrice} from '../../../hooks/useTotalServicesPrice';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {useServicesQuery} from '../../../services/serviceService';
import {setCreateOrderRequest} from '../../../stores/order.store';
import {ICreateOrderRequest} from '../../../types/order/order';
import {SERVICE_STATUS} from '../../../types/service/service';

type AddServiceFormType = {
  services: string[];
};

const LockerDetailServices = () => {
  // STATE TO TRACKING SELETED SERVICES
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // STATE TO TRACKING QUANTITY OF EACH SERVICE
  const [quantityServiceMap, setQuantityServiceMap] = useState<
    Map<string, string>
  >(new Map());
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList>>();

  const dispatch = useDispatch();

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<AddServiceFormType>();

  // TODO: Check prices of services && infinite load
  // QUERY
  const {data, isFetching} = useServicesQuery(
    {
      lockerId: Number(route.params?.id),
      pageNumber: 1,
      pageSize: 10,
      status: SERVICE_STATUS.ACTIVE,
    },
    {
      skip: !route.params?.id,
    },
  );

  const onSubmit: SubmitHandler<AddServiceFormType> = data => {
    const details: Pick<ICreateOrderRequest, 'details'> = {
      details: selectedServicesDetails,
    };
    dispatch(
      setCreateOrderRequest({...details, totalPrice: tempTotalServicesPrice}),
    );
    navigation.navigate('CustomerLockerDetailDelivery', {
      id: route?.params?.id,
    });
  };

  const selectedServicesDetails = useOrderSelectedServices(
    selectedServices,
    quantityServiceMap,
    data?.items,
  );

  const tempTotalServicesPrice = useTotalServicesPrice(
    data?.items,
    selectedServicesDetails,
  );

  return (
    <>
      <Layout>
        <VStack space={4} position="relative" maxW="full">
          <CustomSectionTitle
            text="Dịch vụ"
            subText={`(Chi phí dịch vụ ước tính: ${tempTotalServicesPrice} VND)`}
          />

          {data?.items?.length ? (
            <>
              <FormControl maxW="full">
                <CustomCheckbox
                  onChange={(values: string[]) => {
                    Array.isArray(values) && setSelectedServices(values);
                  }}
                  control={control}
                  name="services">
                  <FlatList
                    w="full"
                    data={data?.items}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 160}}
                    renderItem={({item}) => (
                      <Checkbox value={item.id.toString()} mb="4">
                        <ServiceItemCustomer
                          {...item}
                          quantityServiceMap={quantityServiceMap}
                          setQuantityServiceMap={setQuantityServiceMap}
                        />
                      </Checkbox>
                    )}
                  />
                </CustomCheckbox>
              </FormControl>
              <Box
                rounded="lg"
                bg="white"
                shadow="1"
                w="full"
                position="absolute"
                bottom="16">
                <CustomButton
                  isDisabled={selectedServices.length === 0}
                  onPress={handleSubmit(onSubmit)}
                  w="full">
                  Tiếp theo
                </CustomButton>
              </Box>
            </>
          ) : (
            <Empty />
          )}
        </VStack>

        <CustomSpinner visible={isFetching} />
      </Layout>
    </>
  );
};

export default LockerDetailServices;
