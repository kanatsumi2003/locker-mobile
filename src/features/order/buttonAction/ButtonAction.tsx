import React from 'react';
import {ORDER_STATUS, OrderType} from '../../../types/order/order';
import ButtonCheckout from './ButtonCheckout';
import ButtonProcess from './ButtonProcess';
import ButtonReserved from './ButtonReserved';
import ButtonReturn from './ButtonReturn';
import {View} from 'native-base';

interface Props {
  status: OrderType;
}

const views = {
  [ORDER_STATUS.PROCESSING]: ButtonProcess,
  [ORDER_STATUS.PROCESSED]: ButtonReturn,
  [ORDER_STATUS.RETURNED]: ButtonCheckout,
  [ORDER_STATUS.RESERVED]: ButtonReserved,
  [ORDER_STATUS.OVERTIME_PROCESSING]: ButtonCheckout,
};

const ButtonAction: React.FC<Partial<Props>> = ({status}) => {
  const ButtonView = status ? views[status] : () => <></>;

  return (
    <View mt={2}>
      <ButtonView />
    </View>
  );
};

export default ButtonAction;
