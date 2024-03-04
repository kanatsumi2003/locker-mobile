import {AlertDialog, Button, Heading, Text, useToast} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomToast from '../../components/CustomToast';
import {
  useCheckoutOrderMutation,
  useOrderQuery,
} from '../../services/orderService';
import {useSettingsQuery} from '../../services/settingService';
import {selectModal, setCloseModal} from '../../stores/global.store';
import {formatDecimal} from '../../utils/formatDecimal';

const ModalConfirmCheckout = () => {
  const {isOpen, type, data: modalData} = useSelector(selectModal);
  const dispatch = useDispatch();

  const cancelRef = useRef(null);
  const onClose = () => {
    dispatch(setCloseModal());
  };

  const isModalOpen = isOpen && type === 'confirmCheckout';

  // HOOKS
  const toast = useToast();

  // QUERY
  const {data: dataOrder} = useOrderQuery(
    {id: Number(modalData?.params?.id)},
    {skip: !modalData?.params?.id},
  );
  const {data: dataSettings} = useSettingsQuery({});
  //
  // MUTATION
  const [checkoutOrder, {isSuccess, isError, isLoading, error, data}] =
    useCheckoutOrderMutation();

  const handleCheckoutOrder = () => {
    checkoutOrder({id: Number(modalData?.params?.id)});
  };

  useEffect(() => {
    if (isSuccess) {
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

  return (
    <AlertDialog
      size="xl"
      leastDestructiveRef={cancelRef}
      isOpen={isModalOpen}
      onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Xác nhận</AlertDialog.Header>
        <AlertDialog.Body>
          <Text>
            Số tiền cần thanh toán:{' '}
            <Heading size="sm">
              {formatDecimal(
                Number(dataOrder?.totalPrice) -
                  Number(dataSettings?.orderSettings?.reservationFee),
              )}{' '}
              VND
            </Heading>
          </Text>
          Hệ thống sẽ tự động kiểm tra và trừ số tiền này vào số dư ví của khách
          hàng. Bạn có muốn xác nhận thanh toán đơn hàng này không?
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <CustomButton
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={cancelRef}
              isDisabled={isLoading}>
              Huỷ
            </CustomButton>
            <CustomButton
              isDisabled={isLoading}
              isLoading={isLoading}
              onPress={handleCheckoutOrder}>
              Xác nhận
            </CustomButton>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ModalConfirmCheckout;
