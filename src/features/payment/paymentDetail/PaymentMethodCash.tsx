import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';

const PaymentMethodCash = () => {
  const handlePress = () => {};

  return (
    <PaymentMethodCard
      handlePress={handlePress}
      imagePath={require('../../../assets/cash.png')}
      heading="Tiền mặt"
    />
  );
};

export default PaymentMethodCash;
