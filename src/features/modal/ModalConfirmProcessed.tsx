import {AlertDialog, Button, useToast} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CustomToast from '../../components/CustomToast';
import {
  useProcessOrderMutation,
  useUpdateOrderDescriptionMutation,
} from '../../services/orderService';
import {selectModal, setCloseModal} from '../../stores/global.store';
import {selectOrderNote} from '../../stores/order.store';
import CustomButton from '../../components/CustomButton';

const ModalConfirmProcessed = () => {
  const orderNote = useSelector(selectOrderNote);

  const {isOpen, type, data: modalData} = useSelector(selectModal);
  const dispatch = useDispatch();

  const cancelRef = useRef(null);

  // MUTATION
  const [processOrder, {isSuccess, isError, isLoading, error}] =
    useProcessOrderMutation();
  const [updateOrderNote, {isLoading: isLoadingUpdate}] =
    useUpdateOrderDescriptionMutation();

  // HOOKS
  const toast = useToast();

  const onClose = () => {
    dispatch(setCloseModal());
  };

  const handleProcessOrder = () => {
    processOrder({id: Number(modalData?.params?.id)});
    updateOrderNote({
      id: Number(modalData?.params?.id),
      staffNote: orderNote,
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
            description="Xử lý đơn hàng thành công"
            status="success"
          />
        ),
      });
    }

    if (isError) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={error?.message || 'Xử lý đơn hàng thất bại!'}
            status="error"
          />
        ),
      });
    }
    onClose();
  }, [isSuccess, isError]);

  const isModalOpen = isOpen && type === 'confirmProcessed';

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
          Bạn có muốn xác nhận xử lý đơn hàng này không?
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <CustomButton
              isDisabled={isLoadingUpdate}
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={cancelRef}>
              Huỷ
            </CustomButton>
            <CustomButton
              isDisabled={isLoadingUpdate}
              isLoading={isLoading || isLoadingUpdate}
              onPress={handleProcessOrder}>
              Xác nhận
            </CustomButton>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ModalConfirmProcessed;
