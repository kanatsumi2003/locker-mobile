import {
  Button,
  Center,
  FormControl,
  KeyboardAvoidingView,
  Modal,
  useToast,
} from 'native-base';
import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import CustomInput from '../../components/CustomInput';
import CustomToast from '../../components/CustomToast';
import {useEditServiceQuantityMutation} from '../../services/orderService';
import {selectModal, setCloseModal} from '../../stores/global.store';
import {IEditOrderDetailBody} from '../../types/order/order';
import CustomButton from '../../components/CustomButton';
import {formatNumber} from '../../utils/formatNumber';

const ModalServiceQuantity = () => {
  // FORM CONTROL
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {errors},
  } = useForm<IEditOrderDetailBody>();

  const {isOpen, type, data: modalData} = useSelector(selectModal);
  const dispatch = useDispatch();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // MUTATION
  const [editServiceQuantity, {isSuccess, isError, error, isLoading}] =
    useEditServiceQuantityMutation();

  // HOOKS
  const toast = useToast();

  const onClose = () => {
    dispatch(setCloseModal());
  };

  const onSubmit: SubmitHandler<IEditOrderDetailBody> = data => {
    editServiceQuantity({
      id: Number(modalData?.orderId),
      detailId: Number(modalData?.detailId),
      quantity: formatNumber(data.quantity),
    });
  };

  useEffect(() => {
    modalData &&
      setValue(
        'quantity',
        modalData?.quantity !== null ? String(modalData?.quantity) : '1',
      );
  }, [modalData]);

  useEffect(() => {
    if (isSuccess) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thành công!"
            description="Chỉnh sửa số lượng thành công"
            status="success"
          />
        ),
      });
      reset();
    }

    if (isError) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={error?.message || 'Chỉnh sửa số lượng thất bại!'}
            status="error"
          />
        ),
      });
    }

    onClose();
  }, [isSuccess, isError]);

  const isModalOpen = isOpen && type === 'editServiceQuantity';

  return (
    <>
      <Modal
        size="xl"
        isOpen={isModalOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}>
        <KeyboardAvoidingView style={{width: '100%'}} behavior="position">
          <Center>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Chỉnh sửa số lượng</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <CustomInput
                    control={control}
                    label="Số lượng"
                    name="quantity"
                    rules={{required: 'Trường này là bắt buộc'}}
                    keyboardType="number-pad"
                  />
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
                  <Button
                    isDisabled={
                      isLoading ||
                      watch('quantity')?.trim() === '' ||
                      watch('quantity') === '0'
                    }
                    isLoading={isLoading}
                    colorScheme="blue"
                    onPress={handleSubmit(onSubmit)}>
                    Lưu
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Center>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default ModalServiceQuantity;
