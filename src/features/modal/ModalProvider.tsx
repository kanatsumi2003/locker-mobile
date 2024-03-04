import React from 'react';
import ModalAddService from './ModalAddService';
import ModalCalendar from './ModalCalendar';
import ModalConfirmCheckout from './ModalConfirmCheckout';
import ModalConfirmProcessed from './ModalConfirmProcessed';
import ModalConfirmReserved from './ModalConfirmReserved';
import ModalConfirmReturn from './ModalConfirmReturn';
import ModalDeleteService from './ModalDeleteService';
import ModalPaymentMethod from './ModalPaymentMethod';
import ModalServiceQuantity from './ModalServiceQuantity';

const ModalProvider = () => {
  return (
    <>
      <ModalServiceQuantity />
      <ModalDeleteService />
      <ModalAddService />
      <ModalPaymentMethod />
      <ModalCalendar />
      <ModalConfirmProcessed />
      <ModalConfirmReturn />
      <ModalConfirmReserved />
      <ModalConfirmCheckout />
    </>
  );
};

export default React.memo(ModalProvider);
