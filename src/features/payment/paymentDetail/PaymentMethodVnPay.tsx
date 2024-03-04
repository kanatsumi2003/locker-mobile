import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';

const PaymentMethodVnPay = () => {
  const handlePress = () => {};

  return (
    <PaymentMethodCard
      handlePress={handlePress}
      imagePath={require('../../../assets/vnpay.png')}
      heading="VnPay"
    />
  );
};

export default PaymentMethodVnPay;
