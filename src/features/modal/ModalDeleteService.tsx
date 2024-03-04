import {AlertDialog, Button, useToast} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomToast from '../../components/CustomToast';
import {useDeleteServiceMutation} from '../../services/orderService';
import {selectModal, setCloseModal} from '../../stores/global.store';

const ModalDeleteService = () => {
  const {isOpen, type, data: modalData} = useSelector(selectModal);
  const dispatch = useDispatch();

  const cancelRef = useRef(null);

  // MUTATION
  const [deleteService, {isSuccess, isError, error, isLoading}] =
    useDeleteServiceMutation();

  // HOOKS
  const toast = useToast();

  const onClose = () => {
    dispatch(setCloseModal());
  };

  const handleDeleteService = () => {
    deleteService({
      id: Number(modalData?.orderId),
      detailId: Number(modalData?.detailId),
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
            description="Xoá dịch vụ thành công"
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
            description={error?.message || 'Xoá dịch vụ thất bại!'}
            status="error"
          />
        ),
      });
    }
  }, [isSuccess, isError]);

  const isModalOpen = isOpen && type === 'deleteService';

  return (
    <AlertDialog
      size="xl"
      leastDestructiveRef={cancelRef}
      isOpen={isModalOpen}
      onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Xoá dịch vụ</AlertDialog.Header>
        <AlertDialog.Body>
          Bạn có muốn xoá dịch vụ này ra khỏi đơn hàng không? Hành động này
          không thể hoàn tác.
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
              colorScheme="danger"
              onPress={handleDeleteService}
              isLoading={isLoading}
              isDisabled={isLoading}>
              Xác nhận
            </CustomButton>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ModalDeleteService;
