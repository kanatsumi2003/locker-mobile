import {AlertDialog, Button, useToast} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomToast from '../../components/CustomToast';
import {useCancelOrderMutation} from '../../services/orderService';
import {selectModal, setCloseModal} from '../../stores/global.store';

const ModalConfirmReserved = () => {
  const {isOpen, type, data: modalData} = useSelector(selectModal);

  const dispatch = useDispatch();

  const cancelRef = useRef(null);

  // MUTATION

  const [cancelOrder, {isSuccess, isError, isLoading, error}] =
    useCancelOrderMutation();

  // HOOKS
  const toast = useToast();

  const onClose = () => {
    dispatch(setCloseModal());
  };

  const handleCancelOrder = () => {
    cancelOrder({id: Number(modalData?.params?.id)});
  };

  useEffect(() => {
    // if (isSuccess) {
    //   toast.show({
    //     placement: 'top-left',
    //     duration: 1500,
    //     render: () => (
    //       <CustomToast
    //         title="Thành công!"
    //         description="Huỷ đơn hàng thành công"
    //         status="success"
    //       />
    //     ),
    //   });
    // }

    if (isError) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={error?.message || 'Huỷ đơn hàng thất bại!'}
            status="error"
          />
        ),
      });
    }
    onClose();
  }, [isSuccess, isError]);

  const isModalOpen = isOpen && type === 'confirmReserved';

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
          Bạn có muốn xác nhận huỷ đơn hàng này không?
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
              onPress={handleCancelOrder}>
              Xác nhận
            </CustomButton>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ModalConfirmReserved;
