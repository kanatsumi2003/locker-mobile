import React from 'react';
import PaymentMethodLayout from './PaymentMethodLayout';
import PaymentMethodView from './PaymentMethodView';

const PaymentMethods = () => {
  return (
    <PaymentMethodLayout>
      <PaymentMethodView type="VnPay" />
      <PaymentMethodView type="Momo" />
      <PaymentMethodView type="Cash" />
    </PaymentMethodLayout>
  );
};

export default PaymentMethods;
