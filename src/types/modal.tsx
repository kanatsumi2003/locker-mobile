export type ModalType =
  | 'editServiceQuantity'
  | 'deleteService'
  | 'addService'
  | 'paymentMethod'
  | 'calendar'
  | 'confirmProcessed'
  | 'confirmReturn'
  | 'confirmReserved'
  | 'confirmCheckout';

export type SubModalType = 'qrCode';

export interface ModalStore {
  type: ModalType | null;
  subType?: SubModalType;
  isOpen: boolean;
  data?: any;
  params?: any;
}
