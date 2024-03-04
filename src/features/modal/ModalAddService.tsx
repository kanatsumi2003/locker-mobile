import {
  Button,
  Center,
  Checkbox,
  FormControl,
  KeyboardAvoidingView,
  Modal,
  useToast,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomCheckbox from '../../components/CustomCheckbox';
import CustomToast from '../../components/CustomToast';
import Empty from '../../components/Empty';
import {useOrderSelectedServices} from '../../hooks/useOrderSelectedServices';
import {useServicesByLockerQuery} from '../../services/lockerService';
import {useAddServicesMutation} from '../../services/orderService';
import {selectModal, setCloseModal} from '../../stores/global.store';
import {IServiceParams, SERVICE_STATUS} from '../../types/service/service';
import ServiceItemStaff from '../service/ServiceItemStaff';

type AddServiceFormType = {
  services: string[];
};

const ModalAddService = () => {
  const {
    isOpen,
    type,
    data: modalData,
    params: excludedIds,
  } = useSelector(selectModal);

  const [params, setParams] = useState<{id: number} & IServiceParams>({
    id: Number(modalData?.lockerId),
    pageNumber: 1,
    pageSize: 10,
  });
  // STATE TO TRACKING SELETED SERVICES
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // STATE TO TRACKING QUANTITY OF EACH SERVICE
  const [quantityServiceMap, setQuantityServiceMap] = useState<
    Map<string, string>
  >(new Map());

  const dispatch = useDispatch();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<AddServiceFormType>();

  // HOOKS
  const toast = useToast();

  const resetData = () => {
    // Clear checkbox data when create service success
    reset();
    setSelectedServices([]);
    // Clear service quantity map data when create service success
    quantityServiceMap.clear();
  };

  const onClose = () => {
    dispatch(setCloseModal());
    resetData();
  };

  // QUERY
  const {data, isFetching} = useServicesByLockerQuery(
    {
      id: Number(modalData?.lockerId),
      pageNumber: 1,
      pageSize: 10,
      status: SERVICE_STATUS.ACTIVE,
      excludedIds: excludedIds as number[],
    },
    {
      skip: !modalData?.lockerId || isNaN(modalData?.lockerId),
    },
  );

  // MUTATION
  const [addServices, {isSuccess, isError, error, isLoading}] =
    useAddServicesMutation();

  const handleLoadMore = useCallback(() => {
    !isFetching &&
      data?.totalPages &&
      params?.pageNumber < data.totalPages &&
      setParams(prev => ({
        ...prev,
        pageNumber: prev.pageNumber + 1,
      }));
  }, [data]);

  const onSubmit: SubmitHandler<AddServiceFormType> = data => {
    if (selectedServicesDetails?.length) {
      addServices({
        id: Number(modalData?.orderId),
        details: selectedServicesDetails,
      });
    }
  };

  const selectedServicesDetails = useOrderSelectedServices(
    selectedServices,
    quantityServiceMap,
  );

  useEffect(() => {
    if (isSuccess) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thành công!"
            description="Thêm dịch vụ thành công"
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
            description={error?.message || 'Thêm dịch vụ thất bại!'}
            status="error"
          />
        ),
      });
    }
  }, [isSuccess, isError]);

  const isModalOpen = isOpen && type === 'addService';

  return (
    <>
      <Modal
        avoidKeyboard
        size="xl"
        isOpen={isModalOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}>
        <KeyboardAvoidingView style={{width: '100%'}} behavior="position">
          <Center>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Thêm dịch vụ</Modal.Header>
              <Modal.Body onTouchEnd={handleLoadMore}>
                <FormControl>
                  <CustomCheckbox
                    onChange={(values: string[]) => {
                      Array.isArray(values) && setSelectedServices(values);
                    }}
                    control={control}
                    name="services">
                    {data?.items?.length ? (
                      data?.items?.map(item => (
                        <Checkbox value={item.id.toString()} key={item.id}>
                          <ServiceItemStaff
                            {...item}
                            quantityServiceMap={quantityServiceMap}
                            setQuantityServiceMap={setQuantityServiceMap}
                          />
                        </Checkbox>
                      ))
                    ) : (
                      <Empty />
                    )}
                  </CustomCheckbox>
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <CustomButton
                    variant="ghost"
                    onPress={onClose}
                    isDisabled={isLoading}>
                    Huỷ
                  </CustomButton>
                  <CustomButton
                    onPress={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                    isDisabled={isLoading || selectedServices.length === 0}>
                    Thêm
                  </CustomButton>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Center>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default ModalAddService;
