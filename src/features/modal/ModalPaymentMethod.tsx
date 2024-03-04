import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, FormControl, Modal, Radio, useToast} from 'native-base';
import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import CustomRadio from '../../components/CustomRadio';
import CustomToast from '../../components/CustomToast';
import {DEFAULT_PRICE_PAYMENT_METHOD_CONDITION} from '../../constants/common';
import {HomeStackParamList} from '../../navigation/staff/TabNavigationStaff';
import {
  useCheckoutOrderMutation,
  useOrderQuery,
} from '../../services/orderService';
import {selectModal, setCloseModal} from '../../stores/global.store';
import {IPaymentRequest, PAYMENT_METHOD} from '../../types/bill/bill';
import PaymentMethodLayout from '../order/paymentMethod/PaymentMethodLayout';
import PaymentMethodView from '../order/paymentMethod/PaymentMethodView';
import CustomButton from '../../components/CustomButton';

const ModalPaymentMethod = () => {
  const {isOpen, type, data: modalData} = useSelector(selectModal);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: {errors},
  } = useForm<IPaymentRequest>();

  const onClose = () => {
    dispatch(setCloseModal());
    reset();
  };

  const isModalOpen = isOpen && type === 'paymentMethod';

  // HOOKS
  const toast = useToast();

  // MUTATION
  const [checkoutOrder, {isSuccess, isError, isLoading, error, data}] =
    useCheckoutOrderMutation();

  const {data: dataOrder} = useOrderQuery(
    {id: Number(modalData?.params?.id)},
    {skip: !modalData?.params?.id},
  );

  const onSubmit: SubmitHandler<IPaymentRequest> = data => {
    checkoutOrder({...data, id: Number(modalData?.params?.id)});
  };

  useEffect(() => {
    if (isSuccess) {
      if (getValues('method') !== PAYMENT_METHOD.CASH) {
        navigation.navigate('StaffOrderQrCode', {id: Number(data?.id)});
        onClose();
      } else {
        toast.show({
          placement: 'top-left',
          duration: 1500,
          render: () => (
            <CustomToast
              title="Thành công!"
              description="Thanh toán đơn hàng thành công"
              status="success"
            />
          ),
        });
        onClose();
      }
    }

    if (isError) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={error?.message || 'Thanh toán đơn hàng thất bại!'}
            status="error"
          />
        ),
      });
      onClose();
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    !isOpen && reset();
  }, [isOpen]);

  return (
    <>
      <Modal
        size="xl"
        isOpen={isModalOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Chọn phương thức thanh toán</Modal.Header>
          <Modal.Body>
            <FormControl isRequired isInvalid={'method' in errors}>
              <CustomRadio
                control={control}
                name="method"
                rules={{required: 'Trường này là bắt buộc'}}>
                <PaymentMethodLayout>
                  {Object.values(PAYMENT_METHOD)
                    .filter(item => {
                      if (
                        dataOrder?.totalPrice &&
                        dataOrder?.totalPrice <
                          DEFAULT_PRICE_PAYMENT_METHOD_CONDITION &&
                        item === PAYMENT_METHOD.VNPAY
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
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <CustomButton
                isDisabled={isLoading}
                variant="ghost"
                onPress={onClose}>
                Huỷ
              </CustomButton>
              <CustomButton
                isDisabled={isLoading}
                isLoading={isLoading}
                onPress={handleSubmit(onSubmit)}>
                Tiếp tục
              </CustomButton>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ModalPaymentMethod;
