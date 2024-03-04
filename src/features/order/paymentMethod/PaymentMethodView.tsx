import React from 'react';

import {View} from 'native-base';
import {PaymentMethodType} from '../../../types/bill/bill';
import PaymentMethodCash from './PaymentMethodCash';
import PaymentMethodMomo from './PaymentMethodMomo';
import PaymentMethodVnPay from './PaymentMethodVnPay';

interface Props {
  type: PaymentMethodType;
}

const views = {
  VnPay: PaymentMethodVnPay,
  Momo: PaymentMethodMomo,
  Cash: PaymentMethodCash,
};

const PaymentMethodView: React.FC<Props> = ({type}) => {
  const PaymentMethodViewItem = views[type];

  return (
    <View flex={1}>
      <PaymentMethodViewItem />
    </View>
  );
};

export default PaymentMethodView;
