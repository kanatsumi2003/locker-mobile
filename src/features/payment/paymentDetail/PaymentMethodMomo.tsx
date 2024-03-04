import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';

const PaymentMethodMomo = () => {
  const handlePress = () => {};

  return (
    <PaymentMethodCard
      handlePress={handlePress}
      imagePath={require('../../../assets/momo.png')}
      heading="Momo"
    />
  );
};

export default PaymentMethodMomo;
