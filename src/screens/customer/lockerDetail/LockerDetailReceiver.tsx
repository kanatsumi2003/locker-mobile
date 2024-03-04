import DateTimePicker from '@react-native-community/datetimepicker';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {Actionsheet, FormControl, HStack, Icon, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Platform} from 'react-native';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import CustomSpinner from '../../../components/CustomSpinner';
import {FULL_TIME_FORMAT, PHONE_NUMBER_REGEX} from '../../../constants/common';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {useSettingsQuery} from '../../../services/settingService';
import {selectUserInfo} from '../../../stores/global.store';
import {
  selectCreateOrderRequest,
  setCreateOrderRequest,
} from '../../../stores/order.store';
import {ICreateOrderRequest, ORDER_TYPE} from '../../../types/order/order';

dayjs.extend(utc);

const LockerDetailReceiver = () => {
  const [intendedReceiveAt, setIntendedReceiveAt] = useState<
    Date | undefined
  >();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const route = useRoute<RouteProp<HomeStackParamList>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const userInfo = useSelector(selectUserInfo);
  const orderRequest = useSelector(selectCreateOrderRequest);

  // QUERY
  const {data: dataSettings, isLoading, refetch} = useSettingsQuery({});

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
    trigger,
    resetField,
  } = useForm<ICreateOrderRequest>();

  const onSubmit: SubmitHandler<ICreateOrderRequest> = data => {
    dispatch(
      setCreateOrderRequest({
        ...data,
        ...(intendedReceiveAt && {
          intendedReceiveAt: dayjs(intendedReceiveAt),
        }),
        reservationFee: dataSettings?.orderSettings?.reservationFee,
        isReserving: true,
        senderPhone: userInfo?.phoneNumber || '',
      }),
    );
    navigation.navigate('CustomerLockerDetailNote', {id: route?.params?.id});
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    setValue(
      'intendedReceiveAt',
      dayjs(intendedReceiveAt).format(FULL_TIME_FORMAT),
    );
    trigger('intendedReceiveAt');
    onClose();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  return (
    <Layout>
      {isLoading && <CustomSpinner visible={isLoading} />}
      <VStack space={4}>
        <FormControl isInvalid={'receiverPhone' in errors}>
          <CustomInput
            rules={{
              pattern: {
                value: PHONE_NUMBER_REGEX,
                message: 'Định dạng số điện thoại không đúng',
              },
            }}
            control={control}
            label="Số điện thoại người nhận"
            name="receiverPhone"
            keyboardType="number-pad"
          />
        </FormControl>

        {orderRequest?.type === ORDER_TYPE.LAUNDRY && (
          <FormControl
            isInvalid={'intendedReceiveAt' in errors}
            onTouchEnd={(e: any) => {
              e.preventDefault();
              setOpen(true);
            }}>
            <CustomInput
              control={control}
              label="Thời gian nhận hàng dự kiến"
              name="intendedReceiveAt"
              rules={{
                required: false,
                validate: value =>
                  value === '' ||
                  value === null ||
                  value === undefined ||
                  dayjs()
                    .add(
                      Number(
                        dataSettings?.orderSettings
                          ?.minTimeProcessLaundryOrderInHours,
                      ),
                      'hours',
                    )
                    .isBefore(intendedReceiveAt) ||
                  `Thời gian tối thiểu để xử lý đơn hàng là ${dataSettings?.orderSettings?.minTimeProcessLaundryOrderInHours} tiếng`,
              }}
              {...(intendedReceiveAt && {
                InputRightElement: (
                  <Icon
                    onPress={() => {
                      resetField('intendedReceiveAt');
                      setIntendedReceiveAt(undefined);
                    }}
                    m="2"
                    ml="3"
                    size="4"
                    color="gray.400"
                    as={<MaterialCommunityIcons name="close" />}
                  />
                ),
              })}
            />
          </FormControl>
        )}

        {open && Platform.OS === 'ios' && (
          <Actionsheet isOpen={open} onClose={onClose}>
            <Actionsheet.Content>
              <VStack>
                <DateTimePicker
                  testID="dateTimePickerIos"
                  value={intendedReceiveAt || new Date()}
                  mode={'datetime'}
                  display="spinner"
                  onChange={(e, selectedDate) => {
                    if (e.type === 'set') {
                      setIntendedReceiveAt(selectedDate);
                    } else if (e.type === 'dismissed') {
                      setOpen(false);
                    }
                  }}
                />

                <HStack w="full" justifyContent="flex-end" space={3}>
                  <CustomButton variant="unstyled" onPress={onClose}>
                    Huỷ
                  </CustomButton>
                  <CustomButton onPress={onConfirm}>Xác nhận</CustomButton>
                </HStack>
              </VStack>
            </Actionsheet.Content>
          </Actionsheet>
        )}

        {Platform.OS === 'android' && (
          <DatePicker
            title=""
            modal
            open={open}
            date={intendedReceiveAt || new Date()}
            onConfirm={date => {
              setValue(
                'intendedReceiveAt',
                dayjs(date).format(FULL_TIME_FORMAT),
              );
              setIntendedReceiveAt(date);
              setOpen(false);
              trigger('intendedReceiveAt');
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        )}

        <CustomButton onPress={handleSubmit(onSubmit)} mt="2">
          Tiếp theo
        </CustomButton>
      </VStack>
    </Layout>
  );
};

export default LockerDetailReceiver;
