import React, {useEffect} from 'react';
import {FormControl, Radio, useToast, VStack} from 'native-base';
import CustomRadio from '../../components/CustomRadio';
import PaymentMethodLayout from '../order/paymentMethod/PaymentMethodLayout';
import {PAYMENT_METHOD} from '../../types/bill/bill';
import PaymentMethodView from '../order/paymentMethod/PaymentMethodView';
import {SubmitHandler, useForm} from 'react-hook-form';
import CustomSectionTitle from '../../components/CustomSectionTitle';
import CustomButton from '../../components/CustomButton';
import {useSelector} from 'react-redux';
import CustomInput from '../../components/CustomInput';
import {IWalletDeposit} from '../../types/wallet/wallet';
import {selectUserInfo} from '../../stores/global.store';
import {useWalletDepositMutation} from '../../services/walletService';
import CustomToast from '../../components/CustomToast';
import {Linking} from 'react-native';
import CustomSpinner from '../../components/CustomSpinner';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../navigation/customer/TabNavigationCustomer';
import {formatDecimal, parseDecimal} from '../../utils/formatDecimal';
import {
  CURRENCY_UNIT,
  DEFAULT_PRICE_PAYMENT_METHOD_CONDITION,
} from '../../constants/common';
import {useSettingsQuery} from '../../services/settingService';

const PaymentMethod = () => {
  const userInfo = useSelector(selectUserInfo);

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {errors},
  } = useForm<IWalletDeposit>({
    defaultValues: {
      method: PAYMENT_METHOD.MOMO,
    },
  });

  // HOOKS
  const toast = useToast();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // MUTATION
  const [
    createDeposit,
    {isSuccess, isError, isLoading, error, data: dataDepositResponse},
  ] = useWalletDepositMutation();

  // QUERY
  const {
    data: dataSettings,
    isLoading: isLoadingSetting,
    refetch,
  } = useSettingsQuery({});

  const onSubmit: SubmitHandler<IWalletDeposit> = data => {
    createDeposit({
      ...data,
      amount: Number(parseDecimal(data.amount)),
      phoneNumber: userInfo!.phoneNumber,
    });
  };

  const openPaymentUrl = () => {
    Linking.openURL(dataDepositResponse?.url || '').catch(err =>
      console.error("Couldn't load page", err),
    );
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      openPaymentUrl();
      navigation.navigate('CustomerWalletPolling', {
        id: dataDepositResponse?.id,
      });
    }

    if (isError) {
      toast.show({
        placement: 'top-left',
        render: () => (
          <CustomToast
            title="Thất bại"
            status="error"
            description={
              error?.message || 'Có lỗi xảy ra, vui lòng thử lại sau'
            }
          />
        ),
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  return (
    <VStack space="4" mt="4">
      <CustomSectionTitle text="Thanh toán bởi" />
      <FormControl isRequired isInvalid={'method' in errors}>
        <CustomRadio
          defaultValue={PAYMENT_METHOD.MOMO}
          value={watch('method')}
          control={control}
          name="method"
          rules={{required: 'Trường này là bắt buộc'}}>
          <PaymentMethodLayout>
            {Object.values(PAYMENT_METHOD)
              .filter(item => {
                if (
                  item === PAYMENT_METHOD.CASH ||
                  item === PAYMENT_METHOD.WALLET
                ) {
                  return false;
                }

                if (
                  item === PAYMENT_METHOD.VNPAY &&
                  watch('amount') &&
                  Number(parseDecimal(watch('amount'))) <
                    DEFAULT_PRICE_PAYMENT_METHOD_CONDITION
                ) {
                  return false;
                }

                return true;
              })
              .map(item => (
                <Radio key={item} value={item} maxW="full">
                  <PaymentMethodView type={item} />
                </Radio>
              ))}
          </PaymentMethodLayout>
        </CustomRadio>
      </FormControl>
      <CustomSectionTitle text={`Số tiền cần nạp (${CURRENCY_UNIT.VI})`} />
      <FormControl isRequired isInvalid={'amount' in errors}>
        <CustomInput
          onChangeText={value => {
            Number(parseDecimal(value)) <
              DEFAULT_PRICE_PAYMENT_METHOD_CONDITION &&
              setValue('method', PAYMENT_METHOD.MOMO);
            setValue('amount', Number(parseDecimal(value)));
          }}
          control={control}
          name="amount"
          keyboardType="numeric"
          value={formatDecimal(String(parseDecimal(watch('amount')))) || ''}
          rules={{
            required: false,
            validate: value =>
              value === '' ||
              value === null ||
              value === undefined ||
              Number(parseDecimal(value)) >=
                Number(dataSettings?.paymentSettings?.minDeposit) ||
              `Số tiền nạp tối thiểu là ${formatDecimal(
                dataSettings?.paymentSettings?.minDeposit,
              )} ${CURRENCY_UNIT.VI}`,
          }}
        />
      </FormControl>
      <CustomButton onPress={handleSubmit(onSubmit)}>
        Nạp tiền vào ví
      </CustomButton>
      {isLoading && <CustomSpinner visible={isLoading} />}
    </VStack>
  );
};

export default PaymentMethod;
